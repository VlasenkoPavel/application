import { Application } from './Application';
import { ApplicationContext } from './ApplicationContext';
import { ConfigFactory } from './ConfigFactory';
import { Connector } from './Connector';
import { Logger } from './Logger';
import { Launcher } from './Launcher';

export class ApplicationBuilder {

    protected context: ApplicationContext;

    constructor() {
        this.context = this.createContext();
    }

    public buildConfigs(configFactory: ConfigFactory): ApplicationBuilder {
        this.context.configFactory = configFactory;
        return this;
    }

    public buildConnector(connector: Connector): ApplicationBuilder {
        this.context.connector = connector;
        return this;
    }

    public buildLogger(logger: Logger): ApplicationBuilder {
        this.context.logger = logger;
        return this;
    }

    public buildLauncher(launcher: Launcher): ApplicationBuilder {
        this.context.launcher = launcher;
        return this;
    }

    public create(): Application {
        return new Application(this.context);
    }

    protected createContext(): ApplicationContext {
        return new ApplicationContext();
    }

}
