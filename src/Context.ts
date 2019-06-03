import { Class, StringKey, LoadedContext, CreationOption, Keys, Extension } from './types';
import { getComponentName } from './utils/getComponentName';
import { IFactory } from './interfaces';
import { isFunction, isString } from 'lodash';

export class Context {

    protected identifiers: Set<string> = new Set();
    protected cache: Map<string, any> = new Map();

    get context() {
        return this;
    }

    public add<T extends Object, P extends Object>(
        component: Class<T>,
        alias: StringKey<P>
    ): this & { [key in keyof P]: T } {
        this.addClass(component, { alias });

        return this as this & { [key in keyof P]: T };
    }

    public addComponent<T extends Object, P extends Object>(
        component: T,
        alias: StringKey<P> = getComponentName(component) as StringKey<P>
    ): this & { [key in keyof P]: T } {
        return this.addValue(component, alias);
    }

    public addClass<T extends Object, P extends Object>(
        component: Class<T>,
        { alias = getComponentName(component) as StringKey<P>, args }: CreationOption<P, this> = {}
    ):  this & { [key in keyof P]: T } {
        const getter = this.createClassGetter(component, alias, this.getArguments(args));
        this.defineProperty(getter, alias);

        return this as  this & { [key in keyof P]: T };
    }

    public addValue<T, P extends Object>(
        component: any,
        alias: StringKey<P>
    ): this & { [key in keyof P]: T } {
        const getter = this.createValueGetter(component, alias);
        this.defineProperty(getter, alias);

        return this as this & { [key in keyof P]: T };
    }

    public addFactory<P extends Object>(
        factory: IFactory | Function | string,
        alias: string,
        args?: Keys<this>
    ): this & P {
        const getter = this.createFactoryGetter(this.getFactory(factory), alias, this.getArguments(args));
        this.defineProperty(getter, alias);

        return this as this & P;
    }

    public setAlias(componentName: string, alias: string) {
        this.identifiers.add(alias);
        this[alias] = this[componentName];
    }

    public with<T extends Object>(obj: T): this & T {
        const extendedCtx = Object.create(this);
        Object.assign(extendedCtx, obj);

        return extendedCtx;
    }

    public loadToCache<T>(otherContext: Context): void {
        const identifiers = otherContext.getIdentifiers();
        identifiers.forEach(id => this.cache.set(id, otherContext[id]));
    }

    public clearCache(): void {
        this.cache = new Map();
    }

    public load<T>(otherContext: LoadedContext<T>): this & LoadedContext<T>  {
        const identifiers = otherContext.getIdentifiers();

        identifiers.forEach(id => {
            this.identifiers.add(id);
            this[id] = otherContext[id];
        });

        return this;
    }

    protected getArguments(aliases?: Keys<this>) {
        return aliases ? aliases.map(alias => this[alias]) : [this];
    }

    protected getIdentifiers(): string[] {
        return [...this.identifiers];
    }

    protected createClassGetter(component: Class, alias: string, args: any[]) {
        return this.createGetter(alias, () => new component(...args));
    }

    protected createFactoryGetter(factory:  IFactory | Function, alias: string, args: any[]) {
        return this.createGetter(alias, () => this.createBy(factory, args));
    }

    protected createValueGetter(component: Object, alias: string) {
        return this.createGetter(alias, () => component);
    }

    protected createGetter(alias: string, callbac: Function) {
        return () => {
            let instance = this.cache.get(alias);

            if (!instance) {
                instance = callbac();
                this.cache.set(alias, instance);
            }

            return instance;
        };
    }

    protected getFactory(factory: IFactory | Function | string): IFactory | Function {
        return isString(factory) ? this[factory] : factory;
    }

    protected createBy(factory: IFactory | Function, args: any[]) {
        return isFunction(factory) ? factory(...args) : (factory as IFactory).create(...args);
    }

    protected defineProperty(getter: () => any, alias: string) {
        Object.defineProperty(this, alias, {
            get: getter,
            enumerable: true,
            configurable: true
        });

        this.identifiers.add(alias);
    }

}
