"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Context {
    constructor() {
        this.identifiers = new Set();
    }
    add(TClass, name, configurable = true) {
        Object.defineProperty(this, name, {
            get: this.createGetter(TClass, name),
            enumerable: true,
            configurable
        });
        this.identifiers.add(name);
        return this;
    }
    with(obj) {
        const extendedCtx = Object.create(this);
        Object.assign(extendedCtx, obj);
        return extendedCtx;
    }
    loadToCache(otherContext) {
        const identifiers = otherContext.getIdentifiers();
        identifiers.forEach(name => { this.cache.set(name, otherContext[name]); });
    }
    clearCache() {
        this.cache = new Map();
    }
    load(otherContext) {
        const identifiers = otherContext.getIdentifiers();
        identifiers.forEach(name => { this[name] = otherContext[name]; });
        return this;
    }
    getIdentifiers() {
        return [...this.identifiers];
    }
    createGetter(T, name) {
        return () => {
            let instance = this.cache.get(name);
            if (!instance) {
                instance = this.isClass(T) ? new T(this) : T;
                this.cache.set(name, instance);
            }
            return instance;
        };
    }
    isClass(T) {
        return T instanceof Function;
    }
}
exports.Context = Context;
