import { isFunction } from 'lodash';

import { Dependency, Element, Class, RequiredComponents } from './types';
import { Context } from './Context';
import { Launcher } from './abstract/Launcher';
import { Component } from './abstract/Component';
import { isComponent } from './utils';

export class ApplicationContext<T extends Dependency = Dependency> extends Context {

    constructor(launcher: Class<Launcher> | Launcher) {
        super();
        const alias = RequiredComponents.launcher;
        isFunction(launcher) ? this.add(launcher as Class<Launcher>, alias) : this.addValue(launcher, alias);
    }

    get components () {
        const components: Map<string, Component> = new Map();

        this.getIdentifiers()
            .forEach(id => {
                const instance = this[id];

                if (isComponent(instance)) {
                    components.set(id, instance);
                }
            });

        return components;
    }

}
