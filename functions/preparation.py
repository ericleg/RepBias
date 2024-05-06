import numpy as np

def get_used_sequences_group(dfData, nActions, DASIdx):
    ''' This function uses data from the group to create the used sequences matrix.

    Parameters
    ----------
    dfData: pandas df
    df that contains the choices and corresponding participant ID and block no.


    Returns
    -------
    usedSequencesMatrix: numpy array, size=(nTrials*nParticipants, nActions)
    '''

    # preallocation: participant x trial x action sequence
    usedSequencesMatrix = np.zeros((len(set(dfData['Participant_ID'])), 
                                len(set(dfData['trialN']))*len(set(dfData['blockN'])), 
                                nActions))

    # loop over participants
    for p in range(len(set(dfData['Participant_ID']))):

        # select choices and block structure of participant
        choices = dfData.loc[dfData['Participant_ID']==p,'sequence_ID']
        blockStructure = dfData.loc[dfData['Participant_ID']==p,'blockN']

        # get used sequence matrix (usm) of the participant
        usmParticipant = get_used_sequences(choices[:-1].to_numpy(), nActions, blockStructure.to_numpy(), DASIdx)

        # add participant usm to group usm
        #trialIdxs = dfData.loc[dfData['Participant_ID']==p].index.to_numpy()
        usedSequencesMatrix[p, :, :] = usmParticipant

    return usedSequencesMatrix


def get_used_sequences(choices, nActions, blockStructure, DASIdx):
    '''The function creates a matrix (trials x number of possible actions) that codes with 1s which sequences of actions
    were already used during the block at trial t (=row). The expected value of the default actions sequence (DAS) is
    transparent, hence the column of the DAS is filled with 1s.
    
    Parameters
    ----------
    choices: vector, size=nTrials-1
    choices (i.e. action IDs) excluding irrelevant choice of the last trial

    nActions: integer 
    indicates the possible number of different sequences of actions

    blockStructure: vector , size=nTrials
    codes the block number of each trial

    DASIdx: integer
    codes the action ID of the default action sequence (DAS)

    Returns
    -------
    usedSequenceMatrix: numpy array, size=(nTrials, nActions)
    '''

    # preallocation
    choicesMatrix = np.zeros((len(choices), nActions)) # codes selected action at each trial
    usedSequencesMatrix = np.zeros((len(choices)+1, nActions)) # +1 because we need this also for the first trial

    # create choices matrix where at each trial the chosen action is marked with a 1
    notNanIdxs = ~np.isnan(choices) # get NaN indexes
    choicesMatrix[notNanIdxs, choices[notNanIdxs].astype(int)] = 1 # add choices

    # loop over trials to create a vector for each trial that codes the used sequences of the current block
    for t in range(len(choices)+1):
        # select trial Idxs of trials of current block before current trial
        trialIdxs = np.array(np.where(blockStructure[:t]==blockStructure[t])).flatten()

        usedSequences = choicesMatrix[trialIdxs].sum(axis=0)
        usedSequences = np.where(usedSequences>0, 1, 0)
        usedSequences[DASIdx] = 1 # set DAS to 1, because EV for DAS is transparent

        # save it in used sequences matrix
        usedSequencesMatrix[t] = usedSequences.copy()
    
    return usedSequencesMatrix
    
def get_cumulative_used_sequences_group(dfData, nActions):

    # preallocation
    cumActionMatrix = np.zeros((len(set(dfData['Participant_ID'])), 
                                len(set(dfData['trialN']))*len(set(dfData['blockN'])), 
                                nActions))

    # loop over participants
    for p in range(len(set(dfData['Participant_ID']))):

        # select choices and block structure of participant
        choices = dfData.loc[dfData['Participant_ID']==p,'sequence_ID']

        # get cumulative used action matrix (cas) of the participant
        casParticipant = get_cumulative_used_sequences(choices[:-1].to_numpy(), nActions)

        # add participant usm to group usm
        #trialIdxs = dfData.loc[dfData['Participant_ID']==p].index.to_numpy()
        cumActionMatrix[p, :, :] = casParticipant

    return cumActionMatrix


def get_cumulative_used_sequences(choices, nActions):
    '''This function uses the choices of one participant or agent to create a matrix (trials x number of possible actions)
    that codes how often each sequence of actions was used until trial t (=row id)
    
    Parameters
    ----------
    choices: vector, size=nTrials-1
    choices (i.e. action IDs) without irrelevant choice of last trial

    nActions: integer
    indicates the possible number of different sequences of actions
    
    Returns
    -------
    cumActionMatrix, numpy array, size=(nTrials, nActions)
    codes with 1s which sequences of actions were already used during the current block
    '''
    
    # preallocation depending on number of trails played by the participant or agent and the number of possible actions
    actionMatrix = np.zeros((len(choices)+1, nActions))

    # create choices matrix where at each trial the chosen action is marked with a 1
    notNanIdxs = np.where(~np.isnan(choices))[0] # get NaN indexes

    # convert choices ID to the matrix (+1 -> choices always influence next trial)
    actionMatrix[notNanIdxs+1, choices[notNanIdxs].astype(int)] = 1 # add choices
            
    # loop over trials (shifted because actions affect prior of next trial)
    #for t in range(len(choices)):
    #    actionMatrix[t+1, choices[t].astype(int)] = 1
            
    # calculate the cumulative sum
    cumActionMatrix = actionMatrix.cumsum(axis=0)

    return cumActionMatrix