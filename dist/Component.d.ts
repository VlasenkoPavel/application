import { ApplicationContext } from './ApplicationContext';
export declare class Component {
    protected context: ApplicationContext;
    setContext(context: ApplicationContext): void;
    init(): Promise<void>;
    dispose(): Promise<void>;
}
