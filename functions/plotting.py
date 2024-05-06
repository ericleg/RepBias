import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import arviz as az


def plot_parameter_recovery(iData, dfParameterValues, parameterNamesLatex, parameterNamesString, modelName):
    '''
    This function plots the results of the parameter recovery for all models.

    parameters
    ----------
    iData: inference data objects
    inference data (xarray objects) with inference data

    dfParameterValues: pandas df
    df with the true parameter values

    parameterNamesLatex: list
    latex strings of parameter names for x- and y-labels

    parameterNames: list
    names of the free parameters for plot titles

    modelName: string
    string of model name for file names

    returns:
    --------
    plot with parameter recovery (correlation true vs. inferred) for all parameters
    
    '''
    
    # get parameter names and extend df
    parameterNames = list(iData[0].posterior.data_vars) # get names of free parameters

    # add empty columns to df
    for parameter in parameterNames:
        dfParameterValues[f'{parameter}_mean'] = np.nan
        dfParameterValues[f'{parameter}_SD'] = np.nan

    # add inferred values to the df
    # loop over inference data objects
    for idxIDO in range(len(iData)):

        # calculate inference results
        dfSummary = az.summary(iData[idxIDO], kind='stats')[['mean', 'sd']] 

        # get the number of agents
        nAgents = len(dfSummary)/len(parameterNames)

        # add inferred values of the current agents to the df
        for p, paramName in enumerate(parameterNames):
            paramData = dfSummary.iloc[np.arange(nAgents)+(p*nAgents), :]
            dfParameterValues.loc[np.arange(nAgents)+(idxIDO*nAgents), [f'{paramName}_mean', f'{paramName}_SD']] = paramData.to_numpy()

    # plot it
    for pIdx, p in enumerate(parameterNames):
        plt.figure(figsize=(7,5))
        sns.regplot(data=dfParameterValues, x=f'{p}', y=f'{p}_mean', color='black')
        plt.plot(dfParameterValues[p], dfParameterValues[p], linestyle='--', color='darkgrey')
        plt.ylabel(f'inferred {parameterNamesLatex[pIdx]}')
        plt.xlabel(f'true {parameterNamesLatex[pIdx]}')
        plt.title(f'{parameterNamesString[pIdx]}', fontsize=18, fontweight='bold')
        sns.despine()
        plt.savefig(f'PR_{modelName}_{pIdx}.svg', format='svg')
        plt.show()