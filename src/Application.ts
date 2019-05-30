import { ApplicationContext } from './ApplicationContext';
import { Launcher } from './abstract';

interface Dependencies {
    context: ApplicationContext;
    launcher: Launcher;
}

export class Application {

    protected context: ApplicationContext;
    protected launcher: Launcher;

    constructor({ context, launcher }: Dependencies) {
        this.context = context;
        this.launcher = launcher;
    }

    public async init(): Promise<void> {
        await this.context.init();
    }

    public async start(): Promise<void> {
        await this.launcher.start();
    }

    public async stop(): Promise<void> {
        await this.launcher.stop();
    }

}
