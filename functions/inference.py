import numpy as np
import pandas as pd
import pymc as pm
import arviz as az
from functions import preparation

def inference_EVM_group(df, trialRewards, *args):
    '''Parameter inference for all participants simultaneously with EVM.
    
    parameters
    ----------
    df: pandas df, len=nTrials*nParticipants
    df with choices (i.e. sequence IDs)

    trialRewards: numpy array, size=(ntrials, nActions)
    matrix that codes the expected reward for each sequence of action pi at each trial t
    
    returns
    -------
    dfInferenceData: inference data object
    including: observations, posterior distributions, log likelihoods, PPC, sampling stats'''

    # 1) preparation

    # get number of possible sequences of actions
    _, nActions = trialRewards.shape

    # get number of participants
    nParticipants = len(set(df['Participant_ID']))

    # create 3D array with expected rewards
    trialRewards = np.repeat(trialRewards[np.newaxis, ...], nParticipants, axis=0)

    # 2) inference
    with pm.Model() as EVM:       
        # prior free parameter   
        beta = pm.Gamma('beta', alpha=3, beta=1, shape=nParticipants) 

        # calculate probabilities    
        thing = trialRewards**beta[:, np.newaxis, np.newaxis] 
        thing += 1e-10
        p = thing/pm.math.sum(thing, axis=2)[:, :, np.newaxis] # normalize
        # convert p from 3D to 2D (trial x action sequence) to match the shape of the observations of likelihood
        p = p.reshape((-1, nActions))

        # likelihood
        Y = pm.Categorical('Y', p=p, observed=df['sequence_ID'])

        # sample posterior with MCMC (and save log likelihood for LOO calculation)
        iData = pm.sample(idata_kwargs={'log_likelihood':True}, progressbar=False)

        pm.sample_posterior_predictive(iData, extend_inferencedata=True, progressbar=False) # add PPC
        
    return iData


def inference_EVPM_group(df, trialRewards, DASIdx):
    '''Parameter inference for all participants simultaneously EVPM.
    
    parameters
    ----------
    df: pandas df, len=nTrials*nParticipants
    df with choices (i.e. sequence IDs)

    trialRewards: numpy array, size=(ntrials, nActions)
    matrix that codes the expected reward for each sequence of action pi at each trial t

    DASIdx: int
    sequence ID of default action sequence (DAS)
    
    returns
    -------
    dfInferenceData: inference data object
    including: observations, posterior distributions, log likelihoods, PPC, sampling stats'''

    # 1) preparation
    # get used sequences matrix
    _, nActions = trialRewards.shape
    usedSequencesMatrix = preparation.get_used_sequences_group(df, nActions, DASIdx)

    # get number of participants
    nParticipants = len(set(df['Participant_ID']))

    # 2) inference
    with pm.Model() as EVPM:        
        # priors of free model parameters   
        beta = pm.Gamma('beta', alpha=3, beta=1, shape=nParticipants)
        R0 = pm.Gamma('R0', alpha=55, beta=.75, shape=nParticipants) # proxy reward for unexploited action sequences       
        
        # define contribution of expected rewards (EVs)
        # create 3D matrix with real EV if actions sequence was already used during curren block or R0 otherwise
        trialRewardsAgent = pm.math.switch(pm.math.eq(usedSequencesMatrix,1), trialRewards, R0[:, np.newaxis, np.newaxis])
        trialRewardsAgent += 1e-10 # increases stability of inference by avoiding rewards of exactly 0

        # calculate probabilities
        thing = trialRewardsAgent**beta[:, np.newaxis, np.newaxis] 
        p = thing/pm.math.sum(thing, axis=2)[:, :, np.newaxis] # normalize
        # convert p from 3D to 2D (trial x action sequence) to match the shape of the observations of likelihood
        p = p.reshape((-1, nActions))

        # likelihood
        Y = pm.Categorical('Y', p=p, observed=df['sequence_ID'])

        # sample posterior with MCMC (and save log likelihood for LOO calculation)
        iData = pm.sample(idata_kwargs={'log_likelihood':True}, progressbar=False)

        pm.sample_posterior_predictive(iData, extend_inferencedata=True, progressbar=False) # add PPC
        
    return iData


