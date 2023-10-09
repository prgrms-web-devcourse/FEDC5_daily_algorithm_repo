class Node {
    constructor(value = "") {
        this.value = value;
        this.children = new Map();
    }
}

class Trie {
    constructor() {
        this.root = new Node();
    }

    insert(string) {
        let currentNode = this.root;

        for (const char of string) {
            if (!currentNode.children.has(char)) {
                currentNode.children.set(
                    char,
                    new Node(currentNode.value + char)
                );
            }
            currentNode = currentNode.children.get(char);
        }
    }

    has(string) {
        let currentNode = this.root;

        for (const char of string) {
            if (!currentNode.children.has(char)) {
                // 리프 노드면서 루트 노드가 아니면 접두어
                if (
                    currentNode.children.size == 0 &&
                    currentNode !== this.root
                ) {
                    return true;
                }
                return false;
            }
            currentNode = currentNode.children.get(char);
        }

        return true;
    }
}

function solution(phone_book) {
    const trie = new Trie();
    for (const phone of phone_book) {
        if (!trie.has(phone)) {
            trie.insert(phone);
        } else {
            return false;
        }
    }
    return true;
}
