import React from "react";
import { PublicLayout } from "app/layouts/PublicLayout";
import { AuthenticatedLayout } from "app/layouts/AuthenticatedLayout";
import { Dashboard } from "app/domains/dashboard";
import { Discovery } from "app/domains/discovery";
import { Login } from "app/domains/login";
import { Moderation } from "app/domains/moderation";

type TPath = string
type TRouteName = string

export type TRoute = {
    name: TRouteName;
    path: TPath;
    component: React.FC | React.FunctionComponent;
    layout: React.FC | React.FunctionComponent;
}

export const PrivateRoutes: TRoute[] = [
    { name: "Dashboard", path: "/dashboard", component: Dashboard, layout: AuthenticatedLayout },
    { name: "Discovery", path: "/discovery", component: Discovery, layout: AuthenticatedLayout },
    { name: "Moderation", path: "/moderation", component: Moderation, layout: AuthenticatedLayout }
]

export const PublicRoutes: TRoute[] = [
    { name: "Login", path: "/", component: Login, layout: PublicLayout },
]
