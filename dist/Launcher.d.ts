import { Component } from './Component';
import { ApplicationContext } from '.';
export declare class Launcher extends Component {
    protected context: ApplicationContext;
    setContext(context: ApplicationContext): void;
    start(): void;
}
