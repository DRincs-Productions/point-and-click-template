import { useNqtrFunctions } from "@/lib/hooks/nqtr-hooks";
import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useGameProps } from "@/lib/hooks/props-hooks";
import { useQueryActivity, useQueryCommitment } from "@/lib/query/activity-query";
import { cn } from "@/lib/utils";
import type TimeSlotsImage from "@/models/TimeSlotsImage";
import type { OnRunProps } from "@drincs/nqtr";
import type { CharacterInterface } from "@drincs/pixi-vn";
import { isValidElement, type ComponentProps, type ReactElement } from "react";

export function ActivityButton({ id }: { id: string }) {
    const { runActivity } = useNqtrFunctions();
    const gameProps = useGameProps();
    const { uiTransition: t } = gameProps;
    const { data: activity } = useQueryActivity(id);

    if (!activity) return null;

    return (
        <ActivityBaseButton
            disabled={activity.disabled}
            onClick={() => runActivity(id)}
            ariaLabel={t(activity.name)}
            image={activity.icon}
        />
    );
}

export function CommitmentButton({ id }: { id: string }) {
    const { runCommitment } = useNqtrFunctions();
    const gameProps = useGameProps();
    const { uiTransition: t } = gameProps;
    const { data: commitment } = useQueryCommitment(id);

    if (!commitment) return null;

    return (
        <ActivityBaseButton
            disabled={commitment.disabled}
            onClick={() => runCommitment(id)}
            ariaLabel={t(commitment.name)}
            image={commitment.icon}
            characters={commitment.characters}
        />
    );
}

export function ActivityBaseButton({
    ariaLabel,
    image: imageProp,
    characters,
    className,
    disabled,
    children,
    ...rest
}: ComponentProps<typeof Button> & {
    ariaLabel: string;
    image?: string | TimeSlotsImage | ReactElement | ((props: OnRunProps) => ReactElement);
    characters?: CharacterInterface[];
}) {
    const gameProps = useGameProps();

    let image = imageProp;
    if (typeof image === "function") {
        image = image(gameProps);
    }

    if (isValidElement(image)) {
        return image;
    }

    const trigger = (
        <Button
            {...rest}
            role="menuitem"
            disabled={disabled}
            size="icon-lg"
            variant={"secondary"}
            className={cn(
                "relative size-10 overflow-hidden rounded-lg shadow-lg sm:size-14 md:size-20",
                className,
            )}
        >
            {image && (
                <Image
                    src={image}
                    alt={ariaLabel}
                    layout="constrained"
                    width={128}
                    height={128}
                    className="absolute inset-0 size-full object-cover"
                />
            )}
            {children}

            {characters && (
                <AvatarGroup className="absolute right-0 bottom-0">
                    {characters.length <= 3 &&
                        characters.map((character) => (
                            <Avatar key={character.id} size="sm">
                                <AvatarImage src={character.icon} alt={character.name} />
                                <AvatarFallback>{character.name.slice(0, 1)}</AvatarFallback>
                            </Avatar>
                        ))}
                    {characters.length > 3 && (
                        <>
                            {characters.slice(0, 2).map((character) => (
                                <Avatar key={character.id} size="sm">
                                    <AvatarImage src={character.icon} alt={character.name} />
                                    <AvatarFallback>{character.name.slice(0, 1)}</AvatarFallback>
                                </Avatar>
                            ))}
                            <AvatarGroupCount className="size-6 bg-black/50 text-white">
                                +{characters.length - 2}
                            </AvatarGroupCount>
                        </>
                    )}
                </AvatarGroup>
            )}
        </Button>
    );

    return (
        <Tooltip>
            <TooltipTrigger render={<span />}>{trigger}</TooltipTrigger>
            <TooltipContent>{ariaLabel}</TooltipContent>
        </Tooltip>
    );
}
