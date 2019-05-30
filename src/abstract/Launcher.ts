import { Component } from './Component';
import { ApplicationContext } from '..';

export interface LauncherDependencies {
    context: ApplicationContext;
}

export abstract class Launcher extends Component {
    public abstract start(): void | Promise<void>;
}
