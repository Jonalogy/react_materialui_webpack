export type TPlacement = {
    batchID: number,
    inventoryType: number,
    language: number, // TODO: API returning languageID at the moment
    moderator: string, // TODO: API in development
    name: string,
    origin: string | null, // TODO: API returning null at the moment
    placementID: number,
    priority: number
    source: string,
    sourceID: string,
    status: string,
    url: string,
}

export type TBulkUpdateField = {
    bulkUpdate: TBulkUpdate[],
    field: string
}

export type TBulkUpdate = {
    id: number,
    value: number | string,
}
