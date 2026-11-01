import { Store } from "@tanstack/store";

type InterfaceSettingsStorage = {
    dialogueCardHeight: number;
    dialogueCardImageWidth: number;
};

export namespace InterfaceSettings {
    export const store = new Store<InterfaceSettingsStorage>({
        dialogueCardHeight: Number(localStorage.getItem("dialogue_card_height") ?? 30),
        dialogueCardImageWidth: Number(localStorage.getItem("dialogue_card_image_width") ?? 16),
    });

    export function setHidden(value: boolean) {
        store.setState((state) => ({ ...state, hidden: value }));
    }

    export function show() {
        store.setState((state) => ({ ...state, hidden: false }));
    }

    export function setDialogueCardHeight(value: number) {
        localStorage.setItem("dialogue_card_height", value.toString());
        store.setState((state) => ({ ...state, dialogueCardHeight: value }));
    }

    export function setDialogueCardImageWidth(value: number) {
        localStorage.setItem("dialogue_card_image_width", value.toString());
        store.setState((state) => ({ ...state, dialogueCardImageWidth: value }));
    }
}
