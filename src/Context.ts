import { Class, StringKey, LoadedContext } from './types';
import { isClass } from './utils/isClass';
import { getComponentName } from './utils/getComponentName';

export class Context {
    protected identifiers: Set<string> = new Set();
    protected cache: Map<string, any> = new Map();

    get context() {
        return this;
    }

    public add<P extends Object, T extends Object>(
        component: Class<T> | T,
        name: StringKey<P> = getComponentName(component) as StringKey<P>
    ): this & P {
        Object.defineProperty(this, name, {
            get: this.createGetter(component, name),
            enumerable: true,
            configurable: true
        });

        this.identifiers.add(name);

        return this as this & P;
    }

    public with<T extends Object>(obj: T): this & T {
        const extendedCtx = Object.create(this);
        Object.assign(extendedCtx, obj);

        return extendedCtx;
    }

    public loadToCache<T>(otherContext: Context): void {
        const identifiers = otherContext.getIdentifiers();
        identifiers.forEach(name => this.cache.set(name, otherContext[name]));
    }

    public clearCache(): void {
        this.cache = new Map();
    }

    public load<T>(otherContext: LoadedContext<T>): this & LoadedContext<T>  {
        const identifiers = otherContext.getIdentifiers();
        identifiers.forEach(name => this[name] = otherContext[name]);

        return this;
    }

    protected getIdentifiers(): string[] {
        return [...this.identifiers];
    }

    protected createGetter<T>(component: Class<T> | T, name: string): () => T {
        return () => {
            let instance = this.cache.get(name);

            if (!instance) {
                instance = isClass(component) ? new component(this) : component;
                this.cache.set(name, instance);
            }

            return instance;
        };
    }

}
