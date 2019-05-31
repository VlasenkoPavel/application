import { Application } from './Application';
import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './abstract/Launcher';
import { Class, RequiredComponents } from './types';
import { ICommand, IFactory } from './interfaces';
import { isEmpty, isString } from 'lodash';
import { createContext } from './utils';

export class ApplicationBuilder {

    protected context: ApplicationContext;
    protected commands: Class<ICommand>[];
    protected parameters: Map<string, any> = new Map();

    constructor(launcher: Class<Launcher>) {
        this.context = this.createContext(launcher);
    }

    public async buildConfigs<T extends Object>(
        configClasses: Class[],
        factory: IFactory<T> = this.context['configFactory']
    ): Promise<this> {
        for (const cfgClass of configClasses) {
            const config = await factory.create(cfgClass);
            this.context.add(config);
        }

        return this;
    }

    public buildByFactory<T extends Object>(factory: IFactory<T> | string, argNames: string[], name?: string): this {
        const args = this.getComponents(argNames);
        this.context.add(this.getFactory(factory).create(...args), name);

        return this;
    }

    public buildWithParams(componentClass: Class, argNames: string[], name?: string): this {
        const args = this.getComponents(argNames);
        this.context.add(new componentClass(...args));

        return this;
    }

    public async buildByAsyncFactory<T extends Object>(
        factory: IFactory<Promise<T>> | string,
        argNames: string[],
        name?: string
    ): Promise<this> {
        const args = this.getComponents(argNames);
        const component = await this.getFactory(factory).create(...args);
        this.context.add(component, name);

        return this;
    }

    public buildComponent(component: Class | object, name?: string): ApplicationBuilder {
        this.context.add(component, name);

        return this;
    }

    public buildCommands(commands: Class<ICommand>[]): ApplicationBuilder {
        this.commands = commands;

        return this;
    }

    public setParameter(name: string, value: any) {
        this.parameters.set(name, value);

        return this;
    }

    public create(): Application {
        if (!isEmpty(this.commands)) {
            this.context.add(this.createCommands(), RequiredComponents.commands);
        }

        const app = new Application(this.context as any);

        return app;
    }

    protected getFactory<T>(factory: IFactory<T> | string): IFactory<T> {
        return isString(factory) ? this.context[factory] as IFactory<T> : factory;
    }

    protected getComponents(names: string[]): any[] {
        return names.map(name => this.parameters.get(name) || this.context[name]);
    }

    protected createContext(launcher: Class<Launcher>): ApplicationContext {
        return createContext(ApplicationContext, launcher);
    }

    protected createCommands(): ICommand[] {
        return this.commands.map(command => new command(this.context));
    }

}
