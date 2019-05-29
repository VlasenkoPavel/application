import { ApplicationContext } from './ApplicationContext';
export declare class Application {
    protected context: ApplicationContext;
    constructor(context: ApplicationContext);
    init(): Promise<void>;
    start(): void;
}
