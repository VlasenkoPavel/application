import { Component } from './Component';
import { Context } from './Context';
export declare class ApplicationContext extends Context<Component> {
    init(): Promise<void>;
    dispose(): Promise<void>;
}
