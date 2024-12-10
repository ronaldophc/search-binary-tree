export default class Node<T> {
    data: T;
    leftChild?: Node<T>;
    rightChild?: Node<T>;
  
    constructor(node: Partial<Node<T>>) {
      this.data = node.data as T;
      this.leftChild = node.leftChild;
      this.rightChild = node.rightChild;
    }
  }