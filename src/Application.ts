import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './abstract';

interface Dependencies {
    context: ApplicationContext;
    launcher: Launcher;
}

export class Application {

    protected context: ApplicationContext;
    protected launcher: Launcher;

    constructor({ launcher }: Dependencies) {
        this.launcher = launcher;
    }

    public setContext(context: ApplicationContext) {
        this.context = context;
    }

    public async init(): Promise<void> {
        await this.context.init();
    }

    public async start(): Promise<void> {
        await this.launcher.start();
        process.on('exit', () => this.stop());
    }

    public async stop(): Promise<void> {
        await this.context.dispose();
    }

}
