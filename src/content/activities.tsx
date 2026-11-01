import { ActivityBaseButton } from "@/components/screens/navigation/activity-buttons";
import Activity from "@/models/Activity";
import { RegisteredActivities, timeTracker } from "@drincs/nqtr";
import { narration } from "@drincs/pixi-vn";
import { Bed, Package, ShoppingCart } from "lucide-react";

export const bed = new Activity(
    "bed",
    async (_, props) => {
        await props.navigate({ to: "/game/narration" });
        if (timeTracker.nowIsBetween(5, 22)) {
            await narration.jump("nap", props);
        } else {
            await narration.jump("sleep", props);
        }
    },
    {
        name: "bed",
        icon: (activity, props) => {
            return (
                <ActivityBaseButton
                    disabled={activity.disabled}
                    onClick={() => activity.run(props)}
                    ariaLabel={props.uiTransition(activity.name)}
                >
                    <Bed className="size-6 sm:size-8 md:size-10 lg:size-12 xl:size-14" />
                </ActivityBaseButton>
            );
        },
    },
);

export const orderProduct = new Activity(
    "order_product",
    async (_, props) => {
        await props.navigate({ to: "/game/narration" });
        await narration.jump("order_product", props);
    },
    {
        name: "order_product",
        icon: (activity, props) => {
            return (
                <ActivityBaseButton
                    disabled={activity.disabled}
                    onClick={() => activity.run(props)}
                    ariaLabel={props.uiTransition(activity.name)}
                >
                    <ShoppingCart className="size-6 sm:size-8 md:size-10 lg:size-12 xl:size-14" />
                </ActivityBaseButton>
            );
        },
    },
);

export const takeProduct = new Activity(
    "take_product",
    async (_, props) => {
        await props.navigate({ to: "/game/narration" });
        await narration.jump("take_product", props);
    },
    {
        name: "take_product",
        icon: (activity, props) => {
            return (
                <ActivityBaseButton
                    disabled={activity.disabled}
                    onClick={() => activity.run(props)}
                    ariaLabel={props.uiTransition(activity.name)}
                >
                    <Package className="size-6 sm:size-8 md:size-10 lg:size-12 xl:size-14" />
                </ActivityBaseButton>
            );
        },
    },
);

RegisteredActivities.add(bed, orderProduct, takeProduct);
