import { SvgIcon } from "@material-ui/core";

export interface ISvgIcon extends React.ComponentProps<typeof SvgIcon> {
    width?: string;
    height?: string;
}
