"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./Application");
const ApplicationContext_1 = require("./ApplicationContext");
class ApplicationBuilder {
    constructor() {
        this.context = this.createContext();
    }
    buildConfigs(configFactory) {
        this.context.configFactory = configFactory;
        return this;
    }
    buildConnector(connector) {
        this.context.connector = connector;
        return this;
    }
    buildLogger(logger) {
        this.context.logger = logger;
        return this;
    }
    buildLauncher(launcher) {
        this.context.launcher = launcher;
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
