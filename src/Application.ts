import { ApplicationContext } from './ApplicationContext';
import { RequiredComponents } from './types';

export class Application {

    protected context: ApplicationContext;

    constructor(context: ApplicationContext) {
        this.context = context;
    }

    public async init(): Promise<void> {
        await this.context.init();
    }

    public start(): void {
        this.context[RequiredComponents.launcher].start();
    }

}
