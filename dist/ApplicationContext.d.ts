import { Dependency, Element, Class } from './types';
import { Context } from './Context';
import { Launcher } from './abstract/Launcher';
import { Component } from './abstract/Component';
export declare class ApplicationContext<T extends Dependency = Dependency> extends Context {
    constructor(launcher: Class<Launcher> | Launcher);
    init(): Promise<void>;
    dispose(): Promise<void>;
    protected getComponents(): any[];
    protected isComponent(arg: Element<T>): arg is Component;
}
