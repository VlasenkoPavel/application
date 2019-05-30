import { Application } from './Application';
import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './abstract/Launcher';
import { Class } from './types';
import { ICommand } from './interfaces';
export declare class ApplicationBuilder {
    protected context: ApplicationContext;
    constructor(launcher: Class<Launcher>);
    buildComponent(component: Class | object, name?: string): ApplicationBuilder;
    buildCommands(classes: Class<ICommand>[]): void;
    create(): Application;
    protected createContext(launcher: Class<Launcher>): ApplicationContext;
}
