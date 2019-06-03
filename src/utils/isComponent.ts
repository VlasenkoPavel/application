import { Component } from '../abstract';

export const isComponent = (arg: any): arg is Component => {
    return arg instanceof Component;
};
