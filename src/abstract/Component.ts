export abstract class Component {

    public async init(dependencies?: Object): Promise<void> {}

    public async dispose(): Promise<void> {}

}
