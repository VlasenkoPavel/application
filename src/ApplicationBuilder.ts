import { Application } from './Application';
import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './abstract/Launcher';
import { Class, RequiredComponents, FactoryFunc, CreationOption, StringKey, Extension } from './types';
import { ICommand, IFactory } from './interfaces';
import { isEmpty, isString, isFunction } from 'lodash';
import { createContext } from './utils';
import { Component } from './abstract';

export class ApplicationBuilder {

    protected context: ApplicationContext;
    protected commands: Class<ICommand>[];

    constructor(launcher: Class<Launcher>) {
        this.context = this.createContext(launcher);
    }

    public async buildConfigs<T extends Object>(
        configClasses: Class[],
        factory: IFactory<T> = this.context['configFactory']
    ): Promise<this> {
        for (const cfgClass of configClasses) {
            const config = await factory.create(cfgClass);
            this.context = this.context.addComponent(config);
        }

        return this;
    }

    public addFactory<T>(factory: IFactory<T> | FactoryFunc<T> | string, alias: string, args?: string[]): this {
        this.context = this.context.addFactory(factory, alias, args as any);

        return this;
    }

    public buildComponent<T>(componentClass: Class<T>, option: CreationOption<Extension<T, any>> = {}): this {
        this.context.addClass(componentClass, option);

        return this;
    }

    public async addAsyncFactory<T extends Object>(
        factory: IFactory<Promise<T>> | FactoryFunc<Promise<T>> | string,
        argNames: string[],
        alias?: string
    ): Promise<this> {
        const args = this.getInstances(argNames);
        const component = isFunction(factory) ? await factory(...args) : await this.getFactory(factory).create(...args);
        this.context.addValue(component, alias);

        return this;
    }

    public addComponent<T extends Object>(component: T, alias?: string): ApplicationBuilder {
        this.context.addComponent(component, alias as StringKey<T>);

        return this;
    }

    public buildCommands(commands: Class<ICommand>[]): ApplicationBuilder {
        this.commands = commands;

        return this;
    }

    public setParameter(alias: string, value: any) {
        this.context.addValue(value, alias);

        return this;
    }

    public create(): Application {
        if (!isEmpty(this.commands)) {
            this.context.addValue(this.createCommands(), RequiredComponents.commands);
        }

        const app = new Application(this.context as any);

        return app;
    }

    protected getInstances(names: string[]): Component[] {
        return names.map(name => this.context[name]);
    }

    protected getFactory<T>(factory: IFactory<T> | string): IFactory<T> {
        return isString(factory) ? this.context[factory] as IFactory<T> : factory;
    }

    protected createContext(launcher: Class<Launcher>): ApplicationContext {
        return createContext(ApplicationContext, launcher);
    }

    protected createCommands(): ICommand[] {
        return this.commands.map(command => new command(this.context));
    }

}
