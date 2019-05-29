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
        this.context["launcher" /* launcher */].start();
    }
}
exports.Application = Application;
