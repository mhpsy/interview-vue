import {useRoute} from "vue-router";

interface Node {
    id: number
    label: string
    children: Array<Node>
}

function createNode(id: number, label: string): Node {
    return {
        id,
        label,
        children: []
    };
}

let currentId = 100; // Starting ID

function randomChineseChar() {
    const unicodeStart = 0x4e00;
    const unicodeEnd = 0x9fff;
    return String.fromCharCode(Math.floor(Math.random() * (unicodeEnd - unicodeStart) + unicodeStart));
}

function randomChineseName() {
    const nameLength = Math.floor(Math.random() * 2) + 2; // Name length of 2 or 3 characters
    let name = '';
    for (let i = 0; i < nameLength; i++) {
        name += randomChineseChar();
    }
    return name;
}

function createTree(maxDepth: number, depth = 1): null | Node {
    if (depth > maxDepth) {
        return null;
    }

    const node = createNode(currentId++, randomChineseName() + '部门');
    const childrenCount = Math.floor(Math.random() * 5) + 1;

    for (let i = 0; i < childrenCount; i++) {
        const childNode = createTree(maxDepth, depth + 1);
        if (childNode) {
            node.children.push(childNode);
        }
    }

    return node;
}

interface User {
    userId: number
    nickName: string
    deptId: number
    deptName: string
}

function generateUsersFromTree(node: Node, usersList: User[] = []) {
    const num = Math.floor(Math.random() * 5) + 1;

    for (let i = 0; i < num; i++) {
        usersList.push({
            userId: currentId++,
            nickName: randomChineseName(),
            deptId: node.id,
            deptName: node.label,
        });
    }

    if (node.children) {
        for (const child of node.children) {
            generateUsersFromTree(child, usersList);
        }
    }

    return usersList;
}

export {
    createTree,
    generateUsersFromTree,
}

export type {
    Node,
    User,
}