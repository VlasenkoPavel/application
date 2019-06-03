"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Context_1 = require("./Context");
const Component_1 = require("./abstract/Component");
class ApplicationContext extends Context_1.Context {
    constructor(launcher) {
        super();
        const alias = "launcher" /* launcher */;
        lodash_1.isFunction(launcher) ? this.add(launcher, alias) : this.addValue(launcher, alias);
    }
    async init() {
        await Promise.all(this.getComponents().map(component => component.init()));
    }
    async dispose() {
        await Promise.all(this.getComponents().map(component => component.dispose()));
    }
    getComponents() {
        return this.getIdentifiers().map(item => (this[item])).filter(component => this.isComponent(component));
    }
    isComponent(arg) {
        return arg instanceof Component_1.Component;
    }
}
exports.ApplicationContext = ApplicationContext;
