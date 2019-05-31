import { Context } from '../Context';
import { Class, ILogger } from '..';

const handler: ProxyHandler<Context> = {
    get (target: Context, key: PropertyKey): any {

        const component = target[key];

        if (!component) {
            const contextClass = Object.getPrototypeOf(target).constructor.name;
            const logger: ILogger = target['logger'];

            if (logger) {
                logger.debug(`Component with name: "${String(key)}" is not defined in ${contextClass}`);
            } else {
                console.dir(`Component with name: ${String(key)} is not defined in ${contextClass}`, { colors: true });
            }
        }

        return component;
    }
};

export const createContext = <T extends Context>(contextClass: Class<T>, ...args: any[]): T => {
    return new Proxy(new contextClass(...args), handler) as T;
};
