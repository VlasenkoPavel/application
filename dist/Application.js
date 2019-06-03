"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Application {
    constructor({ components, launcher }) {
        this.launcher = launcher;
        this.components = components;
    }
    async init() {
        await Promise.all([...this.components.values()].map(component => component.init()));
    }
    async start() {
        await this.launcher.start();
    }
    async stop() {
        await Promise.all([...this.components.values()].map(component => component.dispose()));
    }
}
exports.Application = Application;
