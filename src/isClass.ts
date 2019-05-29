import { isFunction } from 'lodash';
import { Class } from './types';

export const isClass = <T>(arg: Class<T> | object): arg is Class =>  {
    return isFunction(arg);
}
