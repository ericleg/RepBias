import numpy as np
import pandas as pd

import functions.preparation

def simulate_task_EVM(trialRewards, blockStructure, beta):
    '''Simulation of Pacman task with EVM
    This model uses the real expected rewards to calculate p(pi). Hence, past choices
    do not influence future choices.
    
    parameters
    ----------
    trial rewards: numpy array, size=(ntrials, nActions)
    matrix that codes the expected reward for each sequence of action pi at each trial t

    beta: float
    free model parameter that models precision on expected rewards

    returns
    -------
    dfSimulation: pandas df
    df with all relevant information from the simulation (incl. choices, posterior probabilities, etc.)
    
    DEVNOTE
    -------
    also add:
    task structure: pandas df
    df with relevant information of the task, i.e. block number???
    '''

    rng = np.random.default_rng()

    nTrials, nActions = trialRewards.shape # get number of trials, possible action sequences

    dfSimulation = pd.DataFrame()

    # add beta to the trial rewards
    trialRewards = trialRewards**beta

    # normalize to get probabilities that add to 1
    ps = trialRewards/trialRewards.sum(axis=1)[:, np.newaxis]
    #print(ps)

    # sample choices based on ps (rng.choice() does not accept 2D ps -> loop)
    choices = np.zeros(nTrials) # preallocation

    for t in range(nTrials):
        choices[t] = rng.choice(nActions, p=ps[t])

    # put everything into the pandas df
    dfSimulation['trialN'] = np.tile(np.arange(nTrials/len(set(blockStructure))), len(set(blockStructure)))
    dfSimulation['blockN'] = blockStructure
    dfSimulation['sequence_ID'] = choices
    dfSimulation = pd.concat([dfSimulation, 
                                pd.DataFrame(data=ps, 
                                            columns=[ f'posterior_seq{s}' for s in range(nActions) ])],
                                axis=1) # add posterior probabilities of each sequence of actions

    return dfSimulation


def simulate_task_EVPBM(trialRewards, blockStructure, DASIdx, beta, R0, bias=0):
    '''Simulation with EVPM (bias=0) or EVPBM (bias>0)
    This model uses the real expected rewards, if the sequence was already used during the current block,
    or the approximated reward R0 to calculate p(pi). Hence, past choices do influence the expected rewards.
    Optional, a bias can be added to the EV of the default action sequence (DAS).
    
    parameters
    ----------
    trialRewards: numpy array, size=(ntrials, nActions)
    matrix that codes the expected reward for each sequence of action pi at each trial t

    blockStructure: vector, size=nTrials
    codes the block number of each trial

    DASIdx: integer
    codes the action ID of the default action sequence (DAS)

    beta: float
    free model parameter that models precision over expected rewards

    R0: float
    free model parameter that corresponds to approximated reward for yet unobserved sequences (block-level)

    bias: float (positive)
    free model parameter that can add a bias to the DAS

    returns
    -------
    dfSimulation: pandas df
    df with all relevant information from the simulation (incl. choices, posterior probabilities, etc.)
    '''

    rng = np.random.default_rng()

    nTrials, nActions = trialRewards.shape # get number of trials, possible action sequences

    # preallocations
    dfSimulation = pd.DataFrame()
    choices = np.zeros(nTrials)
    ps = np.zeros((nTrials, nActions))

    # loop over trials
    for t in range(nTrials):

        if t==0:
            # first trial different because of no choices yet
            usedSequences = np.zeros(nActions) # create vector for first trial
            usedSequences[DASIdx] = 1
            usedSequences = usedSequences[np.newaxis]
        else:
            usedSequences = functions.preparation.get_used_sequences(choices[:t], nActions, blockStructure, DASIdx)

        # get real EVs for current trial
        EVsTrial = trialRewards[t].copy()

        # replace previously unobserved action sequences with approximated reward
        EVsTrial[usedSequences[-1]==0] = R0

        # include bias for DAS
        EVsTrial[DASIdx] = EVsTrial[DASIdx]+bias
    
        # get normalized EVs depending on free parameter beta
        psTrial = EVsTrial**beta
        psTrial = psTrial/psTrial.sum()

        ps[t] = psTrial

        # sample choice based on posterior probabilities
        choices[t] = rng.choice(nActions, p=psTrial)

    # put everything into the pandas df
    dfSimulation['trialN'] = np.tile(np.arange(nTrials/len(set(blockStructure))), len(set(blockStructure)))
    dfSimulation['blockN'] = blockStructure
    dfSimulation['sequence_ID'] = choices
    dfSimulation = pd.concat([dfSimulation, 
                                pd.DataFrame(data=ps, 
                                            columns=[ f'posterior_seq{s}' for s in range(nActions) ])],
                                axis=1) # add posterior probabilities

    return dfSimulation


