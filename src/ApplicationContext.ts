import { Component } from './Component';
import { Dependency, Element, Class, RequiredComponents } from './types';
import { Context } from './Context';
import { Launcher } from './Launcher';

export class ApplicationContext<T extends Dependency = Dependency> extends Context<Element<T>> {

    constructor(launcher: Class<Launcher> | Launcher) {
        super();
        this.add(launcher, RequiredComponents.launcher);
    }

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
