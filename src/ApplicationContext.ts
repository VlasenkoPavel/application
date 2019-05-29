import { Dependency, Element, Class, RequiredComponents } from './types';
import { Context } from './abstract/Context';
import { Launcher } from './abstract/Launcher';
import { Component } from './abstract';

export class ApplicationContext<T extends Dependency = Dependency> extends Context<Element<T>> {

    constructor(launcher: Class<Launcher>) {
        super();
        this.add(new launcher(this), RequiredComponents.launcher);
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

    protected getComponents(): any[] {
        return this.getIdentifiers().map(item => (this[item])).filter(component => this.isComponent(component));
    }

    protected isComponent(arg: Element<T>): arg is Component {
        return arg instanceof Component;
    }
}
