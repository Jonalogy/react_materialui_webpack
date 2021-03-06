import React from "react";
import { SvgIcon } from "@material-ui/core";
import { AwesomeTheme } from "styles/theme";
import { ISvgIcon } from "./types";

export const CloseSVG: React.FC<ISvgIcon> = (props) => {
    const width = props.width || `${AwesomeTheme.spacing(3)}px`
    const height = props.height || `${AwesomeTheme.spacing(3)}px`

    return (
        <SvgIcon style={{ width, height }} {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M8.19386 16.9975C7.88888 16.9975 7.5839 16.8815 7.35199 16.648C6.88658 16.1826 6.88658 15.4297 7.35199 14.9643L14.9638 7.35248C15.4292 6.88706 16.1821 6.88706 16.6475 7.35248C17.1129 7.81789 17.1129 8.57081 16.6475 9.03622L9.03573 16.648C8.80382 16.8815 8.49884 16.9975 8.19386 16.9975Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M15.8091 17.002C15.5041 17.002 15.1991 16.886 14.9672 16.6525L7.34906 9.0328C6.88365 8.56739 6.88365 7.81447 7.34906 7.34906C7.81606 6.88365 8.56898 6.88365 9.0328 7.34906L16.6509 14.9688C17.1164 15.4342 17.1164 16.1871 16.6509 16.6525C16.419 16.886 16.1125 17.002 15.8091 17.002Z" />
        </SvgIcon>
    );
}