import { Component } from './Component';
import { ApplicationContext } from '..';

export interface LauncherDependencies {
    context: ApplicationContext;
}

export abstract class Launcher extends Component {

    protected context: ApplicationContext;

    constructor({ context }: LauncherDependencies) {
        super();
        this.context = context;
    }

    public setContext(context: ApplicationContext): void {
        this.context = context;
    }

    public start(): void {
        throw new Error(`${this.constructor.name}.start is undefined`);
    }

    protected onExit(): void {
        this.context.dispose();
    }

}
