"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Application {
    constructor({ context, launcher }) {
        this.launcher = launcher;
        this.context = context;
    }
    async init() {
        await this.context.init();
    }
    async start() {
        await this.launcher.start();
    }
    async stop() {
        await this.context.dispose();
    }
}
exports.Application = Application;
