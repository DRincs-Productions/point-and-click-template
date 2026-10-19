import { gym, mcHome, school } from "@/content/locations";
import Room from "@/models/Room";
import TimeSlotsImage from "@/models/TimeSlotsImage";
import { navigator, RegisteredRooms } from "@drincs/nqtr";

export const mcRoomBackground = new TimeSlotsImage({
    morning: "location_myroom-0",
    afternoon: "location_myroom-1",
    evening: "location_myroom-2",
    night: "location_myroom-3",
});
export const mcRoom = new Room("mc_room", mcHome, {
    name: "MC room",
    background: mcRoomBackground,
    activities: ["bed"],
});

export const aliceRoom = new Room("alice_room", mcHome, {
    name: "Alice room",
    background: new TimeSlotsImage({
        morning: "location_aliceroom-0",
        afternoon: "location_aliceroom-1",
        evening: "location_aliceroom-2",
        night: "location_aliceroom-3",
    }),
    routine: ["alice_sleep"],
});

export const annRoom = new Room("ann_room", mcHome, {
    name: "Ann room",
    background: new TimeSlotsImage({
        morning: "location_annroom-0",
        afternoon: "location_annroom-1",
        evening: "location_annroom-2",
        night: "location_annroom-3",
    }),
});

export const bathroom = new Room("bathroom", mcHome, {
    name: "Bathroom",
    background: "location_bathroom",
});

export const lounge = new Room("lounge", mcHome, {
    name: "Lounge",
    background: new TimeSlotsImage({
        morning: "location_lounge-0",
        afternoon: "location_lounge-1",
        evening: "location_lounge-2",
        night: "location_lounge-3",
    }),
});

export const terrace = new Room("terrace", mcHome, {
    name: "Terrace",
    isEntrance: true,
    background: new TimeSlotsImage({
        morning: "location_terrace-0",
        afternoon: "location_terrace-1",
        evening: "location_terrace-2",
        night: "location_terrace-3",
    }),
    routine: ["alice_smokes"],
});

export const gymRoom = new Room("gym_room", gym, {
    name: "Gym",
    background: "location_gym",
});

export const classRoom = new Room("class_room", school, {
    name: "School",
    routine: ["alice_go_school"],
});

RegisteredRooms.add(mcRoom, aliceRoom, annRoom, bathroom, lounge, terrace, gymRoom, classRoom);

// default room to prevent errors when accessing navigator.currentRoom before any room is loaded.
navigator.currentRoom = mcRoom;
