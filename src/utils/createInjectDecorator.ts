export const createInjectDecorator = <T extends Object>(ctx: T) => (target: Object, key: string): void => {
    target[key] = ctx[key];
};
