export const createTypedInjectDecorator = <T extends Object>(ctx: T) => (target: Object, key: keyof T): void => {
    target[key as string] = ctx[key as string];
};
