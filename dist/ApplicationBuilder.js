"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./Application");
const ApplicationContext_1 = require("./ApplicationContext");
const getComponentName_1 = require("./utils/getComponentName");
class ApplicationBuilder {
    constructor(launcher) {
        this.context = this.createContext(launcher);
    }
    buildComponent(component, name) {
        const aName = name || getComponentName_1.getComponentName(component);
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
