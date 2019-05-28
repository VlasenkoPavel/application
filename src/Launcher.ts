import { Component } from './Component';

export class Launcher extends Component {

    public start(): void {
        throw new Error(`${this.constructor.name}.start is undefined`);
    }

}
