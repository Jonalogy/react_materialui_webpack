import { TSourceTypeOptions, TPriorityOptions } from "app/domains/contantsTypes";

export type TNewBatchDetails = {
    name: string,
    sourceType: TSourceTypeOptions,
    priority: TPriorityOptions
}

export enum UploadErrorEnum {
    PARSED_ERROR = "PARSED_ERROR",
    VALIDATION_ERROR = "VALIDATION_ERROR",
    UPLOAD_BATCHES_ERROR = "UPLOAD_BATCHES_ERROR",
}

export type TExcelRowError = {
    rowNumber: string,
    message: string,
}