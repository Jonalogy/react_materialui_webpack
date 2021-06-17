import Excel from "exceljs";
import * as yup from "yup"
import { TExcelRow } from "app/domains/discovery/types"
import { ValidationError } from "yup";

export const parseExcel = async (buffer: Uint8Array) => {
    const WorkbookReader = new Excel.Workbook()

    try {
        const workbook = await WorkbookReader.xlsx.load(buffer)

        const worksheet = workbook.worksheets[0]

        // Get a range of row values
        let headers = (workbook.worksheets[0].getRow(1).values as string[]).map(val => {
            return `${val}`.split(" ").reduce((acc, next, idx) => {
                if (!next) {
                    return acc
                }
                if (idx === 0) {
                    return acc + next.toLowerCase()
                }

                return acc + (next[0].toUpperCase() + next.slice(1).toLowerCase())

            }, "")
        })

        let rowData = workbook.worksheets[0]
            .getRows(
                2,
                worksheet.actualRowCount - 1 // Offseting the excluded header row 
            )!

        const processRichText = (next: string | { richText: any[] }) => {
            // @ts-ignore
            if (next.richText) {
                // @ts-ignore
                return next.richText.find(i => i.text).text!
            }
            return next
        }
        let transformedData = rowData.map(
            ({ values }) => (values as Excel.CellValue[])
                .reduce((acc, next, idx) => {
                    if (!idx) return acc

                    let nextKey = headers[idx]

                    return {
                        ...acc,
                        // @ts-ignore
                        [nextKey]: processRichText(next)
                    }
                }, {} as TExcelRow)
        )
        transformedData = transformedData.map((value: TExcelRow, index) => {
            return {
                ...value,
                row: index
            }
        })
        return transformedData
    } catch (error) {
        console.error(error)
    }
}

const excelRowSchema = yup.object({
    url: yup.string().url("Incorrect URL format").required("Missing URL input"),
    id: yup.string().required("Missing ID input"),
    inventoryType: yup.string(),
    name: yup.string(),
    grouping: yup.string(),
    language: yup.string(),
})

const excelSchema = yup.array().of(excelRowSchema)

export const validateParsedData = async (parsedData: TExcelRow[]) => {
    let errorDetail: ValidationError[] = []

    try {
        await excelSchema.validate(parsedData, { abortEarly: false })
    }
    catch (e) {
        errorDetail = e.inner
        return errorDetail
    }
    return errorDetail
}