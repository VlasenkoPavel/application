import { Component } from './Component';

export class ConfigFactory<T = any> extends Component {

    public create(): T {
        throw new Error(`${this.constructor.name}.create is undefined`);
    }

}
