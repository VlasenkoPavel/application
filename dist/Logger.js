"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
class Logger extends Component_1.Component {
    debug(message, ...args) {
        throw new Error(`${this.constructor.name}.debug is undefined`);
    }
    info(message, ...args) {
        throw new Error(`${this.constructor.name}.info is undefined`);
    }
    warn(message, ...args) {
        throw new Error(`${this.constructor.name}.warn is undefined`);
    }
    error(message, ...args) {
        throw new Error(`${this.constructor.name}.error is undefined`);
    }
    fatal(message, ...args) {
        throw new Error(`${this.constructor.name}.fatal is undefined`);
    }
}
exports.Logger = Logger;
