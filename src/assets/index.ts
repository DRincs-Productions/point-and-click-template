import generatedManifestJson from "@/assets/manifest.gen.json";
import { mainMap, nightcityMap } from "@/content/maps";
import { aliceRoom, annRoom, bathroom, gymRoom, lounge, mcRoom, terrace } from "@/content/rooms";
import type { AssetsManifest } from "@drincs/pixi-vn";

/**
 * Manifest for the assets used in the game.
 * You can read more about the manifest here: https://pixijs.com/8.x/guides/components/assets#loading-multiple-assets
 */
export const manifest: AssetsManifest = {
    bundles: [
        ...generatedManifestJson.bundles,
        // labels
        // characters
        // map
        {
            name: mainMap.id,
            assets: [
                {
                    alias: "map-0",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/refs/heads/main/game/images/location/map-0.webp",
                },
                {
                    alias: "map-1",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/refs/heads/main/game/images/location/map-1.webp",
                },
                {
                    alias: "map-2",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/refs/heads/main/game/images/location/map-2.webp",
                },
                {
                    alias: "map-3",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/refs/heads/main/game/images/location/map-3.webp",
                },
                {
                    alias: "icon_location_home",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/refs/heads/main/game/nqtr_interface/home-00.webp",
                },
                {
                    alias: "icon_location_gym",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/refs/heads/main/game/nqtr_interface/gym.webp",
                },
            ],
        },
        {
            name: nightcityMap.id,
            assets: [
                {
                    alias: "map-nightcity",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/refs/heads/main/game/images/location/nightcity.webp",
                },
            ],
        },
        // rooms
        {
            name: mcRoom.id,
            assets: [
                {
                    alias: "location_myroom-0",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/myroom-0.webp",
                },
                {
                    alias: "location_myroom-1",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/myroom-1.webp",
                },
                {
                    alias: "location_myroom-2",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/myroom-2.webp",
                },
                {
                    alias: "location_myroom-3",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/myroom-3.webp",
                },
            ],
        },
        {
            name: aliceRoom.id,
            assets: [
                {
                    alias: "location_aliceroom-0",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/aliceroom-0.webp",
                },
                {
                    alias: "location_aliceroom-1",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/aliceroom-1.webp",
                },
                {
                    alias: "location_aliceroom-2",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/aliceroom-2.webp",
                },
                {
                    alias: "location_aliceroom-3",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/aliceroom-3.webp",
                },
            ],
        },
        {
            name: annRoom.id,
            assets: [
                {
                    alias: "location_annroom-0",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/annroom-0.webp",
                },
                {
                    alias: "location_annroom-1",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/annroom-1.webp",
                },
                {
                    alias: "location_annroom-2",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/annroom-2.webp",
                },
                {
                    alias: "location_annroom-3",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/annroom-3.webp",
                },
            ],
        },
        {
            name: bathroom.id,
            assets: [
                {
                    alias: "location_bathroom",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/bathroom.webp",
                },
            ],
        },
        {
            name: lounge.id,
            assets: [
                {
                    alias: "location_lounge-0",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/lounge-0.webp",
                },
                {
                    alias: "location_lounge-1",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/lounge-1.webp",
                },
                {
                    alias: "location_lounge-2",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/lounge-2.webp",
                },
                {
                    alias: "location_lounge-3",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/lounge-3.webp",
                },
            ],
        },
        {
            name: terrace.id,
            assets: [
                {
                    alias: "location_terrace-0",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/terrace-0.webp",
                },
                {
                    alias: "location_terrace-1",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/terrace-1.webp",
                },
                {
                    alias: "location_terrace-2",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/terrace-2.webp",
                },
                {
                    alias: "location_terrace-3",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/terrace-3.webp",
                },
            ],
        },
        {
            name: gymRoom.id,
            assets: [
                {
                    alias: "location_gym",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/gym.webp",
                },
            ],
        },
        // alice
        {
            name: "alice",
            assets: [
                {
                    alias: "alice_terrace0A",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/Alice/terrace0A.webp",
                },
                {
                    alias: "alice_terrace0At",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/Alice/terrace0At.webp",
                },
                {
                    alias: "alice_roomsleep0A",
                    src: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/Alice/roomsleep0A.webp",
                },
            ],
        },
    ],
};
