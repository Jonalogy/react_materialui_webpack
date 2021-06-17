import React from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { TPlacement } from "app/domains/moderation/types"
import { TBaseActionButtonProps } from "baseComponents/ActionButtonMenu";
import { TRowData } from "baseComponents/AwesomeTable";
import { useHistory } from "react-router";

interface IDiscoveryActions extends TBaseActionButtonProps {
    rowData: TPlacement | TRowData
}

export type TDiscoveryActionCreator =  (fns: { setOpenRow: Function }) => React.FC<IDiscoveryActions>
export const DiscoveryActions: TDiscoveryActionCreator = (fns) => {
    return (props) => {
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const history = useHistory()
        
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
        const handleClose = () => setAnchorEl(null)

        const viewDetailsHandler = () => {
            setAnchorEl(null)
            fns.setOpenRow(props.rowId)
        }

        // TODO: To search for batch based on BatchID; Endpoint is not ready for the time being
        const viewPlacementsHandler = () => {
            console.log("[Upcoming Feature] View placements specific to batch:" + props.rowData.batchID)
            history.push("/moderation")
        }

        return (
            <>
                <Button aria-controls="discovery-details-menu" onClick={handleClick}>Action</Button>
                <Menu
                    id="discovery-details-menu"
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
                    <MenuItem onClick={viewPlacementsHandler}>View Placements</MenuItem>
                    {/* <MenuItem>Export</MenuItem> */}
                </Menu>
            </>
        )
    }
}
