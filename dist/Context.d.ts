import { Class, StringKey, LoadedContext } from './types';
export declare class Context<T extends Object = Object> {
    readonly context: this;
    protected identifiers: Set<string>;
    protected cache: Map<string, T>;
    add<P extends Object>(component: Class<T> | T, name?: StringKey<P>): this & P;
    with<T extends Object>(obj: T): this & T;
    loadToCache<T>(otherContext: Context<T>): void;
    clearCache(): void;
    load<T>(otherContext: LoadedContext<T>): this & LoadedContext<T>;
    protected getIdentifiers(): string[];
    protected createGetter(component: Class<T> | T, name: string): () => T;
}
