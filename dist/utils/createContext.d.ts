import { Context } from '../Context';
import { Class } from '..';
export declare const createContext: <T extends Context>(contextClass: Class<T, any>, ...args: any[]) => T;
