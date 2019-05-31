export interface IFactory<T = any, P = any> {
    create(...args: P[]): T;
}
