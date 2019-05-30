"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./Application");
const ApplicationContext_1 = require("./ApplicationContext");
const lodash_1 = require("lodash");
class ApplicationBuilder {
    constructor(launcher) {
        this.context = this.createContext(launcher);
    }
    buildComponent(component, name) {
        this.context.add(component, name);
        return this;
    }
    buildCommands(commands) {
        this.commands = commands;
        return this;
    }
    create() {
        const app = new Application_1.Application(this.context);
        if (!lodash_1.isEmpty(this.commands)) {
            this.context.add(this.createCommands(), "commands" /* commands */);
        }
        return app;
    }
    createContext(launcher) {
        return new ApplicationContext_1.ApplicationContext(launcher);
    }
    createCommands() {
        return this.commands.map(command => new command(this.context));
    }
}
exports.ApplicationBuilder = ApplicationBuilder;
