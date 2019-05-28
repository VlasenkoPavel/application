import { Component } from './Component';

export class Logger extends Component {

    public debug(message: any, ...args: any[]): void {
        throw new Error(`${this.constructor.name}.debug is undefined`);
    }

    public info(message: any, ...args: any[]): void {
        throw new Error(`${this.constructor.name}.info is undefined`);
    }

    public warn(message: any, ...args: any[]): void {
        throw new Error(`${this.constructor.name}.warn is undefined`);
    }

    public error(message: any, ...args: any[]): void {
        throw new Error(`${this.constructor.name}.error is undefined`);
    }

    public fatal(message: any, ...args: any[]): void {
        throw new Error(`${this.constructor.name}.fatal is undefined`);
    }

}
