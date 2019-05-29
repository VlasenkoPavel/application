import { Component } from './Component';
import { ApplicationContext } from '.';

export class Launcher extends Component {

    protected context: ApplicationContext;

    constructor(context: ApplicationContext) {
        super();
        this.context = context;
    }

    public setContext(context: ApplicationContext): void {
        this.context = context;
    }

    public start(): void {
        throw new Error(`${this.constructor.name}.start is undefined`);
    }

}
