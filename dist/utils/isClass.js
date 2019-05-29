"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.isClass = (arg) => {
    return lodash_1.isFunction(arg);
};
