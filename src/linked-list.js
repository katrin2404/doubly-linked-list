const Node = require('./node');

class LinkedList {

    constructor() {
        return this.clear();
    }

    append(data) {
        const next = new Node(data, this._tail);
        if (!this._head) {
            this._head = next;
        }
        if (this._tail) {
            this._tail.next = next;
        }
        this._tail = next;
        return this;
    }

    head() {
        return this._head && this._head.data;
    }

    tail() {
        return this._tail && this._tail.data;
    }

    _at(index) {
        let node = this._head;
        let i = 0;
        while (i < index) {
            if (!(node = node.next)) {
                return null;
            }
            i++;
        }
        return node;
    }

    at(index) {
        const node = this._at(index);
        return node && node.data;
    }

    insertAt(index, data) {
        const current = this._at(index);
        if (!current) {
            //there is no element for the given index
            const last = this._at(index - 1);
            if (last || index === 0) {
                //but there is a previous element or list is empty
                this.append(data);
            }
            //otherwise just can't insert
        } else {
            //inserting before the current node
            const node = new Node(data, null, current);
            if (current.prev) {
                //current node is not head
                current.prev.next = node;
                node.prev = current.prev;
            } else {
                //current node is the head of the list
                node.prev = current;
                this._head = node;
            }
            current.prev = node;
        }
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this._head = null;
        this._tail = null;
        return this;
    }

    deleteAt(index) {
        const node = this._at(index);
        if (node) {
            const {prev, next} = node;

            if (!next) {
                this._tail = prev;
            } else {
                next.prev = prev;
            }

            if (!prev) {
                this._head = next;
            } else {
                prev.next = next;
            }
        }
        return this;
    }

    reverse() {
        let node = this._tail;
        this._head = node;
        this._tail = null;
        while (node) {
            const {prev, next} = node;
            node.next = prev;
            node.prev = next;
            if (!prev) {
                this._tail = node;
            }
            node = prev;
        }
        return this;
    }

    indexOf(data) {
        let index = 0;
        let node = this._head;
        while (node) {
            if (node.data === data) {
                return index;
            }
            if (node.next) {
                node = node.next;
                index++;
            } else {
                return -1;
            }
        }
        return -1;
    }

    get length() {
        let length = 0;
        let node = this._head;
        while (node) {
            length++;
            node = node.next;
        }
        return length;
    }

}
module.exports = LinkedList;