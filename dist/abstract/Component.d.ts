export declare abstract class Component {
    init(dependencies?: Object): Promise<void>;
    dispose(): Promise<void>;
}
