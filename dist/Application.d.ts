import { Launcher, Component } from './abstract';
interface Dependencies {
    components: Map<string, Component>;
    launcher: Launcher;
}
export declare class Application {
    protected components: Map<string, Component>;
    protected launcher: Launcher;
    constructor({ components, launcher }: Dependencies);
    init(): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
}
export {};
