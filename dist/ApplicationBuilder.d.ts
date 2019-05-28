import { Application } from './Application';
import { ApplicationContext } from './ApplicationContext';
import { ConfigFactory } from './ConfigFactory';
import { Connector } from './Connector';
import { Logger } from './Logger';
import { Launcher } from './Launcher';
export declare class ApplicationBuilder {
    protected context: ApplicationContext;
    constructor();
    buildConfigs(configFactory: ConfigFactory): ApplicationBuilder;
    buildConnector(connector: Connector): ApplicationBuilder;
    buildLogger(logger: Logger): ApplicationBuilder;
    buildLauncher(launcher: Launcher): ApplicationBuilder;
    create(): Application;
    protected createContext(): ApplicationContext;
}
