import { Dependency, Class } from './types';
import { Context } from './Context';
import { Launcher } from './abstract/Launcher';
import { Component } from './abstract/Component';
export declare class ApplicationContext<T extends Dependency = Dependency> extends Context {
    constructor(launcher: Class<Launcher> | Launcher);
    readonly components: Map<string, Component>;
}
