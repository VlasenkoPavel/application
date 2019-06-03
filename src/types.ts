import { Context } from './Context';
import { Component } from './abstract/Component';

export interface Class<T = any, P = any> extends Function {
    new (...args: P[]): T;
}

export type Optional<T> = T | undefined;

export type StringKey<T> =  keyof T & string;

export type Dependency = Function | object;

export type Element<T extends Dependency = Dependency> = Component | Class<Component> | T;

export type LoadedContext<T> = Context & { [key: string]: any };

export const enum RequiredComponents {
    launcher = 'launcher',
    commands = 'commands'
}

export type FactoryFunc<T> = (...args: any[]) => T;

export interface CreationOption<T extends Object, C extends Object = any> {
    alias?: StringKey<T>;
    args?: (keyof C)[];
}

export type Keys<T> = (keyof T)[];