def inference_EVPRM_group(df, trialRewards, DASIdx):
    '''Parameter inference for all participants simultaneously with EVPRM.
    
    parameters
    ----------
    df: pandas df, len=nTrials*nParticipants
    df with choices (i.e. sequence IDs)

    trialRewards: numpy array, size=(ntrials, nActions)
    matrix that codes the expected reward for each sequence of action pi at each trial t

    DASIdx: int
    sequence ID of default action sequence (DAS)
    
    returns
    -------
    dfInferenceData: inference data object
    including: observations, posterior distributions, log likelihoods, PPC, sampling stats'''

    # get used sequences matrix (participant-level)
    _, nActions = trialRewards.shape
    usedSequencesMatrix = preparation.get_used_sequences_group(df, nActions, DASIdx)

    # get cumulative sequence matrix (participant-level)
    cumChoicesMatrix = preparation.get_cumulative_used_sequences_group(df, nActions)

    # get number of participants
    nParticipants = len(set(df['Participant_ID']))

    with pm.Model() as EVPRM:        
        # priors for free parameters     
        beta = pm.Gamma('beta', alpha=3, beta=1, shape=nParticipants)
        R0 = pm.Gamma('R0', alpha=55, beta=.75, shape=nParticipants) # approximated reward for yet unexploited action sequences
        h = pm.Beta('h', alpha=3, beta=3, shape=nParticipants) # habitual tendency [0,1]

        # define habitual contribution (i.e. prior)
        alpha = 1/h # transform habitual tendency to get initial alpha
        # define prior as 3D matrix: participant x trial x action sequence
        prior = (cumChoicesMatrix+alpha[:, np.newaxis, np.newaxis])/pm.math.sum(cumChoicesMatrix+alpha[:, np.newaxis, np.newaxis], axis=2)[:, :, np.newaxis]    
        
        # define contribution of expected rewards (EVs)
        # create 3D matrix with real EV if actions sequence was already used during curren block or R0 otherwise
        trialRewardsAgent = pm.math.switch(pm.math.eq(usedSequencesMatrix,1), trialRewards, R0[:, np.newaxis, np.newaxis])
        trialRewardsAgent += 1e-10 # increases stability of inference by avoiding rewards of exactly 0

        # calculate probabilities
        thing = trialRewardsAgent**beta[:, np.newaxis, np.newaxis]*prior 
        p = thing/pm.math.sum(thing, axis=2)[:, :, np.newaxis] # normalize
        # convert p from 3D to 2D (trial x action sequence) to match the shape of the observations of likelihood
        p = p.reshape((-1, nActions))
        
        # likelihood
        Y = pm.Categorical('Y', p=p, observed=df['sequence_ID']) #.to_numpy())

        # sample posterior with MCMC (and save log likelihood for LOO calculation)
        iData = pm.sample(idata_kwargs={'log_likelihood':True}, progressbar=False)

        pm.sample_posterior_predictive(iData, extend_inferencedata=True, progressbar=False) # add PPC
        
    return iData

