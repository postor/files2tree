declare type TreeNode<T> = {
    children: TreeNode<T>[];
    name: string;
    data?: T;
};
export declare function files2tree(files: string[]): TreeNode<string>[];
export declare function files2tree<T>(files: T[], getPath: (value: T) => string): TreeNode<T>[];
export default files2tree;
