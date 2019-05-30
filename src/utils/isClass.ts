import { isFunction } from 'lodash';

import { Class } from '../types';

export const isClass = <T>(arg: Class<T> | T): arg is Class =>  {
    return isFunction(arg);
};
