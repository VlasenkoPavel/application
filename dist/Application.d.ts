import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './abstract';
interface Dependencies {
    context: ApplicationContext;
    launcher: Launcher;
}
export declare class Application {
    protected context: ApplicationContext;
    protected launcher: Launcher;
    constructor({ context, launcher }: Dependencies);
    init(): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
}
export {};
