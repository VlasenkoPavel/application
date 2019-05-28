import { ApplicationContext } from './ApplicationContext';

export class Component {

    protected context: ApplicationContext;

    public setContext(context: ApplicationContext): void {
        this.context = context;
    }

    public async init(): Promise<void> {
    }

    public async dispose(): Promise<void> {
    }

}
