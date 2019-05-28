"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash = require("lodash");
const ConfigFactory_1 = require("./ConfigFactory");
const Connector_1 = require("./Connector");
const Logger_1 = require("./Logger");
const Launcher_1 = require("./Launcher");
class ApplicationContext {
    constructor() {
        this.items = new Map();
    }
    get connector() {
        return this.get(Connector_1.Connector);
    }
    set connector(value) {
        this.set(Connector_1.Connector, value);
    }
    get logger() {
        return this.get(Logger_1.Logger);
    }
    set logger(value) {
        this.set(Logger_1.Logger, value);
    }
    get launcher() {
        return this.get(Launcher_1.Launcher);
    }
    set launcher(value) {
        this.set(Launcher_1.Launcher, value);
    }
    get configs() {
        const factory = this.get(ConfigFactory_1.ConfigFactory);
        return factory.create();
    }
    get configFactory() {
        return this.get(ConfigFactory_1.ConfigFactory);
    }
    set configFactory(value) {
        this.set(ConfigFactory_1.ConfigFactory, value);
    }
    async init() {
        if (this.configFactory) {
            await this.configFactory.init();
        }
        const items = lodash.difference(this.getComponents(), [this.configFactory]);
        await Promise.all(items.map(item => item.init()));
    }
    async dispose() {
        const items = this.getComponents();
        await Promise.all(items.map(item => item.dispose()));
    }
    get(key) {
        return this.items.get(key);
    }
    set(key, value) {
        value.setContext(this);
        this.items.set(key, value);
    }
    getComponents() {
        return [...this.items.values()];
    }
}
exports.ApplicationContext = ApplicationContext;
