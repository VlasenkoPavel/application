"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./Application");
const ApplicationContext_1 = require("./ApplicationContext");
class ApplicationBuilder {
    constructor(launcher) {
        this.context = this.createContext(launcher);
    }
    buildComponent(component, name) {
        this.context.add(component, name);
        return this;
    }
    create() {
        const app = new Application_1.Application(this);
        app.setContext(this.context);
        return app;
    }
    createContext(launcher) {
        return new ApplicationContext_1.ApplicationContext(launcher);
    }
}
exports.ApplicationBuilder = ApplicationBuilder;
