import React from "react";
import { SvgIcon } from "@material-ui/core";
import { AwesomeTheme } from "styles/theme";
import { ISvgIcon } from "./types";

export const CloseSquareSVG: React.FC<ISvgIcon> = (props) => {
    const width = props.width || `${AwesomeTheme.spacing(3)}px`
    const height = props.height || `${AwesomeTheme.spacing(3)}px`

    return (
        <SvgIcon style={{ width, height }} {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M9.60229 15.1365C9.41029 15.1365 9.21829 15.0635 9.07229 14.9165C8.77929 14.6235 8.77929 14.1495 9.07229 13.8565L13.8643 9.06448C14.1573 8.77148 14.6313 8.77148 14.9243 9.06448C15.2173 9.35748 15.2173 9.83148 14.9243 10.1245L10.1323 14.9165C9.98629 15.0635 9.79429 15.1365 9.60229 15.1365Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M14.3963 15.1395C14.2043 15.1395 14.0123 15.0665 13.8663 14.9195L9.07034 10.1225C8.77734 9.82952 8.77734 9.35552 9.07034 9.06252C9.36434 8.76952 9.83834 8.76952 10.1303 9.06252L14.9263 13.8595C15.2193 14.1525 15.2193 14.6265 14.9263 14.9195C14.7803 15.0665 14.5873 15.1395 14.3963 15.1395Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M7.665 3.5C5.135 3.5 3.5 5.233 3.5 7.916V16.084C3.5 18.767 5.135 20.5 7.665 20.5H16.333C18.864 20.5 20.5 18.767 20.5 16.084V7.916C20.5 5.233 18.864 3.5 16.334 3.5H7.665ZM16.333 22H7.665C4.276 22 2 19.622 2 16.084V7.916C2 4.378 4.276 2 7.665 2H16.334C19.723 2 22 4.378 22 7.916V16.084C22 19.622 19.723 22 16.333 22Z" />
        </SvgIcon>
    );
}