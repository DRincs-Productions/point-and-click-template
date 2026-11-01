import TimeSlotsImage from "@/models/TimeSlotsImage";
import type { PixiUIProp } from "@/models/ui-elements";
import type { OnRunProps } from "@drincs/nqtr";

export async function normalizePixiElement(element: PixiUIProp, props: OnRunProps) {
    if (typeof element === "function") {
        element = await element(props);
    }
    if (element instanceof TimeSlotsImage) {
        element = element.src;
    }
    return element;
}
