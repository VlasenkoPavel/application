"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("./Context");
const abstract_1 = require("./abstract");
class ApplicationContext extends Context_1.Context {
    constructor(launcher) {
        super();
        this.add(new launcher(this), "launcher" /* launcher */);
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
        return arg instanceof abstract_1.Component;
    }
}
exports.ApplicationContext = ApplicationContext;
