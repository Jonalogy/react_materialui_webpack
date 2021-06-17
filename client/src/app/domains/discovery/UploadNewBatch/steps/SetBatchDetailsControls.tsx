import React from 'react'
import { Divider, FormControl, Grid, InputLabel, Select, TextField, Theme } from '@material-ui/core'
import { makeStylesWithAwesomeTheme } from 'styles/theme'
import { TSourceTypeOptions, TPriorityOptions, sourceTypeOptions, priorityOptions } from 'app/domains/contantsTypes'
import { TNewBatchDetails } from '../types'

const useStyles = makeStylesWithAwesomeTheme((theme: Theme) => ({
    divider: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
    formControl: {
        width: "100%"
    }
}))

interface ISetBatchDetailsControls {
    initialBatchName: string;
    batchDetails: TNewBatchDetails;
    setBatchDetails: React.Dispatch<React.SetStateAction<TNewBatchDetails>>;
}
export const SetBatchDetailsControls: React.FC<ISetBatchDetailsControls> = props => {
    const classes = useStyles()
    const { initialBatchName, batchDetails, setBatchDetails } = props

    return (
        <>
            <Divider className={classes.divider} />

            <Grid container spacing={4}>
                <Grid item xs={3}>
                    <TextField
                        className={classes.formControl}
                        id="new-batch-details-batchname"
                        label="Batch Name"
                        variant="outlined"
                        value={batchDetails.name || ""}
                        onChange={e => setBatchDetails({ ...batchDetails, name: e.target.value || initialBatchName })} />
                </Grid>
                <Grid item xs={3}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="new-batch-details-sourcetype">Source Type</InputLabel>
                        <Select
                            native
                            value={batchDetails.sourceType}
                            onChange={e => setBatchDetails({ ...batchDetails, sourceType: e.target.value as TSourceTypeOptions })}
                            label="Source Type"
                            inputProps={{
                                name: 'sourceType',
                                id: 'new-batch-details-sourcetype',
                            }}
                        >
                            {
                                sourceTypeOptions.map(({ val, label }) => <option key={`sourceType-${val}`} value={val}>{label}</option>)
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="new-batch-details-priority">Priority</InputLabel>
                        <Select
                            native
                            value={batchDetails.priority}
                            onChange={e => setBatchDetails({ ...batchDetails, priority: e.target.value as TPriorityOptions })}
                            label="Priority"
                            inputProps={{
                                name: 'priority',
                                id: 'new-batch-details-priority',
                            }}
                        >
                            {
                                priorityOptions.map(({ val, label }) => <option key={`priority-${val}`} value={val}>{label}</option>)
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}