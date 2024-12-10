import Node from "./node";

export default interface ITree<T> {
    find(value: number | string): Node<T> | undefined;
  
    insert(data: T): void;
  
    minimum(): T | undefined;
  
    maximum(): T | undefined;
  
    displayInOrder(): void;
  
    delete(value: number | string): boolean;
  }