import { Class, StringKey, LoadedContext } from './types';
import { isClass } from './utils';

export class Context<T extends Object = Object> {

    protected identifiers: Set<string> = new Set();
    protected cache: Map<string, T> = new Map();

    public add<P extends Object>(TClass: Class<T> | T, name: StringKey<P> , configurable = true): this & P {
        Object.defineProperty(this, name, {
            get: this.createGetter(TClass, name),
            enumerable: true,
            configurable
        });

        this.identifiers.add(name);

        return this as this & P;
    }

    public with<T extends Object>(obj: T): this & T {
        const extendedCtx = Object.create(this);
        Object.assign(extendedCtx, obj);

        return extendedCtx;
    }

    public loadToCache<T>(otherContext: Context<T>): void {
        const identifiers = otherContext.getIdentifiers();
        identifiers.forEach(name => { this.cache.set(name, otherContext[name]) });
    }

    public clearCache(): void {
        this.cache = new Map();
    }

    public load<T>(otherContext: LoadedContext<T>): this & LoadedContext<T>  {
        const identifiers = otherContext.getIdentifiers();
        identifiers.forEach(name => { this[name] = otherContext[name] });

        return this
    }

    protected getIdentifiers(): string[] {
        return [...this.identifiers];
    }

    protected createGetter(component: Class<T> | T, name: string): () => T {
        return () => {
            let instance = this.cache.get(name);

            if (!instance) {
                instance = isClass(component) ? new component(this) : component;
                this.cache.set(name, instance);
            }

            return instance;
        }
    }

}
