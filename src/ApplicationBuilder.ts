import { Application } from './Application';
import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './abstract/Launcher';
import { Class } from './types';

export class ApplicationBuilder {

    protected context: ApplicationContext;

    constructor(launcher: Class<Launcher>) {
        this.context = this.createContext(launcher);
    }

    public buildComponent(component: Class | object, name?: string): ApplicationBuilder {
        this.context.add(component, name);

        return this;
    }

    public create(): Application {
        return new Application(this.context);
    }

    protected createContext(launcher: Class<Launcher>): ApplicationContext {
        return new ApplicationContext(launcher)
    }

}
