import { Component } from './Component';
import { ApplicationContext } from '..';
export interface LauncherDependencies {
    context: ApplicationContext;
}
export declare abstract class Launcher extends Component {
    abstract start(): void | Promise<void>;
}
