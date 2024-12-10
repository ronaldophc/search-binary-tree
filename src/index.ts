import ITree from "./tree.interface";
import Node from "./node";
import { DeleteNode } from "./deleteNode.interface";

export default class Tree<T> implements ITree<T> {
    private root?: Node<T>;

    constructor(private readonly key: keyof T) {}

    insert(data: T): void {
        const node: Node<T> = new Node({ data });

        if (!this.root) {
            this.root = node;
            return;
        }

        let current: Node<T> | undefined = this.root;
        let parent: Node<T>;

        while (true) {
            parent = current;
            if (data[this.key] < current.data[this.key]) {
                current = current.leftChild;
                if (!current) {
                    parent.leftChild = node;
                    return;
                }
            } else {
                current = current.rightChild;
                if (!current) {
                    parent.rightChild = node;
                    return;
                }
            }
        }
    }

    find(value: number | string): Node<T> | undefined {
        let current: Node<T> | undefined = this.root;

        while (current && current.data[this.key] !== value) {
            if (value < current.data[this.key]) {
                current = current.leftChild;
            } else {
                current = current.rightChild;
            }

            if (!current) {
                return;
            }
        }

        return current;
    }

    minimum(): T | undefined {
        return this.findMinMax("leftChild");
    }

    maximum(): T | undefined {
        return this.findMinMax("rightChild");
    }

    private findMinMax(key: "leftChild" | "rightChild"): T | undefined {
        let current: Node<T> | undefined,
            last: Node<T> | undefined = undefined;
        current = this.root;

        while (current) {
            last = current;
            current = current[key];
        }

        return last?.data;
    }

    displayInOrder() {
        if (this.root) {
            this.inOrder(this.root);
        }
    }

    private inOrder(localRoot?: Node<T>) {
        if (localRoot) {
            this.inOrder(localRoot.leftChild);
            console.log(localRoot.data);
            this.inOrder(localRoot.rightChild);
        }
    }

    delete(value: number | string): boolean {
        let current = this.root;
        let parent = this.root;
        let isLeftChild = true;

        while (current && current.data[this.key] != value) {
            parent = current;
            if (value < current.data[this.key]) {
                isLeftChild = true;
                current = current.leftChild;
            } else {
                isLeftChild = false;
                current = current.rightChild;
            }

            if (!current) {
                return false;
            }
        }

        const params: DeleteNode<T> = { current, parent, isLeftChild };
        if (!current?.leftChild && !current?.rightChild) {
            this.deleteNoChildNode(params);
        } else if (!current?.rightChild) {
            this.deleteNoRightChildNode(params);
        } else if (!current?.leftChild) {
            this.deleteNoLeftChildNode(params);
        } else {
            this.deleteNodeWithTwoChildren(params);
        }

        return true;
    }

    private deleteNoChildNode({ current, isLeftChild, parent }: DeleteNode<T>) {
        if (current?.data[this.key] === this.root?.data[this.key]) {
            this.root = undefined;
        } else if (isLeftChild) {
            if (parent) parent.leftChild = undefined;
        } else {
            if (parent) parent.rightChild = undefined;
        }
    }

    private deleteNoRightChildNode({
        current,
        isLeftChild,
        parent,
    }: DeleteNode<T>) {
        if (current?.data[this.key] === this.root?.data[this.key]) {
            this.root = current?.leftChild;
        } else if (isLeftChild) {
            if (parent) parent.leftChild = current?.leftChild;
        } else {
            if (parent) parent.rightChild = current?.leftChild;
        }
    }

    private deleteNoLeftChildNode({
        current,
        isLeftChild,
        parent,
    }: DeleteNode<T>) {
        if (current?.data[this.key] === this.root?.data[this.key]) {
            this.root = current?.rightChild;
        } else if (isLeftChild) {
            if (parent) parent.leftChild = current?.rightChild;
        } else {
            if (parent) parent.rightChild = current?.rightChild;
        }
    }

    private findSuccessor(delNode: Node<T>): Node<T> {
        let successorParent = delNode;
        let successor = delNode;
        let current = delNode.rightChild;
        while (current) {
            successorParent = successor;
            successor = current;
            current = current.leftChild;
        }

        if (successor.data[this.key] !== delNode.rightChild?.data[this.key]) {
            successorParent.leftChild = successor.rightChild;
            successor.rightChild = delNode.rightChild;
        }

        return successor;
    }

    private deleteNodeWithTwoChildren({
        current,
        isLeftChild,
        parent,
    }: DeleteNode<T>) {
        const successor = current && this.findSuccessor(current);

        if (!successor) {
            return;
        }

        if (current?.data[this.key] === this.root?.data[this.key]) {
            this.root = successor;
        } else if (isLeftChild) {
            if (parent) parent.leftChild = successor;
        } else {
            if (parent) parent.rightChild = successor;
        }
        successor.leftChild = current?.leftChild;
    }

    public findLowestNode(): Node<T> | undefined {
        let current = this.root;
        let parent = this.root;

        while (current) {
            parent = current;
            current = current.leftChild;
        }
        console.log('Lowest Node:');
        console.log(parent?.data);
        return parent;
    }

    public findHighestNode(): Node<T> | undefined {
        let current = this.root;
        let parent = this.root;

        while (current) {
            parent = current;
            current = current.rightChild;
        }
        console.log('Highest Node:');
        console.log(parent?.data);
        return parent;
    }
}

const tree = new Tree<Person>("id");
tree.insert({ id: 1, name: "John", lastName: "Doe" });
tree.insert({ id: 2, name: "Jane", lastName: "Doe" });
tree.insert({ id: 3, name: "James", lastName: "Doe" });
tree.insert({ id: 4, name: "Jill", lastName: "Doe" });
tree.displayInOrder();
tree.findLowestNode();
tree.findHighestNode();