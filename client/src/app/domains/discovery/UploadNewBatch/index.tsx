import React from 'react'
import { useWizardContext, WizardFlow } from "app/layouts/WizardFlows"
import { SelectFileStep } from "./steps/SelectFileStep"
import { UploadBatchSuccess } from "./steps/UploadBatchSuccess"
import { UploadBatchError } from "./steps/UploadBatchError"

const stepComponents = [
    SelectFileStep,
    UploadBatchSuccess,
    UploadBatchError
]

const FlowWithWizard = () => {
    const { wizardStep } = useWizardContext()
    const CurrentStepComponent = stepComponents[wizardStep]

    return CurrentStepComponent ? <CurrentStepComponent /> : null
}

export const UploadNewBatchFlow: React.FC = () => (
    <WizardFlow startFrom={0}>
        <FlowWithWizard />
    </WizardFlow>
)
