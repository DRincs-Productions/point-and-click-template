import type { PixiUIParam, PixiUIProp } from "@/models/ui-elements";
import type { NeighboringMaps } from "@/nqtr";
import {
    type ActivityInterface,
    type LocationInterface,
    type MapInterface,
    MapStoredClass,
    type OnRunProps,
} from "@drincs/nqtr";

export default class MapClass extends MapStoredClass implements MapInterface {
    constructor(
        id: string,
        props: {
            activities?: ActivityInterface[];
            name: string;
            background: PixiUIParam<MapClass>;
            neighboringMaps: NeighboringMaps;
        },
    ) {
        super(id, props.activities);
        this.name = props.name;
        this._background = props.background;
        this.neighboringMaps = props.neighboringMaps;
    }
    readonly name: string;
    private readonly _background: PixiUIParam<MapClass>;
    get background(): PixiUIProp {
        const background = this._background;
        if (typeof background === "function") {
            return (runProps: OnRunProps) => background(this, runProps);
        }
        return background;
    }
    readonly neighboringMaps: NeighboringMaps;
    override get locations(): LocationInterface[] {
        return super.locations.filter((location) => !location.hidden);
    }
}
