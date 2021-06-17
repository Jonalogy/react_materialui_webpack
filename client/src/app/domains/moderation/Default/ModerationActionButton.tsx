import React from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { TPlacement } from "app/domains/moderation/types"
import { TBaseActionButtonProps } from "baseComponents/ActionButtonMenu";
import { TRowData } from "baseComponents/AwesomeTable";
import { useAppDispatch } from "hooks";
import { deletePlacementThunk } from "../moderationSlice";

interface IModerationActions extends TBaseActionButtonProps {
    rowData: TPlacement | TRowData
}

export type TModerationActionCreator = (fns: { setOpenRow: Function }) => React.FC<IModerationActions>
export const ModerationActions: TModerationActionCreator = (fns) => {
    return (props) => {
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const dispatch = useAppDispatch()
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
        const handleClose = () => setAnchorEl(null)

        const viewDetailsHandler = () => {
            fns.setOpenRow(props.rowId)
            setAnchorEl(null)
        }

        const deletePlacementHandler = () => {
            console.log("[Upcoming Feature] Deleting placementID:", props.rowData.placementID)
            setAnchorEl(null)
            dispatch(deletePlacementThunk({ placementID: props.rowData.placementID }))
        }

        return (
            <>
                <Button aria-controls="simple-menu" onClick={handleClick}>Action</Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={viewDetailsHandler}>View Details</MenuItem>
                    <MenuItem onClick={deletePlacementHandler}>Delete</MenuItem>
                </Menu>
            </>
        )
    }
}
