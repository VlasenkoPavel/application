import { Class, StringKey } from './types';
export declare class Context<T extends Object = Object> {
    protected identifiers: Set<string>;
    protected cache: Map<string, T>;
    add<P extends Object>(TClass: Class<T> | T, name: StringKey<P>, configurable?: boolean): this & P;
    with<T extends Object>(obj: T): this & T;
    getIdentifiers(): string[];
    protected createGetter(T: Class<T> | T, name: string): () => T;
    protected isClass(T: Class<T> | Object): T is Class<T>;
}
