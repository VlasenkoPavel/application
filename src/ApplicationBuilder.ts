import { Application } from './Application';
import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './abstract/Launcher';
import { Class, RequiredComponents } from './types';
import { ICommand } from './interfaces';
import { isEmpty } from 'lodash';

export class ApplicationBuilder {

    protected context: ApplicationContext;
    protected commands: Class<ICommand>[];

    constructor(launcher: Class<Launcher>) {
        this.context = this.createContext(launcher);
    }

    public buildComponent(component: Class | object, name?: string): ApplicationBuilder {
        this.context.add(component, name);

        return this;
    }

    public buildCommands(commands: Class<ICommand>[]): ApplicationBuilder {
        this.commands = commands;

        return this;
    }

    public create(): Application {

        if (!isEmpty(this.commands)) {
            this.context.add(this.createCommands(), RequiredComponents.commands);
        }

        const app = new Application(this.context as any);

        return app;
    }

    protected createContext(launcher: Class<Launcher>): ApplicationContext {
        return new ApplicationContext();
    }

    protected createCommands(): ICommand[] {
        return this.commands.map(command => new command(this.context));
    }

}
