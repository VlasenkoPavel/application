"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isClass_1 = require("./isClass");
class Context {
    constructor() {
        this.identifiers = new Set();
        this.cache = new Map();
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
                instance = isClass_1.isClass(T) ? new T(this) : T;
                this.cache.set(name, instance);
            }
            return instance;
        };
    }
}
exports.Context = Context;
