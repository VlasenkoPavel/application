"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getComponentName_1 = require("./utils/getComponentName");
const lodash_1 = require("lodash");
class Context {
    constructor() {
        this.identifiers = new Set();
        this.cache = new Map();
    }
    get context() {
        return this;
    }
    add(component, alias) {
        this.addClass(component, { alias });
        return this;
    }
    addComponent(component, alias = getComponentName_1.getComponentName(component)) {
        return this.addValue(component, alias);
    }
    addClass(component, { alias = getComponentName_1.getComponentName(component), args } = {}) {
        const getter = this.createClassGetter(component, alias, this.getArguments(args));
        this.defineProperty(getter, alias);
        return this;
    }
    addValue(component, alias) {
        const getter = this.createValueGetter(component, alias);
        this.defineProperty(getter, alias);
        return this;
    }
    addFactory(factory, alias, args) {
        const getter = this.createFactoryGetter(this.getFactory(factory), alias, this.getArguments(args));
        this.defineProperty(getter, alias);
        return this;
    }
    setAlias(componentName, alias) {
        this.identifiers.add(alias);
        this[alias] = this[componentName];
    }
    with(obj) {
        const extendedCtx = Object.create(this);
        Object.assign(extendedCtx, obj);
        return extendedCtx;
    }
    loadToCache(otherContext) {
        const identifiers = otherContext.getIdentifiers();
        identifiers.forEach(id => this.cache.set(id, otherContext[id]));
    }
    clearCache() {
        this.cache = new Map();
    }
    load(otherContext) {
        const identifiers = otherContext.getIdentifiers();
        identifiers.forEach(id => {
            this.identifiers.add(id);
            this[id] = otherContext[id];
        });
        return this;
    }
    getArguments(aliases) {
        return aliases ? aliases.map(alias => this[alias]) : [this];
    }
    getIdentifiers() {
        return [...this.identifiers];
    }
    createClassGetter(component, alias, args) {
        return this.createGetter(alias, () => new component(...args));
    }
    createFactoryGetter(factory, alias, args) {
        return this.createGetter(alias, () => this.createBy(factory, args));
    }
    createValueGetter(component, alias) {
        return this.createGetter(alias, () => component);
    }
    createGetter(alias, callbac) {
        return () => {
            let instance = this.cache.get(alias);
            if (!instance) {
                instance = callbac();
                this.cache.set(alias, instance);
            }
            return instance;
        };
    }
    getFactory(factory) {
        return lodash_1.isString(factory) ? this[factory] : factory;
    }
    createBy(factory, args) {
        return lodash_1.isFunction(factory) ? factory(...args) : factory.create(...args);
    }
    defineProperty(getter, alias) {
        Object.defineProperty(this, alias, {
            get: getter,
            enumerable: true,
            configurable: true
        });
        this.identifiers.add(alias);
    }
}
exports.Context = Context;
