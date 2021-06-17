import React from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { TRowData } from "./AwesomeTable";

export type TBaseActionButtonProps = { rowData: TRowData, rowId: number }

// export const ActionButtonMenu: React.FC<TBaseActionButtonProps> = props => {
//     const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//     const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
//     const handleClose = () => setAnchorEl(null)

//     const viewDetailsHandler = () => {
//         console.log("View details for: ")
//         setAnchorEl(null)
//     }

//     const viewPlacementsHandler = () => {
//         console.log("View placements for: ")
//         setAnchorEl(null)
//     }

//     return (
//         <>
//             <Button aria-controls="simple-menu" onClick={handleClick}>Action</Button>
//             <Menu
//                 id="simple-menu"
//                 anchorEl={anchorEl}
//                 getContentAnchorEl={null}
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'right',
//                   }}
//                 transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//                 }}
//                 keepMounted
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}
//             >
//                 <MenuItem onClick={viewDetailsHandler}>View Details</MenuItem>
//                 <MenuItem onClick={viewPlacementsHandler}>View Placements</MenuItem>
//             </Menu>
//         </>
//     )
// }
