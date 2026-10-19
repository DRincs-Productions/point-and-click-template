import { CANVAS_UI_LAYER_NAME, INTERFACE_DATA_USE_QUERY_KEY } from "@/constants";
import { useGameProps } from "@/lib/hooks/props-hooks";
import { useQueryCurrentMap } from "@/lib/query/map-query";
import { useQueryCurrentRoom } from "@/lib/query/room-query";
import { GameStatus } from "@/lib/stores/game-status-store";
import { navigator, questsNotebook, routine, timeTracker, type OnRunProps } from "@drincs/nqtr";
import { canvas, storage } from "@drincs/pixi-vn";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
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
