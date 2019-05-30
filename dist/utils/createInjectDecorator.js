"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypedInjectDecorator = (ctx) => (target, key) => {
    target[key] = ctx[key];
};
