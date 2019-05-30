"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Application {
    constructor({ launcher }) {
        this.launcher = launcher;
    }
    setContext(context) {
        this.context = context;
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
