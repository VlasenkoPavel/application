import { Application } from './Application';
import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './abstract/Launcher';
import { Class, RequiredComponents } from './types';
import { ICommand } from './interfaces';

export class ApplicationBuilder {

    protected context: ApplicationContext;

    constructor(launcher: Class<Launcher>) {
        this.context = this.createContext(launcher);
    }

    public buildComponent(component: Class | object, name?: string): ApplicationBuilder {
        this.context.add(component, name);

        return this;
    }

    public buildCommands(classes: Class<ICommand>[]) {
        this.context.add(classes.map(item => new item(this)), RequiredComponents.commands);
    }

    public create(): Application {
        const app = new Application(this as any);
        app.setContext(this.context);

        return app;
    }

    protected createContext(launcher: Class<Launcher>): ApplicationContext {
        return new ApplicationContext(launcher);
    }

}
