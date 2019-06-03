"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("../abstract");
exports.isComponent = (arg) => {
    return arg instanceof abstract_1.Component;
};
