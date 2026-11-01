import { INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import { useGameProps } from "@/lib/hooks/props-hooks";
import { useQueryTime } from "@/lib/query/time-query";
import { normalizePixiElement } from "@/lib/utils/ui-utility";
import type { PixiUIProp } from "@/models/ui-elements";
import { navigator, RegisteredRooms } from "@drincs/nqtr";
import { Assets, ImageSprite } from "@drincs/pixi-vn";
import type { ContainerChild } from "@drincs/pixi-vn/pixi.js";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

const ROOM_USE_QUERY_KEY = "room_use_query_key";
export function useQueryRoom(id?: string) {
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
        queryKey: [INTERFACE_DATA_USE_QUERY_KEY, ROOM_USE_QUERY_KEY, id, day, hour],
        queryFn: async () => {
            if (!id) return {};
            const room = RegisteredRooms.get(id);
            if (!room) return {};

            const routine = room.routine;
            const routineBackground = room.routine.find((c) => c.background)?.background;

            const backgroundSource = routineBackground || room.background;
            let background = backgroundSource ? await normalizePixiElement(backgroundSource, gameProps) : undefined;
            if (typeof background === "string") {
                const sprite = new ImageSprite({}, background);
                await sprite.load();
                background = sprite;
            }

            const icon = room.background ? await normalizePixiElement(room.background, gameProps) : undefined;

            const activitiesIcons = await loadIcons(room.activities);
            const routineIcons = await loadIcons(routine);

            return {
                room,
                background,
                icon: typeof icon === "string" ? icon : undefined,
                activities: activitiesIcons,
                routine: routineIcons,
            };
        },
        placeholderData: keepPreviousData,
    });
}

export const CURRENT_ROOM_ID_USE_QUERY_KEY = "current_room_id_use_query_key";
export function useQueryCurrentRoomId() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUERY_KEY, CURRENT_ROOM_ID_USE_QUERY_KEY],
        queryFn: async () => navigator.currentRoomId,
        placeholderData: keepPreviousData,
    });
}

export function useQueryCurrentRoom() {
    const { data: currentRoomId } = useQueryCurrentRoomId();
    return useQueryRoom(currentRoomId);
}

const QUICK_ROOMS_USE_QUERY_KEY = "quick_rooms_use_query_key";
export function useQueryQuickRooms() {
    return useQuery({
        queryKey: [INTERFACE_DATA_USE_QUERY_KEY, QUICK_ROOMS_USE_QUERY_KEY],
        queryFn: async () => {
            const rooms = navigator.currentLocation?.rooms || [];
            const loadRoomsImage = async () => {
                rooms?.forEach((room) => {
                    Assets.backgroundLoadBundle(room.id);
                    Assets.backgroundLoadBundle(room.activitiesIds);
                    Assets.backgroundLoadBundle(room.routine.map((commitment) => commitment.id));
                });
            };
            loadRoomsImage();
            return rooms;
        },
        placeholderData: keepPreviousData,
    });
}
