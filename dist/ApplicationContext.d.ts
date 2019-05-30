import { Dependency, Element } from './types';
import { Context } from './Context';
import { Component } from './abstract/Component';
export declare class ApplicationContext<T extends Dependency = Dependency> extends Context {
    init(): Promise<void>;
    dispose(): Promise<void>;
    protected getComponents(): any[];
    protected isComponent(arg: Element<T>): arg is Component;
}
