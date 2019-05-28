import * as lodash from 'lodash';

import { ConfigFactory } from './ConfigFactory';
import { Connector } from './Connector';
import { Logger } from './Logger';
import { Launcher } from './Launcher';
import { Component } from './Component';

export class ApplicationContext {

    protected items: Map<Function, Component> = new Map();

    public get connector(): Connector {
        return <Connector>this.get(Connector);
    }

    public set connector(value: Connector) {
        this.set(Connector, value);
    }

    public get logger(): Logger {
        return <Logger>this.get(Logger);
    }

    public set logger(value: Logger) {
        this.set(Logger, value);
    }

    public get launcher(): Launcher {
        return <Launcher>this.get(Launcher);
    }

    public set launcher(value: Launcher) {
        this.set(Launcher, value);
    }

    public get configs() {
        const factory = <ConfigFactory>this.get(ConfigFactory);
        return factory.create();
    }

    public get configFactory(): ConfigFactory {
        return <ConfigFactory>this.get(ConfigFactory);
    }

    public set configFactory(value: ConfigFactory) {
        this.set(ConfigFactory, value);
    }

    public async init(): Promise<void> {
        if (this.configFactory) {
            await this.configFactory.init();
        }

        const items = lodash.difference(this.getComponents(), [this.configFactory]);

        await Promise.all(
            items.map(item => item.init())
        );
    }

    public async dispose(): Promise<void> {
        const items = this.getComponents();

        await Promise.all(
            items.map(item => item.dispose())
        );
    }

    protected get(key: Function): Component {
        return this.items.get(key);
    }

    protected set(key: Function, value: Component): void {
        value.setContext(this);
        this.items.set(key, value);
    }

    protected getComponents(): Component[] {
        return [...this.items.values()];
    }

}
