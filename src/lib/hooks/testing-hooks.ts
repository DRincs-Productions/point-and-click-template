import { useNqtrFunctions } from "@/lib/hooks/nqtr-hooks";
import { testing as nqtrTesting } from "@drincs/nqtr";
import { useNarrationFunctions } from "@/lib/hooks/narration-hooks";
import { useGameProps } from "@/lib/hooks/props-hooks";
import { Game } from "@drincs/pixi-vn";
import { useEffect } from "react";

export function useTestingBridge() {
    useEffect(() => {
        nqtrTesting.enable();
        return () => {
            nqtrTesting.disable();
            nqtrTesting.setActions({});
        };
    }, []);
    const gameProps = useGameProps();
    const nqtrActions = useNqtrFunctions();
    const { goNext, goBack, selectChoice, startNewGame, jump, call } = useNarrationFunctions();

    useEffect(() => {
        Game.testing.setProps(gameProps);
        nqtrTesting.setProps(gameProps);
        nqtrTesting.setActions(nqtrActions);
        Game.testing.setActions({
            continue: goNext,
            back: goBack,
            selectChoice,
            start: async (label, props) => {
                await gameProps.navigate({ to: "/game/narration" });
                return await startNewGame(label, props);
            },
            navigate: async (screen) => {
                await gameProps.navigate({ to: screen });
                await gameProps.invalidateInterfaceData();
            },
            jump,
            call,
        });
    }, [nqtrActions, gameProps, goNext, goBack, selectChoice, startNewGame, jump, call]);
}
