import { Application } from './Application';
import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './Launcher';
import { Class } from './types';
import { Component } from './Component';
import { IConfigFactory } from './IConfigFactory';
import { ILogger } from './ILogger';
export declare class ApplicationBuilder {
    protected context: ApplicationContext;
    constructor();
    buildConfigs(configFactory: Class<IConfigFactory>): ApplicationBuilder;
    buildComponent(component: Class<Component>, name?: string): ApplicationBuilder;
    addComponent(component: Component, name?: string): ApplicationBuilder;
    buildLogger(logger: Class<ILogger>): ApplicationBuilder;
    buildLauncher(launcher: Class<Launcher>): ApplicationBuilder;
    create(): Application;
    protected createContext(): ApplicationContext;
}
