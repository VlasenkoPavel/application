"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isClass_1 = require("./utils/isClass");
const getComponentName_1 = require("./utils/getComponentName");
class Context {
    constructor() {
        this.identifiers = new Set();
        this.cache = new Map();
    }
    add(component, name = getComponentName_1.getComponentName(component)) {
        Object.defineProperty(this, name, {
            get: this.createGetter(component, name),
            enumerable: true,
            configurable: true
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
    createGetter(component, name) {
        return () => {
            let instance = this.cache.get(name);
            if (!instance) {
                instance = isClass_1.isClass(component) ? new component(this) : component;
                this.cache.set(name, instance);
            }
            return instance;
        };
    }
}
exports.Context = Context;
