import type { PixiUIProp, ReactUIProp } from "@/models/ui-elements";
import type { StepLabelProps } from "@drincs/pixi-vn";

declare module "@drincs/nqtr" {
    interface OnRunProps extends StepLabelProps {}
    interface ActivityInterface {
        /**
         * The name of the activity.
         */
        readonly name: string;
        /**
         * Whether is disabled.
         */
        disabled: boolean;
        /**
         * Whether is hidden.
         */
        hidden: boolean;
        /**
         * The sprite of the activity.
         */
        readonly sprite?: PixiUIProp;
        /**
         * The React icon of the activity.
         */
        readonly icon?: ReactUIProp;
    }
    interface CommitmentInterface {
        /**
         * The name of the commitment.
         */
        readonly name: string;
        /**
         * The sprite of the commitment.
         */
        readonly sprite?: PixiUIProp;
        /**
         * The background of the commitment.
         */
        readonly background?: PixiUIProp;
        /**
         * The React icon of the commitment.
         */
        readonly icon?: ReactUIProp;
        /**
         * Whether is disabled.
         */
        disabled: boolean;
        /**
         * Whether is hidden.
         */
        hidden: boolean;
    }
    interface LocationInterface {
        /**
         * The name of the location.
         * If you set undefined, it will return the initial value of name.
         */
        readonly name: string;
        /**
         * Whether is disabled.
         */
        disabled: boolean;
        /**
         * Whether is hidden.
         */
        hidden: boolean;
        /**
         * The sprite of the location.
         */
        readonly sprite: PixiUIProp;
        /**
         * The entrance room of the location.
         */
        readonly entrance: RoomInterface | undefined;
    }
    interface MapInterface {
        /**
         * The name of the map.
         */
        readonly name: string;
        /**
         * The background of the map.
         */
        readonly background: PixiUIProp;
        /**
         * Neighboring maps.
         */
        readonly neighboringMaps: NeighboringMaps;
    }
    interface QuestInterface {
        /**
         * The name of the quest.
         */
        readonly name: string;
        /**
         * The description of the quest.
         */
        readonly description: string;
        /**
         * The image of the quest.
         */
        readonly image?: string;
        /**
         * If the quest is in development.
         */
        readonly inDevelopment: boolean;
    }
    interface RoomInterface {
        /**
         * The name.
         * If you set undefined, it will return the initial value of name.
         */
        readonly name: string;
        /**
         * The background of the room.
         */
        readonly background?: PixiUIProp;
        /**
         * Whether is disabled.
         */
        disabled: boolean;
        /**
         * Whether is hidden.
         */
        hidden: boolean;
        /**
         * If is the entrance of the location. (the first room)
         */
        readonly isEntrance: boolean;
    }
    interface StageInterface {
        /**
         * The name of the stage.
         */
        readonly name: string;

        /**
         * The description of the stage.
         */
        readonly description: string;

        /**
         * The advice description of the stage.
         */
        readonly adviceDescription: string;

        /**
         * The image of the stage.
         */
        readonly image?: string;

        /**
         * The list of flags that the player must complete to finish the stage.
         */
        readonly flags: StageFlags[];

        /**
         * The list of flags required to start the stage.
         */
        readonly flagsRequired: StageFlags[];

        /**
         * The description of the request to start the stage.
         */
        readonly requestDescriptionToStart: string;
    }
}
interface StageFlags {
    /**
     * The flag for checking if the condition is met.
     */
    readonly flag: string;
    /**
     * The description of the flag.
     */
    readonly description: string;
}
interface NeighboringMaps {
    north?: string;
    south?: string;
    east?: string;
    west?: string;
}