def inference_EVPRMnonDAS_group(df, trialRewards, DASIdx):
    '''Parameter inference just for non-DAS trials for all participants simultaneously with EVPRM.
    
    parameters
    ----------
    df: pandas df, len=nTrials*nParticipants
    df with choices (i.e. sequence IDs)

    trialRewards: numpy array, size=(ntrials, nActions)
    matrix that codes the expected reward for each sequence of action pi at each trial t

    DASIdx: int
    sequence ID of default action sequence (DAS)
    
    returns
    -------
    dfInferenceData: inference data object
    including: observations, posterior distributions, log likelihoods, PPC, sampling stats'''

    # get used sequences matrix (participant-level)
    _, nActions = trialRewards.shape
    usedSequencesMatrix = preparation.get_used_sequences_group(df, nActions, DASIdx)

    # get cumulative sequence matrix (participant-level)
    cumChoicesMatrix = preparation.get_cumulative_used_sequences_group(df, nActions)

    # get number of participants
    nParticipants = len(set(df['Participant_ID']))

    # select just non-DAS trials by using a masked array
    mask = df['sequence_ID']==DASIdx
    mask = mask.to_numpy()
    # maskedData = np.ma.masked_array(df['sequence_ID'], mask=mask)

    with pm.Model() as EVPRMnonDAS:
        # priors for free parameters     
        beta = pm.Gamma('beta', alpha=3, beta=1, shape=nParticipants)
        R0 = pm.Gamma('R0', alpha=55, beta=.75, shape=nParticipants) # approximated reward for yet unexploited action sequences
        h = pm.Beta('h', alpha=3, beta=3, shape=nParticipants) # habitual tendency [0,1]

        # define habitual contribution (i.e. prior)
        alpha = 1/h # transform habitual tendency to get initial alpha
        # define prior as 3D matrix: participant x trial x action sequence
        prior = (cumChoicesMatrix+alpha[:, np.newaxis, np.newaxis])/pm.math.sum(cumChoicesMatrix+alpha[:, np.newaxis, np.newaxis], axis=2)[:, :, np.newaxis]    
        
        # define contribution of expected rewards (EVs)
        # create 3D matrix with real EV if actions sequence was already used during curren block or R0 otherwise
        trialRewardsAgent = pm.math.switch(pm.math.eq(usedSequencesMatrix,1), trialRewards, R0[:, np.newaxis, np.newaxis])
        trialRewardsAgent += 1e-10 # increases stability of inference by avoiding rewards of exactly 0

        # calculate probabilities
        thing = trialRewardsAgent**beta[:, np.newaxis, np.newaxis]*prior 
        p = thing/pm.math.sum(thing, axis=2)[:, :, np.newaxis] # normalize
        # convert p from 3D to 2D (trial x action sequence) to match the shape of the observations of likelihood
        p = p.reshape((-1, nActions))
        
        # implement mask
        #pNonDAS = pm.MutableData('pNonDAS', p[mask])
        YobsNonDAS = pm.MutableData('ObsNonDAS', df['sequence_ID'].to_numpy()[mask])

        # likelihood
        Y = pm.Categorical('Y_nonDAS', p=p[mask], observed=YobsNonDAS)

        # sample posterior with MCMC (and save log likelihood for LOO calculation)
        iData = pm.sample(idata_kwargs={'log_likelihood':True}, progressbar=False)

        pm.sample_posterior_predictive(iData, extend_inferencedata=True, progressbar=False) # add PPC
        
    return iData

