import { ApplicationContext } from './ApplicationContext';
import { Launcher, Component } from './abstract';

interface Dependencies {
    components: Map<string, Component>;
    launcher: Launcher;
}

export class Application {
    protected components: Map<string, Component>;
    protected launcher: Launcher;

    constructor({ components, launcher }: Dependencies) {
        this.launcher = launcher;
        this.components = components;
    }

    public async init(): Promise<void> {
        await Promise.all(
            [...this.components.values()].map(component => component.init())
        );
    }

    public async start(): Promise<void> {
        await this.launcher.start();
    }

    public async stop(): Promise<void> {
        await Promise.all(
            [...this.components.values()].map(component => component.dispose())
        );
    }
}
