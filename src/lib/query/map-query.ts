import { INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import { useGameProps } from "@/lib/hooks/props-hooks";
import { useQueryTime } from "@/lib/query/time-query";
import { normalizePixiElement } from "@/lib/utils/ui-utility";
import type { PixiUIProp } from "@/models/ui-elements";
import { navigator, RegisteredMaps } from "@drincs/nqtr";
import { Assets, ImageSprite } from "@drincs/pixi-vn";
import type { ContainerChild } from "@drincs/pixi-vn/pixi.js";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

const MAP_USE_QUERY_KEY = "map_use_query_key";
export function useQueryMap(id?: string) {
    const gameProps = useGameProps();
    const { data: { day, hour } = {} } = useQueryTime();

    const loadIcons = useCallback(
        (items: Array<{ sprite?: PixiUIProp }>) =>
            items.reduce(async (accPromise, { sprite }) => {
                const acc = await accPromise;
                if (!sprite) return acc;
                const icon = await normalizePixiElement(sprite, gameProps);
                if (typeof icon === "string") {
                    const s = new ImageSprite({}, icon);
                    await s.load();
                    acc.push(s);
                    return acc;
                }
                acc.push(icon);
                return acc;
            }, Promise.resolve<(ImageSprite | ContainerChild)[]>([])),
        [gameProps],
    );

    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUERY_KEY, MAP_USE_QUERY_KEY, id, day, hour],
        queryFn: async () => {
            if (!id) return {};
            const map = RegisteredMaps.get(id);
            if (!map) return undefined;

            let background = await normalizePixiElement(map.background, gameProps);
            if (typeof background === "string") {
                const sprite = new ImageSprite({}, background);
                await sprite.load();
                background = sprite;
            }

            const locations = await loadIcons(map.locations);

            map.neighboringMaps.north && Assets.backgroundLoadBundle(map.neighboringMaps.north);
            map.neighboringMaps.south && Assets.backgroundLoadBundle(map.neighboringMaps.south);
            map.neighboringMaps.east && Assets.backgroundLoadBundle(map.neighboringMaps.east);
            map.neighboringMaps.west && Assets.backgroundLoadBundle(map.neighboringMaps.west);

            return {
                map: map,
                background: background,
                locations,
            };
        },
        placeholderData: keepPreviousData,
    });
}

export const CURRENT_MAP_USE_QUERY_KEY = "current_map_use_query_key";
export function useQueryCurrentMapId() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUERY_KEY, CURRENT_MAP_USE_QUERY_KEY],
        queryFn: async () => navigator.currentMap?.id,
        placeholderData: keepPreviousData,
    });
}

export function useQueryCurrentMap() {
    const { data: currentMapId } = useQueryCurrentMapId();
    return useQueryMap(currentMapId);
}