def inference_EVPRM_v2_group(df, trialRewards, DASIdx):
    '''Parameter inference for all participants simultaneously with EVPRM.
    This version of the model has different initial alphas for DAS and all other sequences.
    Therefore this model allows for different increases in repetition bias depending on choices.
    
    parameters
    ----------
    df: pandas df, len=nTrials*nParticipants
    df with choices (i.e. sequence IDs)

    trialRewards: numpy array, size=(ntrials, nActions)
    matrix that codes the expected reward for each sequence of action pi at each trial t

    DASIdx: int
    sequence ID of default action sequence (DAS)
    
    returns
    -------
    dfInferenceData: inference data object
    including: observations, posterior distributions, log likelihoods, PPC, sampling stats'''

    # get used sequences matrix (participant x trial x action sequence)
    _, nActions = trialRewards.shape
    usedSequencesMatrix = preparation.get_used_sequences_group(df, nActions, DASIdx)

    # get cumulative sequence matrix (participant x trial x action sequence)
    cumChoicesMatrix = preparation.get_cumulative_used_sequences_group(df, nActions)

    # get number of participants
    nParticipants = len(set(df['Participant_ID']))

    with pm.Model() as EVPRM:        
        # priors for free parameters
        beta = pm.Gamma('beta', alpha=3, beta=1, shape=nParticipants)
        R0 = pm.Gamma('R0', alpha=55, beta=.75, shape=nParticipants) # approximated reward for yet unexploited action sequences
        h = pm.Beta('h', alpha=3, beta=3, shape=nParticipants) # habitual tendency [0,1] for all sequences excluding DAS
        hDAS = pm.Beta('h_DAS', alpha=3, beta=3, shape=nParticipants) # habitual tendencies for DAS

        ## define habitual contribution (i.e. prior)
        alpha = 1/h # transform habitual tendency to get initial alpha
        alphaDAS = 1/hDAS

        DASMatrix = np.zeros((nParticipants, nActions))
        DASMatrix[:, DASIdx] = 1

        # define matrix with corresponding alpha init for each action sequence of each participant
        alphasMatrix = np.zeros((nParticipants, nActions)) # preallocation (participants x action sequences)
        #alphasMatrix = alphasMatrix + alpha[:, np.newaxis] # fill in default alpha
        alphasMatrix = pm.math.switch(pm.math.eq(DASMatrix, 1), alphaDAS[:, np.newaxis], alpha[:, np.newaxis]) # replace alphas for DAS with its own initial alpha 

        # define prior as 3D matrix: participant x trial x action sequence
        prior = (cumChoicesMatrix+alphasMatrix[:, np.newaxis, :])/pm.math.sum(cumChoicesMatrix+alphasMatrix[:, np.newaxis, :], axis=2)[:, :, np.newaxis]    
        
        ## define contribution of expected rewards (EVs) (i.e. likelihood)
        # create 3D matrix with real EV if actions sequence was already used during curren block or R0 otherwise
        trialRewardsAgent = pm.math.switch(pm.math.eq(usedSequencesMatrix,1), trialRewards, R0[:, np.newaxis, np.newaxis])
        trialRewardsAgent += 1e-10 # increases stability of inference by avoiding rewards of exactly 0

        # calculate probabilities (i.e. posterior)
        thing = trialRewardsAgent**beta[:, np.newaxis, np.newaxis]*prior 
        p = thing/pm.math.sum(thing, axis=2)[:, :, np.newaxis] # normalize
        # convert p from 3D to 2D (trial x action sequence) to match the shape of the observations of likelihood
        p = p.reshape((-1, nActions))
        
        # likelihood
        Y = pm.Categorical('Y', p=p, observed=df['sequence_ID']) #.to_numpy())

        # sample posterior with MCMC (and save log likelihood for LOOIC calculation)
        iData = pm.sample(idata_kwargs={'log_likelihood':True}) #, progressbar=False)

        pm.sample_posterior_predictive(iData, extend_inferencedata=True) #, progressbar=False) # add PPC
        
    return iData


def inference_EVPBM_group(df, trialRewards, DASIdx):
    '''Parameter inference for all participants simultaneously with EVPBM.
    
    parameters
    ----------
    df: pandas df, size=nTrials
    pandas df with choices (i.e. sequence IDs)

    trialRewards: numpy array, size=(ntrials, nActions)
    matrix that codes the expected reward for each sequence of action pi at each trial t

    DASIdx: int
    sequence ID of default action sequence (DAS)
    
    returns
    -------
    iData: inference data object
    including: observations, posterior distributions, log likelihoods, PPC, sampling stats'''

    # get number of participants
    nParticipants = len(set(df['Participant_ID']))

    # get used sequences matrix (participant-level)
    _, nActions = trialRewards.shape
    usedSequencesMatrix = preparation.get_used_sequences_group(df, nActions, DASIdx)

    # indicate DAS ID at each trial (to know which sequence will receive the bias)
    matrixDASidx = np.zeros((len(df), nActions))
    matrixDASidx[:, DASIdx] = 1
    matrixDASidx = matrixDASidx.reshape((nParticipants, -1, nActions)) # reshape to 3D

    with pm.Model() as EVPBM:        
        # priors for free parameters      
        beta = pm.Gamma('beta', alpha=3, beta=1, shape=nParticipants)
        R0 = pm.Gamma('R0', alpha=55, beta=.75, shape=nParticipants) # proxy reward for unexploited action sequences
        bias = pm.Gamma('bias', alpha=3, beta=.1, shape=nParticipants)       
        
        # define contribution of expected rewards (EVs)
        # create 3D matrix with real EV if actions sequence was already used during curren block or R0 otherwise
        trialRewardsAgent = pm.math.switch(pm.math.eq(usedSequencesMatrix,1), trialRewards, R0[:, np.newaxis, np.newaxis])
        # add bias
        trialRewardsAgent = pm.math.switch(pm.math.eq(matrixDASidx,1), trialRewardsAgent+bias[:, np.newaxis, np.newaxis], trialRewardsAgent)
        trialRewardsAgent += 1e-10 # increases stability of inference by avoiding rewards of exactly 0
     
        # calculate probabilities
        thing = trialRewardsAgent**beta[:, np.newaxis, np.newaxis]
        p = thing/pm.math.sum(thing, axis=2)[:, :, np.newaxis] # normalize
        # convert p from 3D to 2D (trial x action sequence) to match the shape of the observations of likelihood
        p = p.reshape((-1, nActions))

        # likelihood
        Y = pm.Categorical('Y', p=p, observed=df['sequence_ID'])

        # sample posterior with MCMC (and save log likelihood for LOO calculation)
        iData = pm.sample(idata_kwargs={'log_likelihood':True}, progressbar=False)

        pm.sample_posterior_predictive(iData, extend_inferencedata=True, progressbar=False) # add PPC
        
    return iData

