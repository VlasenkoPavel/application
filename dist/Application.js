"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Application {
    constructor(context) {
        this.context = context;
    }
    async start() {
        await this.context.init();
    }
}
exports.Application = Application;
