"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
class Launcher extends Component_1.Component {
    constructor(context) {
        super();
        this.context = context;
    }
    setContext(context) {
        this.context = context;
    }
    start() {
        throw new Error(`${this.constructor.name}.start is undefined`);
    }
}
exports.Launcher = Launcher;
