import type TimeSlotsImage from "@/models/TimeSlotsImage";
import type { OnRunProps } from "@drincs/nqtr";
import type { AssetAliasIdType } from "@drincs/pixi-vn";
import type { ContainerChild } from "@drincs/pixi-vn/pixi.js";
import type { ReactElement } from "react";

export type PixiUIProp =
    | TimeSlotsImage
    | string
    | ContainerChild
    | ((props: OnRunProps) => ContainerChild | Promise<ContainerChild>);
export type PixiUIParam<T> =
    | TimeSlotsImage
    | AssetAliasIdType
    | ContainerChild
    | ((props: T, runProps: OnRunProps) => ContainerChild | Promise<ContainerChild>);
export type ReactUIProp = ReactElement | ((props: OnRunProps) => ReactElement);
export type ReactUIParam<T> = ReactElement | ((props: T, runProps: OnRunProps) => ReactElement);
