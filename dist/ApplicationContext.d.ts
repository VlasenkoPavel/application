import { Component } from './Component';
import { Dependency, Element } from './types';
import { Context } from './Context';
export declare class ApplicationContext<T extends Dependency = Dependency> extends Context<Element<T>> {
    init(): Promise<void>;
    dispose(): Promise<void>;
    protected getComponents(): any[];
    protected isComponent(arg: Element<T>): arg is Component;
}
