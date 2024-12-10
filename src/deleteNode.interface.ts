import Node from "./node";

export interface DeleteNode<T> {
    current?: Node<T>;
    parent?: Node<T>;
    isLeftChild: boolean;
  }