def inference_parameter_recovery(dfParameterValues, simulationResult,  inferenceFun, dfRewards, idxDAS):
    '''
    This function performs inference for parameter recovery.

    parameters
    ----------
    dfParameterValues: pandas df
    df with the true parameter values

    simulationResult: series of pandas dfs
    results of the simulations (i.e. choices of the simulated agents)
    
    inferenceFun: function
    inference function of the currently used model

    dfRewards: pandas df
    df with the expected rewards of each action sequence in each trial

    idxDAS: integer
    sequence ID of the default action sequence (DAS)

    returns
    -------
    
    iData: inference data object
    xArray object with inference data  
    '''

    iData = {}

    # loop over different combinations and put the simulation results (i.e. simulated choices) of the agents with the same parameter combination into one df for inference
    for i in np.arange(len(set(dfParameterValues['ID']))):
        print(f'Inference {i+1}/{len(set(dfParameterValues["ID"]))}') # print progress

        # get indexes of all agents with the current parameter combination
        idxs = dfParameterValues[dfParameterValues['ID']==i].index
        
        # prepare df with data from all agents with the same parameter combination for group inference
        dfDataSimulation = pd.DataFrame() # preallocation

        # loop over all agents with the same parameter combination
        for a, idx in enumerate(idxs):
            # create df with data of specific agent
            dfAgent = simulationResult[idx][['trialN', 'blockN', 'sequence_ID']].copy()
            dfAgent['Participant_ID'] = a

            # add data from agent to df with data of all agents
            dfDataSimulation = pd.concat([dfDataSimulation, dfAgent], ignore_index=True)

        # run inference
        inferenceAgent = inferenceFun(dfDataSimulation, dfRewards.to_numpy(), idxDAS)

        # save the inference data object
        iData[i] = inferenceAgent

    return iData


def get_posterior_means(inferenceData):
    """ This function takes the inference data object (i.e. xarray dataset) as input,
     loops over each agent, and extracts the posterior means for each free parameter.
     Results are saved as a panda.
    """
    
    parameterNames = list(inferenceData[0].posterior.data_vars) # get names of free parameters

    dfFittedParameters = pd.DataFrame() # preallocation

    # loop over agents
    for a in range(len(inferenceData)):

        posteriorMeansAgent = az.extract(inferenceData[a]).mean() # get posterior means

        fittedParametersAgent = np.zeros(len(parameterNames)) # preallocation

        # loop over free parameters
        for i, parameter in enumerate(parameterNames):
            fittedParametersAgent[i] = posteriorMeansAgent[parameter].to_numpy()
        
        # add inferred posterior means to the df
        dfFittedParameters = pd.concat([dfFittedParameters, pd.DataFrame(fittedParametersAgent).transpose()], 
                                       ignore_index=True)
    
    dfFittedParameters.columns = parameterNames # set the column names
    
    return dfFittedParameters