import type { PixiUIParam, PixiUIProp } from "@/models/ui-elements";
import {
    type ActivityInterface,
    type LocationInterface,
    LocationStoredClass,
    type MapInterface,
    type OnRunProps,
    type RoomInterface,
} from "@drincs/nqtr";

export default class Location extends LocationStoredClass implements LocationInterface {
    constructor(
        id: string,
        map: MapInterface,
        props: {
            activities?: ActivityInterface[];
            name: string;
            disabled?: boolean | (() => boolean);
            hidden?: boolean | (() => boolean);
            sprite: PixiUIParam<Location>;
        },
    ) {
        super(id, map, props.activities);
        this.name = props.name;
        this._defaultDisabled = props.disabled || false;
        this._defaultHidden = props.hidden || false;
        this._sprite = props.sprite;
    }
    readonly name: string;
    private readonly _sprite: PixiUIParam<Location>;
    get sprite(): PixiUIProp {
        const sprite = this._sprite;
        if (typeof sprite === "function") {
            return (runProps: OnRunProps) => sprite(this, runProps);
        }
        return sprite;
    }
    private _defaultDisabled: boolean | (() => boolean) = false;
    get disabled(): boolean {
        const value = this.getStorageProperty<boolean>("disabled") || this._defaultDisabled;
        if (typeof value === "function") {
            return value();
        }
        return value;
    }
    set disabled(value: boolean) {
        this.setStorageProperty("disabled", value);
    }
    private _defaultHidden: boolean | (() => boolean) = false;
    get hidden(): boolean {
        const value = this.getStorageProperty<boolean>("hidden") || this._defaultHidden;
        if (typeof value === "function") {
            return value();
        }
        return value;
    }
    set hidden(value: boolean) {
        this.setStorageProperty("hidden", value);
    }
    override get rooms(): RoomInterface[] {
        return super.rooms.filter((room) => !room.hidden);
    }
    get entrance(): RoomInterface | undefined {
        if (super.rooms.length === 0) {
            return undefined;
        }
        return super.rooms.find((room) => room.isEntrance) || super.rooms[0];
    }
}
