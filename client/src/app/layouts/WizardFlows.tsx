import React, { useState, createContext, useContext } from 'react'

type TWizardStep = number
export type TWizardState = ReturnType<typeof useProvideWizard>


const wizardContext = createContext({} as TWizardState)
const useProvideWizard = () => {
    const [wizardStep, setWizardStep] = useState<TWizardStep>(0)

    return { wizardStep, setWizardStep }
}
export const useWizardContext = () => useContext(wizardContext)

export const WizardFlow: React.FC<{ startFrom?: number }> = props => {
    const wizardState = useProvideWizard()
    const initialState = props.startFrom ?
        { ...wizardState, wizardStep: props.startFrom } :
        wizardState

    return (
        <wizardContext.Provider value={initialState}>
            {props.children}
        </wizardContext.Provider>
    )
}