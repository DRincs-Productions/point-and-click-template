import { timeTracker } from "@drincs/nqtr";
import type { AssetAliasIdType } from "@drincs/pixi-vn";

enum TimeSlotsEnumNumber {
    MORNING = 0,
    AFTERNOON = 1,
    EVENING = 2,
    NIGHT = 3,
}

export default class TimeSlotsSound {
    constructor(
        data:
            | {
                  morning: AssetAliasIdType;
                  afternoon: AssetAliasIdType;
                  evening: AssetAliasIdType;
                  night: AssetAliasIdType;
              }
            | AssetAliasIdType,
    ) {
        if (typeof data === "string") {
            this.morning = data;
            this.afternoon = data;
            this.evening = data;
            this.night = data;
            return;
        }
        this.morning = data.morning;
        this.afternoon = data.afternoon;
        this.evening = data.evening;
        this.night = data.night;
    }

    get src(): AssetAliasIdType {
        if (timeTracker.currentTimeSlot === TimeSlotsEnumNumber.MORNING) return this.morning;
        if (timeTracker.currentTimeSlot === TimeSlotsEnumNumber.EVENING) return this.evening;
        if (timeTracker.currentTimeSlot === TimeSlotsEnumNumber.NIGHT) return this.night;
        return this.afternoon;
    }

    morning: AssetAliasIdType;
    afternoon: AssetAliasIdType;
    evening: AssetAliasIdType;
    night: AssetAliasIdType;
}
