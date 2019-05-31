import { Application } from './Application';
import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './abstract/Launcher';
import { Class } from './types';
import { ICommand, IFactory } from './interfaces';
export declare class ApplicationBuilder {
    protected context: ApplicationContext;
    protected commands: Class<ICommand>[];
    protected configs: Class[];
    constructor(launcher: Class<Launcher>);
    buildConfigs<T extends Object>(configClasses: Class[], factory: IFactory<T>): this;
    buildByFactory<T extends Object>(factory: IFactory<T> | string, argNames: string[], name?: string): this;
    buildWithParams(componentClass: Class, argNames: string[], name?: string): this;
    buildByAsyncFactory<T extends Object>(factory: IFactory<Promise<T>> | string, argNames: string[], name?: string): Promise<this>;
    buildComponent(component: Class | object, name?: string): ApplicationBuilder;
    buildCommands(commands: Class<ICommand>[]): ApplicationBuilder;
    create(): Application;
    protected createConfigs(): Promise<this>;
    protected getFactory<T>(factory: IFactory<T> | string): IFactory<T>;
    protected getComponents(names: string[]): any[];
    protected createContext(launcher: Class<Launcher>): ApplicationContext;
    protected createCommands(): ICommand[];
}
