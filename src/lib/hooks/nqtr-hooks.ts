import { CANVAS_UI_LAYER_NAME, INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import { useGameProps } from "@/lib/hooks/props-hooks";
import { useQueryCurrentMap } from "@/lib/query/map-query";
import { useQueryCurrentRoom } from "@/lib/query/room-query";
import { GameStatus } from "@/lib/stores/game-status-store";
import {
    navigator,
    questsNotebook,
    routine,
    timeTracker,
    RegisteredRooms,
    RegisteredActivities,
    RegisteredCommitments,
    RegisteredQuests,
    type NqtrTestingActions,
    type OnRunProps,
} from "@drincs/nqtr";
import { canvas, storage } from "@drincs/pixi-vn";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export function useMapLayerSync() {
    const { data: { background, locations } = {} } = useQueryCurrentMap();

    useEffect(() => {
        const layer = canvas.layers.get(CANVAS_UI_LAYER_NAME);
        if (layer) {
            if (background) layer.addChild(background);
            locations?.forEach((location) => {
                layer.addChild(location);
            });
        }

        return () => {
            canvas.layers.get(CANVAS_UI_LAYER_NAME)?.removeChildren();
        };
    }, [background, locations]);

    return null;
}

export function useRoomLayerSync() {
    const {
        data: {
            room: { automaticFunctions = [], id } = {},
            background,
            activities,
            routine: routineIcons,
        } = {},
    } = useQueryCurrentRoom();
    const gameProps = useGameProps();
    const autoRunning = useRef(false);

    useEffect(() => {
        if (!id || id !== navigator.currentRoomId) return;

        const layer = canvas.layers.get(CANVAS_UI_LAYER_NAME);
        if (layer) {
            if (background) layer.addChild(background);

            activities?.forEach((icon) => {
                layer.addChild(icon);
            });
            routineIcons?.forEach((icon) => {
                layer.addChild(icon);
            });
        }

        if (automaticFunctions.length > 0 && !autoRunning.current) {
            autoRunning.current = true;
            const automaticFunction = automaticFunctions[0];
            GameStatus.setLoading(true);
            automaticFunction(gameProps).finally(() => {
                GameStatus.setLoading(false);
                autoRunning.current = false;
            });
        }

        return () => {
            canvas.layers.get(CANVAS_UI_LAYER_NAME)?.removeChildren();
        };
    }, [id, background, automaticFunctions, gameProps, activities, routineIcons]);

    return null;
}

const NOT_CAN_SPEND_TIME_FLAG_KEY = "not_can_spend_time";
export default function useTimeTracker() {
    const { t } = useTranslation(["ui"]);
    const queryClient = useQueryClient();

    const sleep = useCallback(
        (newDayHour: number, props: OnRunProps) => {
            if (storage.flags.get(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
                toast(t("cant_sleep_now"));
                return false;
            }
            timeTracker.increaseDate(1, newDayHour);
            routine.clearExpiredRoutine();
            navigator.clearExpiredActivities();
            questsNotebook.startsStageMustBeStarted(props);
            return true;
        },
        [t],
    );

    const wait = useCallback(
        (timeSpent: number) => {
            if (storage.flags.get(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
                toast(t("cant_sleep_now"));
                return false;
            }
            if (timeTracker.currentTime + timeSpent >= 23 || timeTracker.currentTime < 5) {
                toast(t("cant_wait_now"));
                return false;
            }
            timeTracker.increaseTime(timeSpent);
            queryClient.invalidateQueries({
                queryKey: [INTERFACE_DATA_USE_QUERY_KEY],
            });
            return true;
        },
        [t, queryClient],
    );

    return {
        sleep,
        wait,
    };
}

/** Shared UI actions used by components and the development testing bridge. */
export function useNqtrFunctions(): NqtrTestingActions {
    const props = useGameProps();
    return useMemo(() => {
        const requireItem = <T>(
            registry: { has(id: string): boolean; get(id: string): T | undefined },
            id: string,
        ): T => {
            if (!registry.has(id)) throw new Error(`Unknown NQTR id: ${id}`);
            const value = registry.get(id);
            if (!value) throw new Error(`Unavailable NQTR id: ${id}`);
            return value;
        };
        const room = (id: string) => requireItem(RegisteredRooms, id);
        const activity = (id: string) => requireItem(RegisteredActivities, id);
        const commitment = (id: string) => requireItem(RegisteredCommitments, id);
        const quest = (id: string) => requireItem(RegisteredQuests, id);
        const perform = async <T>(action: () => T | Promise<T>, refresh = true): Promise<T> => {
            GameStatus.setLoading(true);
            try {
                const result = await action();
                if (refresh) await props.invalidateInterfaceData();
                return result;
            } finally {
                GameStatus.setLoading(false);
            }
        };
        const available = (
            item: { id: string; disabled: boolean; hidden: boolean },
            items: { id: string }[],
        ) => {
            if (item.disabled || item.hidden || !items.some((value) => value.id === item.id)) {
                throw new Error(`NQTR item is unavailable in the current room: ${item.id}`);
            }
        };
        return {
            goToRoom: (id) =>
                perform(async () => {
                    const target = room(id);
                    if (target.disabled || target.hidden)
                        throw new Error(`Room is unavailable: ${id}`);
                    navigator.currentRoom = target;
                    await props.navigate({ to: "/game/navigation" });
                }),
            increaseTime: (amount) =>
                perform(() => {
                    timeTracker.increaseTime(amount);
                }),
            increaseDate: (days, hour) =>
                perform(() => {
                    timeTracker.increaseDate(days, hour);
                }),
            addActivity: (id, activityId) =>
                perform(() => room(id).addActivity(activity(activityId))),
            removeActivity: (id, activityId) =>
                perform(() => room(id).removeActivity(activity(activityId))),
            addCommitment: (id, commitmentId) =>
                perform(() => room(id).addCommitment(commitment(commitmentId))),
            removeRoutine: (id) => perform(() => routine.remove(commitment(id))),
            runActivity: (id) =>
                perform(() => {
                    const item = activity(id);
                    available(item, navigator.currentRoom?.activities ?? []);
                    return item.run(props);
                }, false),
            runCommitment: (id) =>
                perform(() => {
                    const item = commitment(id);
                    available(item, navigator.currentRoom?.routine ?? []);
                    return item.run(props);
                }, false),
            startQuest: (id) => perform(() => quest(id).start(props)),
            continueQuest: (id) => perform(() => quest(id).continue(props)),
        };
    }, [props]);
}
