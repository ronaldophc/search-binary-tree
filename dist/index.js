"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("./node"));
class Tree {
    constructor(key) {
        this.key = key;
    }
    insert(data) {
        const node = new node_1.default({ data });
        if (!this.root) {
            this.root = node;
            return;
        }
        let current = this.root;
        let parent;
        while (true) {
            parent = current;
            if (data[this.key] < current.data[this.key]) {
                current = current.leftChild;
                if (!current) {
                    parent.leftChild = node;
                    return;
                }
            }
            else {
                current = current.rightChild;
                if (!current) {
                    parent.rightChild = node;
                    return;
                }
            }
        }
    }
    find(value) {
        let current = this.root;
        while (current && current.data[this.key] !== value) {
            if (value < current.data[this.key]) {
                current = current.leftChild;
            }
            else {
                current = current.rightChild;
            }
            if (!current) {
                return;
            }
        }
        return current;
    }
    minimum() {
        return this.findMinMax("leftChild");
    }
    maximum() {
        return this.findMinMax("rightChild");
    }
    findMinMax(key) {
        let current, last = undefined;
        current = this.root;
        while (current) {
            last = current;
            current = current[key];
        }
        return last === null || last === void 0 ? void 0 : last.data;
    }
    displayInOrder() {
        if (this.root) {
            this.inOrder(this.root);
        }
    }
    inOrder(localRoot) {
        if (localRoot) {
            this.inOrder(localRoot.leftChild);
            console.log(localRoot.data);
            this.inOrder(localRoot.rightChild);
        }
    }
    delete(value) {
        let current = this.root;
        let parent = this.root;
        let isLeftChild = true;
        while (current && current.data[this.key] != value) {
            parent = current;
            if (value < current.data[this.key]) {
                isLeftChild = true;
                current = current.leftChild;
            }
            else {
                isLeftChild = false;
                current = current.rightChild;
            }
            if (!current) {
                return false;
            }
        }
        const params = { current, parent, isLeftChild };
        if (!(current === null || current === void 0 ? void 0 : current.leftChild) && !(current === null || current === void 0 ? void 0 : current.rightChild)) {
            this.deleteNoChildNode(params);
        }
        else if (!(current === null || current === void 0 ? void 0 : current.rightChild)) {
            this.deleteNoRightChildNode(params);
        }
        else if (!(current === null || current === void 0 ? void 0 : current.leftChild)) {
            this.deleteNoLeftChildNode(params);
        }
        else {
            this.deleteNodeWithTwoChildren(params);
        }
        return true;
    }
    deleteNoChildNode({ current, isLeftChild, parent }) {
        var _a;
        if ((current === null || current === void 0 ? void 0 : current.data[this.key]) === ((_a = this.root) === null || _a === void 0 ? void 0 : _a.data[this.key])) {
            this.root = undefined;
        }
        else if (isLeftChild) {
            if (parent)
                parent.leftChild = undefined;
        }
        else {
            if (parent)
                parent.rightChild = undefined;
        }
    }
    deleteNoRightChildNode({ current, isLeftChild, parent, }) {
        var _a;
        if ((current === null || current === void 0 ? void 0 : current.data[this.key]) === ((_a = this.root) === null || _a === void 0 ? void 0 : _a.data[this.key])) {
            this.root = current === null || current === void 0 ? void 0 : current.leftChild;
        }
        else if (isLeftChild) {
            if (parent)
                parent.leftChild = current === null || current === void 0 ? void 0 : current.leftChild;
        }
        else {
            if (parent)
                parent.rightChild = current === null || current === void 0 ? void 0 : current.leftChild;
        }
    }
    deleteNoLeftChildNode({ current, isLeftChild, parent, }) {
        var _a;
        if ((current === null || current === void 0 ? void 0 : current.data[this.key]) === ((_a = this.root) === null || _a === void 0 ? void 0 : _a.data[this.key])) {
            this.root = current === null || current === void 0 ? void 0 : current.rightChild;
        }
        else if (isLeftChild) {
            if (parent)
                parent.leftChild = current === null || current === void 0 ? void 0 : current.rightChild;
        }
        else {
            if (parent)
                parent.rightChild = current === null || current === void 0 ? void 0 : current.rightChild;
        }
    }
    findSuccessor(delNode) {
        var _a;
        let successorParent = delNode;
        let successor = delNode;
        let current = delNode.rightChild;
        while (current) {
            successorParent = successor;
            successor = current;
            current = current.leftChild;
        }
        if (successor.data[this.key] !== ((_a = delNode.rightChild) === null || _a === void 0 ? void 0 : _a.data[this.key])) {
            successorParent.leftChild = successor.rightChild;
            successor.rightChild = delNode.rightChild;
        }
        return successor;
    }
    deleteNodeWithTwoChildren({ current, isLeftChild, parent, }) {
        var _a;
        const successor = current && this.findSuccessor(current);
        if (!successor) {
            return;
        }
        if ((current === null || current === void 0 ? void 0 : current.data[this.key]) === ((_a = this.root) === null || _a === void 0 ? void 0 : _a.data[this.key])) {
            this.root = successor;
        }
        else if (isLeftChild) {
            if (parent)
                parent.leftChild = successor;
        }
        else {
            if (parent)
                parent.rightChild = successor;
        }
        successor.leftChild = current === null || current === void 0 ? void 0 : current.leftChild;
    }
    findLowestNode() {
        let current = this.root;
        let parent = this.root;
        while (current) {
            parent = current;
            current = current.leftChild;
        }
        console.log('Lowest Node:');
        console.log(parent === null || parent === void 0 ? void 0 : parent.data);
        return parent;
    }
    findHighestNode() {
        let current = this.root;
        let parent = this.root;
        while (current) {
            parent = current;
            current = current.rightChild;
        }
        console.log('Highest Node:');
        console.log(parent === null || parent === void 0 ? void 0 : parent.data);
        return parent;
    }
}
exports.default = Tree;
const tree = new Tree("id");
tree.insert({ id: 1, name: "John", lastName: "Doe" });
tree.insert({ id: 2, name: "Jane", lastName: "Doe" });
tree.insert({ id: 3, name: "James", lastName: "Doe" });
tree.insert({ id: 4, name: "Jill", lastName: "Doe" });
tree.displayInOrder();
tree.findLowestNode();
tree.findHighestNode();
