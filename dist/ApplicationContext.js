"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("./Context");
class ApplicationContext extends Context_1.Context {
    async init() {
        await Promise.all(this.getIdentifiers().map(item => this[item].init(this)));
    }
    async dispose() {
        await Promise.all(this.getIdentifiers().map(item => this[item].dispose()));
    }
}
exports.ApplicationContext = ApplicationContext;
