import { Context } from './Context';
import { Component } from './abstract/Component';

export interface Class<T = any, P = any> extends Function {
    new (...args: P[]): T;
}

export type StringKey<T> =  keyof T & string;

export type Dependency = Function | object;

export type Element<T extends Dependency = Dependency> = Component | Class<Component> | T;

export type LoadedContext<T> = Context & { [key: string]: any };

export const enum RequiredComponents {
    launcher = 'launcher',
    commands = 'commands'
}
