export interface IConfigFactory<T = any> {
    create(...args: any[]): T | Promise<T>;
}
