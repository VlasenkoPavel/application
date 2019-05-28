"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
class ConfigFactory extends Component_1.Component {
    create() {
        throw new Error(`${this.constructor.name}.create is undefined`);
    }
}
exports.ConfigFactory = ConfigFactory;
