import { Application } from './Application';
import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './Launcher';
import { Class } from './types';
import { Component } from './Component';
import { camelCase } from 'lodash';
import { IConfigFactory } from './IConfigFactory';
import { ILogger } from './ILogger';

export class ApplicationBuilder {

    protected context: ApplicationContext;

    constructor() {
        this.context = this.createContext();
    }

    public buildConfigs(configFactory: Class<IConfigFactory>): ApplicationBuilder {
        const factory = new configFactory(this.context);
        this.context.add(factory.create(), 'config');

        return this;
    }

    public buildComponent(component: Class<Component>, name: string = camelCase(component.name)): ApplicationBuilder {
        this.context.add(component, name);

        return this;
    }

    public addComponent(component: Component, name: string = camelCase(component.constructor.name)): ApplicationBuilder {
        this.context.add(component, name);

        return this;
    }

    public buildLogger(logger: Class<ILogger>): ApplicationBuilder {
        this.context.add(logger, 'logger');

        return this;
    }

    public buildLauncher(launcher: Class<Launcher>): ApplicationBuilder {
        this.context.add(launcher, 'launcher');

        return this;
    }

    public create(): Application {
        return new Application(this.context);
    }

    protected createContext(): ApplicationContext {
        return new ApplicationContext()
    }

}
