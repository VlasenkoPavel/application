export interface Class<T = any, P = any> extends Function {
    new (...args: P[]): T;
}
export declare type StringKey<T> = keyof T & string;
