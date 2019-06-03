import { Class, StringKey, LoadedContext, CreationOption, Keys } from './types';
import { IFactory } from './interfaces';
export declare class Context {
    protected identifiers: Set<string>;
    protected cache: Map<string, any>;
    readonly context: this;
    add<T extends Object, P extends Object>(component: Class<T>, alias: StringKey<P>): this & {
        [key in keyof P]: T;
    };
    addComponent<T extends Object, P extends Object>(component: T, alias?: StringKey<P>): this & {
        [key in keyof P]: T;
    };
    addClass<T extends Object, P extends Object>(component: Class<T>, { alias, args }?: CreationOption<P, this>): this & {
        [key in keyof P]: T;
    };
    addValue<T, P extends Object>(component: any, alias: StringKey<P>): this & {
        [key in keyof P]: T;
    };
    addFactory<P extends Object>(factory: IFactory | Function | string, alias: string, args?: Keys<this>): this & P;
    setAlias(componentName: string, alias: string): void;
    with<T extends Object>(obj: T): this & T;
    loadToCache<T>(otherContext: Context): void;
    clearCache(): void;
    load<T>(otherContext: LoadedContext<T>): this & LoadedContext<T>;
    protected getArguments(aliases?: Keys<this>): this[keyof this][] | this[];
    protected getIdentifiers(): string[];
    protected createClassGetter(component: Class, alias: string, args: any[]): () => any;
    protected createFactoryGetter(factory: IFactory | Function, alias: string, args: any[]): () => any;
    protected createValueGetter(component: Object, alias: string): () => any;
    protected createGetter(alias: string, callbac: Function): () => any;
    protected getFactory(factory: IFactory | Function | string): IFactory | Function;
    protected createBy(factory: IFactory | Function, args: any[]): any;
    protected defineProperty(getter: () => any, alias: string): void;
}
