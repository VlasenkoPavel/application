import { Component } from './Component';
import { Class } from './types';
import { Context } from './Context';

export class ApplicationContext extends Context<Component> {
    public async init(): Promise<void> {
        await Promise.all(
            this.getIdentifiers().map(item => (this[item] as Component).init(this))
        );
    }

    public async dispose(): Promise<void> {
        await Promise.all(
            this.getIdentifiers().map(item => (this[item] as Component).dispose())
        );
    }
}
