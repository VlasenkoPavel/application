import { Component } from "./Component";
export interface Class<T = any, P = any> extends Function {
    new (...args: P[]): T;
}
export declare type StringKey<T> = keyof T & string;
export declare type Dependency = Function | object;
export declare type Element<T extends Dependency = Dependency> = Component | (Class<Component> & T);
