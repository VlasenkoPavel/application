import { Class, StringKey, LoadedContext } from './types';
export declare class Context<T extends Object = Object> {
    protected identifiers: Set<string>;
    protected cache: Map<string, T>;
    add<P extends Object>(TClass: Class<T> | T, name: StringKey<P>, configurable?: boolean): this & P;
    with<T extends Object>(obj: T): this & T;
    loadToCache<T>(otherContext: Context<T>): void;
    clearCache(): void;
    load<T>(otherContext: LoadedContext<T>): this & LoadedContext<T>;
    protected getIdentifiers(): string[];
    protected createGetter(T: Class<T> | T, name: string): () => T;
}
