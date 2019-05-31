import { Application } from './Application';
import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './abstract/Launcher';
import { Class } from './types';
import { ICommand, IConfigFactory } from './interfaces';
export declare class ApplicationBuilder {
    protected context: ApplicationContext;
    protected commands: Class<ICommand>[];
    constructor(launcher: Class<Launcher>);
    buildConfigs<T extends Object>(factory: IConfigFactory<T>, configClasses: Class[]): Promise<this>;
    buildComponent(component: Class | object, name?: string): ApplicationBuilder;
    buildCommands(commands: Class<ICommand>[]): ApplicationBuilder;
    create(): Application;
    protected createContext(launcher: Class<Launcher>): ApplicationContext;
    protected createCommands(): ICommand[];
}
