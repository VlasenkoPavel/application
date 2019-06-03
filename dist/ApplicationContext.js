"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Context_1 = require("./Context");
const utils_1 = require("./utils");
class ApplicationContext extends Context_1.Context {
    constructor(launcher) {
        super();
        const alias = "launcher" /* launcher */;
        lodash_1.isFunction(launcher) ? this.add(launcher, alias) : this.addValue(launcher, alias);
    }
    get components() {
        const components = new Map();
        this.getIdentifiers()
            .forEach(id => {
            const instance = this[id];
            if (utils_1.isComponent(instance)) {
                components.set(id, instance);
            }
        });
        return components;
    }
}
exports.ApplicationContext = ApplicationContext;
