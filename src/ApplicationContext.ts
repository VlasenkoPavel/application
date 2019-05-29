import { Component } from './Component';
import { Dependency, Element } from './types';
import { Context } from './Context';

export class ApplicationContext<T extends Dependency = Dependency> extends Context<Element<T>> {

    public async init(): Promise<void> {
        await Promise.all(
            this.getComponents().map(component => component.init())
        );
    }

    public async dispose(): Promise<void> {
        await Promise.all(
            this.getComponents().map(component => component.dispose())
        );
    }

    protected getComponents() {
        return this.getIdentifiers().map(item => (this[item])).filter(component => this.isComponent(component));
    }

    protected isComponent(arg: Element<T>): arg is Component {
        return arg instanceof Component;
    }
}
