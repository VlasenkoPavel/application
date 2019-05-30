import { Component } from './Component';
import { ApplicationContext } from '..';
export interface LauncherDependencies {
    context: ApplicationContext;
}
export declare abstract class Launcher extends Component {
    protected context: ApplicationContext;
    setContext(context: ApplicationContext): void;
    abstract start(): void | Promise<void>;
    stop(): Promise<void>;
}
