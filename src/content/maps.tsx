import MapClass from "@/models/Map";
import TimeSlotsImage from "@/models/TimeSlotsImage";
import { RegisteredMaps } from "@drincs/nqtr";

export const mainMap = new MapClass("main_map", {
    name: "Main Map",
    background: new TimeSlotsImage({
        morning: "map-0",
        afternoon: "map-1",
        evening: "map-2",
        night: "map-3",
    }),
    neighboringMaps: {
        north: "nightcity_map",
    },
});

export const nightcityMap = new MapClass("nightcity_map", {
    name: "Nightcity",
    background: "map-nightcity",
    neighboringMaps: {
        south: "main_map",
    },
});

RegisteredMaps.add(mainMap, nightcityMap);
