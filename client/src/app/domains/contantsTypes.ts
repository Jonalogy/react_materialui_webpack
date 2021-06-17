export const sourceTypeOptions = [
    { val: "survey", label: "Survey" },
    { val: "ssp", label: "SSP" },
    { val: "youtube", label: "YouTube" },
    { val: "appleAppStore", label: "Apple App Store" },
    { val: "googlePlayStore", label: "Google Play Store" },
    { val: "amazon", label: "Amazon" }
] as const
export type TSourceTypeOptions = typeof sourceTypeOptions[number]['val']

export const priorityOptions = [
    { val: "1", label: "1" },
    { val: "2", label: "2" },
    { val: "3", label: "3" },
    { val: "4", label: "4" },
    { val: "5", label: "5" },
] as const
export type TPriorityOptions = typeof priorityOptions[number]['val']
