import { Application } from './Application';
import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './Launcher';
import { Class } from './types';
import { Component } from './Component';
export declare class ApplicationBuilder {
    protected context: ApplicationContext;
    constructor(launcher: Class<Launcher> | Launcher);
    buildComponent(component: Class<Component>, name?: string): ApplicationBuilder;
    addComponent(component: Component, name?: string): ApplicationBuilder;
    create(): Application;
    protected createContext(launcher: Class<Launcher> | Launcher): ApplicationContext;
}
