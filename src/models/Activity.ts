import type { PixiUIParam, PixiUIProp, ReactUIParam, ReactUIProp } from "@/models/ui-elements";
import {
    type ActiveScheduling,
    type ActivityInterface,
    ActivityStoredClass,
    type ActivityStoredClassProps,
    type OnRunAsyncFunction,
    type OnRunEvent,
    type OnRunProps,
} from "@drincs/nqtr";

export default class Activity extends ActivityStoredClass implements ActivityInterface {
    constructor(
        id: string,
        onRun: OnRunEvent<ActivityInterface>,
        props: {
            name: string;
            sprite?: PixiUIParam<Activity>;
            icon?: ReactUIParam<Activity>;
            disabled?: boolean | (() => boolean);
            hidden?: boolean | (() => boolean);
        } & ActivityStoredClassProps,
    ) {
        super(id, onRun, props);
        this.name = props.name || "";
        this._sprite = props.sprite;
        this._icon = props.icon;
        this._defaultDisabled = props.disabled || false;
        this._defaultHidden = props.hidden || false;
    }
    readonly name: string;
    private readonly _sprite?: PixiUIParam<Activity>;
    get sprite(): PixiUIProp | undefined {
        const sprite = this._sprite;
        if (typeof sprite === "function") {
            return (runProps: OnRunProps) => sprite(this, runProps);
        }
        return sprite;
    }
    private readonly _icon?: ReactUIParam<Activity>;
    get icon(): ReactUIProp | undefined {
        const icon = this._icon;
        if (typeof icon === "function") {
            return (runProps: OnRunProps) => icon(this, runProps);
        }
        return icon;
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
    override isActive(options?: ActiveScheduling): boolean {
        if (this.hidden) {
            return false;
        }
        return super.isActive(options);
    }
    override get run(): OnRunAsyncFunction {
        return async (runProps: OnRunProps) => {
            const res = await super.run(runProps);
            await runProps.invalidateInterfaceData();
            return res;
        };
    }
}
