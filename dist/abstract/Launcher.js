"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
class Launcher extends Component_1.Component {
    setContext(context) {
        this.context = context;
    }
    async stop() {
        await this.context.dispose();
    }
}
exports.Launcher = Launcher;
