export interface Class<T = any, P = any> extends Function {
    new (...args: P[]): T;
}

export type StringKey<T> =  keyof T & string;
