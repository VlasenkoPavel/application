import { ApplicationContext } from './ApplicationContext';

export class Application {

    protected context: ApplicationContext;

    constructor(context: ApplicationContext) {
        this.context = context;
    }

    public async init(): Promise<void> {
        await this.context.init();
    }

    public start(): void {
        const { launcher } = this.context;
        launcher.start();
    }

}
