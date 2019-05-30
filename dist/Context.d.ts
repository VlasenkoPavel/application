import { Class, StringKey, LoadedContext } from './types';
export declare class Context {
    protected identifiers: Set<string>;
    protected cache: Map<string, any>;
    add<P extends Object, T extends Object>(component: Class<T> | T, name?: StringKey<P>): this & P;
    with<T extends Object>(obj: T): this & T;
    loadToCache<T>(otherContext: Context): void;
    clearCache(): void;
    load<T>(otherContext: LoadedContext<T>): this & LoadedContext<T>;
    protected getIdentifiers(): string[];
    protected createGetter<T>(component: Class<T> | T, name: string): () => T;
}
