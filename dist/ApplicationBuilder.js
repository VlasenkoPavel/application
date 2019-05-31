"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./Application");
const ApplicationContext_1 = require("./ApplicationContext");
const lodash_1 = require("lodash");
class ApplicationBuilder {
    constructor(launcher) {
        this.context = this.createContext(launcher);
    }
    buildConfigs(configClasses, factory) {
        if (factory) {
            this.context.add(factory, 'configFactory');
        }
        this.configs = configClasses;
        return this;
    }
    buildByFactory(factory, argNames, name) {
        const args = this.getComponents(argNames);
        this.context.add(this.getFactory(factory).create(...args), name);
        return this;
    }
    buildWithParams(componentClass, argNames, name) {
        const args = this.getComponents(argNames);
        this.context.add(new componentClass(...args));
        return this;
    }
    async buildByAsyncFactory(factory, argNames, name) {
        const args = this.getComponents(argNames);
        const component = await this.getFactory(factory).create(...args);
        this.context.add(component, name);
        return this;
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
        if (!lodash_1.isEmpty(this.commands)) {
            this.context.add(this.createCommands(), "commands" /* commands */);
        }
        const app = new Application_1.Application(this.context);
        return app;
    }
    async createConfigs() {
        if (this.configs) {
            for (const cfgClass of this.configs) {
                const config = await this.context['configFactory'].create(cfgClass);
                this.context.add(config);
            }
        }
        return this;
    }
    getFactory(factory) {
        return lodash_1.isString(factory) ? this.context[factory] : factory;
    }
    getComponents(names) {
        return names.map(name => this.context[name]);
    }
    createContext(launcher) {
        return new ApplicationContext_1.ApplicationContext(launcher);
    }
    createCommands() {
        return this.commands.map(command => new command(this.context));
    }
}
exports.ApplicationBuilder = ApplicationBuilder;
