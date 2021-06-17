import React from "react";
import { SvgIcon, Theme } from "@material-ui/core";
import { AwesomeTheme } from "styles/theme";
import { ISvgIcon } from "./types";

export const ArrowLeftSVG: React.FC<ISvgIcon> = (props) => {
    const width = props.width || `${AwesomeTheme.spacing(3)}px`
    const height = props.height || `${AwesomeTheme.spacing(3)}px`

    return (
        <SvgIcon
            style={{ width, height }}
            {...props}>
            <path
                d="M20 12.2739C20 12.6536 19.7178 12.9674 19.3518 13.0171L19.25 13.0239L4.25 13.0239C3.83579 13.0239 3.5 12.6881 3.5 12.2739C3.5 11.8942 3.78215 11.5804 4.14823 11.5308L4.25 11.5239L19.25 11.5239C19.6642 11.5239 20 11.8597 20 12.2739Z"
            />
            <path
                d="M10.829 17.767C11.1225 18.0593 11.1235 18.5342 10.8313 18.8277C10.5656 19.0945 10.149 19.1196 9.85489 18.9024L9.77062 18.83L3.72062 12.806C3.45298 12.5395 3.42863 12.1214 3.64759 11.8273L3.72057 11.7431L9.77057 5.71808C10.0641 5.4258 10.5389 5.42678 10.8312 5.72028C11.0969 5.9871 11.1203 6.40381 10.9018 6.69697L10.829 6.78094L5.313 12.2748L10.829 17.767Z"
            />
        </SvgIcon>
    );
}