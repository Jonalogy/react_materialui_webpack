import React from "react";
import { SvgIcon } from "@material-ui/core";
import { AwesomeTheme } from "styles/theme";
import { ISvgIcon } from "./types";

export const ActivitySVG: React.FC<ISvgIcon> = (props) => {
    const width = props.width || `${AwesomeTheme.spacing(3)}px`
    const height = props.height || `${AwesomeTheme.spacing(3)}px`

    return (
        <SvgIcon style={{ width, height }} {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M7.21653 16.0026C7.05653 16.0026 6.89553 15.9516 6.75953 15.8476C6.43153 15.5946 6.36953 15.1236 6.62253 14.7956L9.61553 10.9056C9.73753 10.7466 9.91853 10.6436 10.1165 10.6186C10.3185 10.5926 10.5165 10.6486 10.6735 10.7736L13.4935 12.9886L15.9605 9.80562C16.2145 9.47662 16.6845 9.41562 17.0125 9.67162C17.3405 9.92562 17.4005 10.3966 17.1465 10.7236L14.2165 14.5036C14.0945 14.6616 13.9145 14.7646 13.7165 14.7886C13.5165 14.8156 13.3185 14.7576 13.1605 14.6346L10.3425 12.4206L7.81153 15.7096C7.66353 15.9016 7.44153 16.0026 7.21653 16.0026Z" />
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="17" y="2" width="6" height="6">
                <path fillRule="evenodd" clipRule="evenodd" d="M17.2954 2H22.6394V7.3449H17.2954V2Z" />
            </mask>
            <g mask="url(#mask0)">
                <path fillRule="evenodd" clipRule="evenodd" d="M19.9674 3.5C19.3214 3.5 18.7954 4.025 18.7954 4.672C18.7954 5.318 19.3214 5.845 19.9674 5.845C20.6134 5.845 21.1394 5.318 21.1394 4.672C21.1394 4.025 20.6134 3.5 19.9674 3.5ZM19.9674 7.345C18.4944 7.345 17.2954 6.146 17.2954 4.672C17.2954 3.198 18.4944 2 19.9674 2C21.4414 2 22.6394 3.198 22.6394 4.672C22.6394 6.146 21.4414 7.345 19.9674 7.345Z" />
            </g>
            <mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="21">
                <path fillRule="evenodd" clipRule="evenodd" d="M2 2.8418H21.8619V22.7028H2V2.8418Z" />
            </mask>
            <g mask="url(#mask1)">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.233 22.7028H7.629C4.262 22.7028 2 20.3378 2 16.8178V8.7358C2 5.2108 4.262 2.8418 7.629 2.8418H14.897C15.311 2.8418 15.647 3.1778 15.647 3.5918C15.647 4.0058 15.311 4.3418 14.897 4.3418H7.629C5.121 4.3418 3.5 6.0658 3.5 8.7358V16.8178C3.5 19.5228 5.082 21.2028 7.629 21.2028H16.233C18.741 21.2028 20.362 19.4818 20.362 16.8178V9.7788C20.362 9.3648 20.698 9.0288 21.112 9.0288C21.526 9.0288 21.862 9.3648 21.862 9.7788V16.8178C21.862 20.3378 19.6 22.7028 16.233 22.7028Z" />
            </g>
        </SvgIcon>
    );
}