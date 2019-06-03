import { Application } from './Application';
import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './abstract/Launcher';
import { Class, FactoryFunc, CreationOption, Extension } from './types';
import { ICommand, IFactory } from './interfaces';
import { Component } from './abstract';
export declare class ApplicationBuilder {
    protected context: ApplicationContext;
    protected commands: Class<ICommand>[];
    constructor(launcher: Class<Launcher>);
    buildConfigs<T extends Object>(configClasses: Class[], factory?: IFactory<T>): Promise<this>;
    addFactory<T>(factory: IFactory<T> | FactoryFunc<T> | string, alias: string, args?: string[]): this;
    buildComponent<T>(componentClass: Class<T>, option?: CreationOption<Extension<T, any>>): this;
    addAsyncFactory<T extends Object>(factory: IFactory<Promise<T>> | FactoryFunc<Promise<T>> | string, argNames: string[], alias?: string): Promise<this>;
    addComponent<T extends Object>(component: T, alias?: string): ApplicationBuilder;
    buildCommands(commands: Class<ICommand>[]): ApplicationBuilder;
    setParameter(alias: string, value: any): this;
    create(): Application;
    protected getInstances(names: string[]): Component[];
    protected getFactory<T>(factory: IFactory<T> | string): IFactory<T>;
    protected createContext(launcher: Class<Launcher>): ApplicationContext;
    protected createCommands(): ICommand[];
}
