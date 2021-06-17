import Excel from 'exceljs'
import { TPriorityOptions, TSourceTypeOptions } from '../contantsTypes'

export type TExcelRow = {
    row: number;
    inventoryType: Excel.CellValue;
    name: Excel.CellValue;
    url: Excel.CellValue;
    id: Excel.CellValue;
    grouping: Excel.CellValue;
    language: Excel.CellValue;
    [k: string]: Excel.CellValue;
}

export type TExcelData = {
    batchName: string,
    sourceType: TSourceTypeOptions,
    placementList: TExcelRow[],
    priority: TPriorityOptions
}

export type TExcelRawData = Omit<TExcelData, "placementList"> & { buffer: Uint8Array } 

export type TBatch = {
    batchID: number
    batchName: string,
    dateUploaded: string,
    duplicates: number,
    new: number,
    placements: number
    priority: number,
    sourceType: string | null,
    // The following are not implemented from the backend yet
    dupes: number,
    approved: number,
    rejected: number,
    assignedRatio: number,
    moderatedRatio: number,
    qcRatio: number
    contributer: string
}
