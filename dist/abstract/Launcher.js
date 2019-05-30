"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
class Launcher extends Component_1.Component {
    constructor({ context }) {
        super();
        this.context = context;
    }
    async stop() {
        await this.context.dispose();
    }
}
exports.Launcher = Launcher;
