import { Class, StringKey, LoadedContext } from './types';
export declare class Context {
    protected identifiers: Set<string>;
    protected cache: Map<string, any>;
    readonly context: this;
    add<P extends Object, T extends Object>(component: Class<T> | T, name?: StringKey<P>): this & P;
    addConstruct<T extends Object, P extends Object>(componentClass: Class<T>, argNames: string[], name?: StringKey<P>): this & P;
    setAlias(componentName: string, alias: string): void;
    with<T extends Object>(obj: T): this & T;
    loadToCache<T>(otherContext: Context): void;
    clearCache(): void;
    load<T>(otherContext: LoadedContext<T>): this & LoadedContext<T>;
    protected getIdentifiers(): string[];
    protected createGetter<T>(component: Class<T> | T, name: string): () => T;
}
