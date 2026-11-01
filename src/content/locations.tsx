import { mainMap } from "@/content/maps";
import Location from "@/models/Location";
import { navigator, RegisteredLocations } from "@drincs/nqtr";
import { Assets, Sprite, type Texture } from "@drincs/pixi-vn/pixi.js";

export const mcHome = new Location("mc_home", mainMap, {
    name: "MC Home",
    sprite: async (location, { navigate }) => {
        const texture = await Assets.load<Texture>("icon_location_home");
        const icon = new Sprite({
            texture,
            x: 300,
            y: 200,
            height: 120,
            width: 120,
            eventMode: "static",
            cursor: "pointer",
        });
        icon.on("pointerdown", () => {
            const entrance = location.entrance;
            if (entrance) {
                navigator.currentRoom = entrance;
                navigate({ to: "/game/navigation" });
            }
        });
        return icon;
    },
});

export const gym = new Location("gym", mainMap, {
    name: "Gym",
    sprite: async (location, { navigate }) => {
        const texture = await Assets.load<Texture>("icon_location_gym");
        const icon = new Sprite({
            texture,
            x: 500,
            y: 300,
            height: 120,
            width: 120,
            eventMode: "static",
            cursor: "pointer",
        });
        icon.on("pointerdown", () => {
            const entrance = location.entrance;
            if (entrance) {
                navigator.currentRoom = entrance;
                navigate({ to: "/game/navigation" });
            }
        });
        return icon;
    },
});

export const school = new Location("school", mainMap, {
    name: "School",
    sprite: () => new Sprite(),
});

RegisteredLocations.add(mcHome, gym, school);
