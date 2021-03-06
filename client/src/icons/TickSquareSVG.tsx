import React from "react";
import { SvgIcon } from "@material-ui/core";
import { AwesomeTheme } from "styles/theme";
import { ISvgIcon } from "./types";

export const TickSquareSVG: React.FC<ISvgIcon> = (props) => {
    const width = props.width || `${AwesomeTheme.spacing(3)}px`
    const height = props.height ||  `${AwesomeTheme.spacing(3)}px`

    return (
        <SvgIcon style={{ width, height }} {...props}>
            <path fillRule="evenodd" clipRule="evenodd"
                d="M7.665 3.5C5.135 3.5 3.5 5.233 3.5 7.916V16.084C3.5 18.767 5.135 20.5 7.665 20.5H16.333C18.864 20.5 20.5 18.767 20.5 16.084V7.916C20.5 5.233 18.864 3.5 16.334 3.5H7.665ZM16.333 22H7.665C4.276 22 2 19.622 2 16.084V7.916C2 4.378 4.276 2 7.665 2H16.334C19.723 2 22 4.378 22 7.916V16.084C22 19.622 19.723 22 16.333 22Z"
            />
            <path fillRule="evenodd" clipRule="evenodd"
                d="M10.8137 15.1232C10.6227 15.1232 10.4297 15.0502 10.2837 14.9032L7.90969 12.5302C7.61669 12.2372 7.61669 11.7632 7.90969 11.4702C8.20269 11.1772 8.67669 11.1772 8.96969 11.4702L10.8137 13.3122L15.0297 9.09719C15.3227 8.80419 15.7967 8.80419 16.0897 9.09719C16.3827 9.39019 16.3827 9.86419 16.0897 10.1572L11.3437 14.9032C11.1977 15.0502 11.0057 15.1232 10.8137 15.1232Z"
            />
        </SvgIcon>
    );
}