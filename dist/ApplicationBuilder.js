"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./Application");
const ApplicationContext_1 = require("./ApplicationContext");
const lodash_1 = require("lodash");
const utils_1 = require("./utils");
class ApplicationBuilder {
    constructor(launcher) {
        this.context = this.createContext(launcher);
    }
    async buildConfigs(configClasses, factory = this.context['configFactory']) {
        for (const cfgClass of configClasses) {
            const config = await factory.create(cfgClass);
            this.context.addComponent(config);
        }
        return this;
    }
    addFactory(factory, alias, args) {
        this.context.addFactory(factory, alias, args);
        return this;
    }
    buildComponent(componentClass, option = {}) {
        this.context.addClass(componentClass, option);
        return this;
    }
    async addAsyncFactory(factory, argNames, alias) {
        const args = this.getComponents(argNames);
        const component = lodash_1.isFunction(factory) ? await factory(...args) : await this.getFactory(factory).create(...args);
        this.context.addValue(component, alias);
        return this;
    }
    addComponent(component, alias) {
        this.context.addComponent(component, alias);
        return this;
    }
    buildCommands(commands) {
        this.commands = commands;
        return this;
    }
    setParameter(alias, value) {
        this.context.addValue(value, alias);
        return this;
    }
    create() {
        if (!lodash_1.isEmpty(this.commands)) {
            this.context.addValue(this.createCommands(), "commands" /* commands */);
        }
        const app = new Application_1.Application(this.context);
        return app;
    }
    getFactory(factory) {
        return lodash_1.isString(factory) ? this.context[factory] : factory;
    }
    getComponents(names) {
        return names.map(name => this.context[name]);
    }
    createContext(launcher) {
        return utils_1.createContext(ApplicationContext_1.ApplicationContext, launcher);
    }
    createCommands() {
        return this.commands.map(command => new command(this.context));
    }
}
exports.ApplicationBuilder = ApplicationBuilder;