def simulate_task_EVPRM(trialRewards, blockStructure, DASIdx, beta, R0, h):
    '''Simulation with EVPRM
    This model uses the real expected rewards, if the sequence was already used during the current block 
    (i.e. observed sequence of actions), or the approximated reward R0 to calculate p(pi), and a counter of past choices. 
    Hence, past choices do influence the posterior via the expected rewards and the prior over policies.
    
    parameters
    ----------
    trialRewards: numpy array, size=(ntrials, nActions)
    matrix that codes the expected reward for each sequence of action pi at each trial t

    blockStructure: vector, size=nTrials
    codes the block number of each trial

    DASIdx: integer
    codes the action ID of the default action sequence (DAS)

    beta: float (>=0)
    free model parameter that models precision over expected rewards

    R0: float (>0)
    free model parameter that corresponds to approximated reward for unobserved sequences (block-level)

    h: float (0,1)
    free model parameter that influences how strong past behavior influences future behavior, i.e. repetition bias strength

    returns
    -------
    dfSimulation: pandas df
    df with all relevant information from the simulation (incl. choices, posterior probabilities, etc.)
    '''

    # initialize random number generator
    rng = np.random.default_rng()
    
    # transform habitual tendency h to initial alphas
    alphaInit = 1/h

    nTrials, nActions = trialRewards.shape # get number of trials, and of possible action sequences

    # preallocations
    dfSimulation = pd.DataFrame()
    choices = np.zeros(nTrials)
    priors = np.zeros((nTrials, nActions)) # prior over policies
    ps = np.zeros((nTrials, nActions)) # posterior choice probabilities

    # loop over trials
    for t in range(nTrials):

        # get how often each sequence was used until now
        cumUsedSequences = functions.preparation.get_cumulative_used_sequences(choices[:t], nActions)

        prior = alphaInit+cumUsedSequences[-1]
        priors[t] = prior

        # get observed sequences of current block (coded with 1)
        if t==0:
            # first trial different because of no choices yet
            usedSequences = np.zeros(nActions) # create vector for first trial
            usedSequences[DASIdx] = 1
            usedSequences = usedSequences[np.newaxis]
        else:
            usedSequences = functions.preparation.get_used_sequences(choices[:t], nActions, blockStructure, DASIdx)

        # get real EVs for current trial
        EVsTrial = trialRewards[t].copy()

        # replace unobserved action sequences with default reward
        EVsTrial[usedSequences[-1]==0] = R0
    
        # get normalized EVs depending on free parameter beta for inverse temperature
        psTrial = EVsTrial**beta*prior
        psTrial = psTrial/psTrial.sum() # normalization

        ps[t] = psTrial # save posterior probabilities

        # sample choice based on posterior probabilities
        choices[t] = rng.choice(nActions, p=psTrial)

    # put everything into the pandas df
    dfSimulation['trialN'] = np.tile(np.arange(nTrials/len(set(blockStructure))), len(set(blockStructure)))
    dfSimulation['blockN'] = blockStructure
    dfSimulation['sequence_ID'] = choices
    dfSimulation = pd.concat([dfSimulation, 
                                pd.DataFrame(data=ps, 
                                            columns=[ f'posterior_seq{s}' for s in range(nActions) ]),
                                pd.DataFrame(data=priors, 
                                            columns=[ f'prior_seq{s}' for s in range(nActions) ])],
                                axis=1)

    return dfSimulation