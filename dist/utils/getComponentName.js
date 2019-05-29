"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const isClass_1 = require("./isClass");
exports.getComponentName = (component) => isClass_1.isClass(component) ? lodash_1.camelCase(component.name) : lodash_1.camelCase(component.constructor.name);
