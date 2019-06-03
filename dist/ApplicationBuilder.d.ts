import { Application } from './Application';
import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './abstract/Launcher';
import { Class, FactoryFunc, CreationOption } from './types';
import { ICommand, IFactory } from './interfaces';
export declare class ApplicationBuilder {
    protected context: ApplicationContext;
    protected commands: Class<ICommand>[];
    constructor(launcher: Class<Launcher>);
    buildConfigs<T extends Object>(configClasses: Class[], factory?: IFactory<T>): Promise<this>;
    addFactory<T>(factory: IFactory<T> | FactoryFunc<T> | string, alias: string, args?: string[]): this;
    buildComponent<T>(componentClass: Class<T>, option?: CreationOption<T>): this;
    addAsyncFactory<T extends Object>(factory: IFactory<Promise<T>> | FactoryFunc<Promise<T>> | string, argNames: string[], alias?: string): Promise<this>;
    addComponent<T extends Object>(component: T, name?: string): ApplicationBuilder;
    buildCommands(commands: Class<ICommand>[]): ApplicationBuilder;
    setParameter(name: string, value: any): this;
    create(): Application;
    protected getFactory<T>(factory: IFactory<T> | string): IFactory<T>;
    protected getComponents(names: string[]): any[];
    protected createContext(launcher: Class<Launcher>): ApplicationContext;
    protected createCommands(): ICommand[];
}
