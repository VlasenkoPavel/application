"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./Application");
const ApplicationContext_1 = require("./ApplicationContext");
const lodash_1 = require("lodash");
class ApplicationBuilder {
    constructor() {
        this.context = this.createContext();
    }
    buildConfigs(configFactory) {
        const factory = new configFactory(this.context);
        this.context.add(factory.create(), 'config');
        return this;
    }
    buildComponent(component, name = lodash_1.camelCase(component.name)) {
        this.context.add(component, name);
        return this;
    }
    buildLogger(logger) {
        this.context.add(logger, 'logger');
        return this;
    }
    buildLauncher(launcher) {
        this.context.add(launcher, 'launcher');
        return this;
    }
    create() {
        return new Application_1.Application(this.context);
    }
    createContext() {
        return new ApplicationContext_1.ApplicationContext();
    }
}
exports.ApplicationBuilder = ApplicationBuilder;
