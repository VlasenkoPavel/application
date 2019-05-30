import { Application } from './Application';
import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './abstract/Launcher';
import { Class } from './types';
import { ICommand } from './interfaces';
export declare class ApplicationBuilder {
    protected context: ApplicationContext;
    protected commands: Class<ICommand>[];
    constructor(launcher: Class<Launcher>);
    buildComponent(component: Class | object, name?: string): ApplicationBuilder;
    buildCommands(commands: Class<ICommand>[]): ApplicationBuilder;
    create(): Application;
    protected createContext(launcher: Class<Launcher>): ApplicationContext;
    protected createCommands(): ICommand[];
}
