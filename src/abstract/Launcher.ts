import { Component } from './Component';
import { ApplicationContext } from '..';

export interface LauncherDependencies {
    context: ApplicationContext;
}

export abstract class Launcher extends Component {

    protected context: ApplicationContext;

    public setContext(context: ApplicationContext) {
        this.context = context;
    }

    public abstract start(): void | Promise<void>;

    public async stop(): Promise<void> {
        await this.context.dispose();
    }

}
