import { mcRoom, terrace } from "@/content/rooms";
import Quest from "@/models/Quest";
import Stage from "@/models/Stage";
import { RegisteredQuests } from "@drincs/nqtr";

export const aliceQuest = new Quest(
    "aliceQuest",
    [
        // stages
        new Stage("talk_alice1", {
            onStart: () => {
                terrace.addCommitment("alice_quest_talk");
            },
            name: "Talk to Alice",
            description: "Talk to Alice on the terrace",
        }),
        new Stage("order_products", {
            onStart: () => {
                mcRoom.addActivity("order_product");
            },
            name: "Order products",
            description: "Order the products with your PC",
        }),
        new Stage("take_products", {
            onStart: (_, { toast }) => {
                terrace.addActivity("take_product");
                toast("You can take the products on the Terrace");
            },
            name: "Take products",
            description: "Take products on the Terrace",
            requestDescriptionToStart: "Wait for the products you ordered to arrive (2 day)",
            deltaDateRequired: 2,
        }),
        new Stage("talk_alice2", {
            name: "Talk to Alice",
            description: "Talk to Alice on the terrace",
        }),
    ],
    {
        // props
        name: "Help Alice",
        description:
            'To learn more about how the repo works, Talk to Alice. \nGoing when she is there will automatically start an "Event" (see aliceQuest.tsx to learn more). \nAfter that an action will be added to open the pc, in MC room. \n\n(during the quest you can talk to Alice and you will see her talking during the quests of the same Quest)',
        image: "alice_terrace0A",
        onStart: (quest, { toast, uiTransition }) => {
            toast(uiTransition("notify_quest_is_started", { quest: quest.name }));
        },
        onContinue: (stage, { toast, uiTransition }) => {
            toast(uiTransition("notify_quest_is_updated", { quest: stage.name }));
        },
    },
);

RegisteredQuests.add(aliceQuest);
