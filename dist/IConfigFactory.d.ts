import { Component } from './Component';
export interface IConfigFactory<T = any> extends Component {
    create(): T;
}
