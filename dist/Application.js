"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Application {
    constructor({ context, launcher }) {
        this.context = context;
        this.launcher = launcher;
    }
    async init() {
        await this.context.init();
    }
    async start() {
        await this.launcher.start();
    }
    async stop() {
        await this.launcher.stop();
    }
}
exports.Application = Application;
