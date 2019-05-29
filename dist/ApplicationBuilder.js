"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./Application");
const ApplicationContext_1 = require("./ApplicationContext");
const lodash_1 = require("lodash");
const isClass_1 = require("./isClass");
class ApplicationBuilder {
    constructor(launcher) {
        this.context = this.createContext(launcher);
    }
    buildComponent(component, name) {
        let aName = name
            || (isClass_1.isClass(component) ? lodash_1.camelCase(component.name) : lodash_1.camelCase(component.constructor.name));
        this.context.add(component, aName);
        return this;
    }
    create() {
        return new Application_1.Application(this.context);
    }
    createContext(launcher) {
        return new ApplicationContext_1.ApplicationContext(launcher);
    }
}
exports.ApplicationBuilder = ApplicationBuilder;
