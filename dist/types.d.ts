import { Context } from './Context';
import { Component } from './abstract/Component';
export interface Class<T = any, P = any> extends Function {
    new (...args: P[]): T;
}
export declare type Optional<T> = T | undefined;
export declare type StringKey<T> = keyof T & string;
export declare type Dependency = Function | object;
export declare type Element<T extends Dependency = Dependency> = Component | Class<Component> | T;
export declare type LoadedContext<T> = Context & {
    [key: string]: any;
};
export declare const enum RequiredComponents {
    launcher = "launcher",
    commands = "commands"
}
