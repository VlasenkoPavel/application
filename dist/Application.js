"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Application {
    constructor(context) {
        this.context = context;
    }
    async init() {
        await this.context.init();
    }
    start() {
        const { launcher } = this.context;
        launcher.start();
    }
}
exports.Application = Application;
