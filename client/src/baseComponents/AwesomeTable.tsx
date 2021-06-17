import React, { ChangeEvent } from 'react'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from '@material-ui/core'
import { TBaseActionButtonProps } from './ActionButtonMenu'

// const useStyles = makeStylesWithAwesomeTheme(() => ({}))

export type THeader = { attr: string, label: string }
export type TRowData = { [k: string]: any }

export interface IAwesomeTable {
    headers: THeader[]
    rows: TRowData[]
    showColumns?: string[]
    showActionColumn: boolean
    showMultiSelectColumn?: boolean
    checkRow?: Function
    checkAll?: Function
    ActionButton: React.FC<TBaseActionButtonProps>
}

export const AwesomeTable: React.FC<IAwesomeTable> = (props) => {

    const {
        showMultiSelectColumn,
        checkAll,
        checkRow,
        showActionColumn,
        headers,
        showColumns,
        ActionButton,
        rows,
    } = props

    const tableHeaders = !showColumns ?
        headers :
        headers.filter(h => showColumns.find(i => i === h.attr))

    const rowAttributes = tableHeaders.map(({ attr }) => attr)
    const handleCheckAll = (event: ChangeEvent<HTMLInputElement>) => {
        if (checkAll) {
            checkAll(event.currentTarget.checked)
        }

    }
    const handleCheckRow = (event: ChangeEvent<HTMLInputElement>, row: TRowData) => {
        if (checkRow) {
            checkRow(event.currentTarget.checked, row)
        }
    }
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {showMultiSelectColumn &&
                            <TableCell>
                                <Checkbox
                                    defaultChecked={false}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        handleCheckAll(event)
                                    }}
                                    inputProps={{ 'aria-label': 'primary checkbox', 'title': 'check all' }}
                                />
                            </TableCell>
                        }

                        {
                            tableHeaders.map(
                                th => <TableCell key={`table-header-${th.label}`}>{th.label}</TableCell>
                            )
                        }
                        {showActionColumn && <TableCell key={`table-header-action`}>Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row, rowIdx) => {
                            return (
                                <TableRow key={`table-row-${rowIdx}`}>
                                    {showMultiSelectColumn &&
                                        <TableCell>
                                            <Checkbox
                                                checked={row.checked}
                                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                                    handleCheckRow(event, row)
                                                }}
                                                inputProps={{ 'aria-label': 'primary checkbox', 'title': `${row.id} ${row.moderator}` }}
                                            />
                                        </TableCell>
                                    }

                                    {
                                        rowAttributes.map((attr, attrIdx) => (
                                            <TableCell key={`table-row-${rowIdx}${attrIdx}`} >{row[attr]}</TableCell>
                                        ))
                                    }
                                    { showActionColumn && <TableCell>
                                        <ActionButton rowData={row} rowId={rowIdx} />
                                    </TableCell>}
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

// propTypeValidator's purpose is only to type the arguments of a custom proptype validator's arguments 
type IPropTypeCustomValidator = <T>(f: (props: IAwesomeTable, propName: string, componentName: string) => Error | null) => React.Validator<T>
const propTypeCustomValidator: IPropTypeCustomValidator = f => f as any

AwesomeTable.propTypes = ({
    showColumns: propTypeCustomValidator((props) => {
        if (Array.isArray(props.showColumns)) {
            const { showColumns, headers } = (props as IAwesomeTable)
            const matches = showColumns!.filter(col => headers.find(({ attr }) => attr === col))

            if (matches.length !== showColumns!.length) {
                return new Error("AwesomeTable column received invalid column attributes at showColumns prop")
            }
        }
        return null
    }),
    ActionButton: propTypeCustomValidator(props => {
        if (props.showActionColumn && !props.ActionButton) {
            return new Error("AwesomeTable needs ActionButton component to render action column")
        }
        if (!props.showActionColumn && props.ActionButton) {
            return new Error("AwesomeTable column is not set to render action column")
        }
        return null
    })
} as React.WeakValidationMap<IAwesomeTable>)
