import { Application } from './Application';
import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './abstract/Launcher';
import { Class } from './types';
export declare class ApplicationBuilder {
    protected context: ApplicationContext;
    constructor(launcher: Class<Launcher> | Launcher);
    buildComponent(component: Class | object, name?: string): ApplicationBuilder;
    create(): Application;
    protected createContext(launcher: Class<Launcher> | Launcher): ApplicationContext;
}
