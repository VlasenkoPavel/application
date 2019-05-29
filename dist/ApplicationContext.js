"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const Context_1 = require("./Context");
class ApplicationContext extends Context_1.Context {
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
