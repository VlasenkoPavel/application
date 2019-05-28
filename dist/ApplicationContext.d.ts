import { ConfigFactory } from './ConfigFactory';
import { Connector } from './Connector';
import { Logger } from './Logger';
import { Launcher } from './Launcher';
import { Component } from './Component';
export declare class ApplicationContext {
    protected items: Map<Function, Component>;
    connector: Connector;
    logger: Logger;
    launcher: Launcher;
    readonly configs: any;
    configFactory: ConfigFactory;
    init(): Promise<void>;
    dispose(): Promise<void>;
    protected get(key: Function): Component;
    protected set(key: Function, value: Component): void;
    protected getComponents(): Component[];
}
