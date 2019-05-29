import { camelCase } from 'lodash';

import { isClass } from './isClass';
import { Class } from '../types';

export const getComponentName = (component: Class | object): string =>
    isClass(component) ? camelCase(component.name) : camelCase(component.constructor.name);
