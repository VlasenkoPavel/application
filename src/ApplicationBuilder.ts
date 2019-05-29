import { camelCase } from 'lodash';

import { Application } from './Application';
import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './abstract/Launcher';
import { Class } from './types';
import { isClass } from './utils/isClass';
import { getComponentName } from './utils/getComponentName';

export class ApplicationBuilder {

    protected context: ApplicationContext;

    constructor(launcher: Class<Launcher>) {
        this.context = this.createContext(launcher);
    }

    public buildComponent(component: Class | object, name?: string): ApplicationBuilder {
        const aName: string = name || getComponentName(component);
        this.context.add(component, aName);

        return this;
    }

    public create(): Application {
        return new Application(this.context);
    }

    protected createContext(launcher: Class<Launcher>): ApplicationContext {
        return new ApplicationContext(launcher)
    }

}
