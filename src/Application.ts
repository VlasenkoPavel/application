import { ApplicationContext } from './ApplicationContext';

export class Application {

    protected context: ApplicationContext;

    constructor(context: ApplicationContext) {
        this.context = context;
    }

    public async start(): Promise<void> {
        await this.context.init();
    }
}
