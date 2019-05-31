"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler = {
    get(target, key) {
        const component = target[key];
        if (!component) {
            const contextClass = Object.getPrototypeOf(target).constructor.name;
            const logger = target['logger'];
            if (logger) {
                logger.debug(`Component with name: "${String(key)}" is not defined in ${contextClass}`);
            }
            else {
                console.dir(`Component with name: ${String(key)} is not defined in ${contextClass}`, { colors: true });
            }
        }
        return component;
    }
};
exports.createContext = (contextClass, ...args) => {
    return new Proxy(new contextClass(...args), handler);
};
