import { isFunction } from 'lodash';

import { Dependency, Element, Class, RequiredComponents } from './types';
import { Context } from './Context';
import { Launcher } from './abstract/Launcher';
import { Component } from './abstract/Component';

export class ApplicationContext<T extends Dependency = Dependency> extends Context {

    constructor(launcher: Class<Launcher> | Launcher) {
        super();
        const alias = RequiredComponents.launcher;
        isFunction(launcher) ? this.add(launcher as Class<Launcher>, alias) : this.addValue(launcher, alias);
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
