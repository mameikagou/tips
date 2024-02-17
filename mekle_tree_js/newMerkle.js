// 数据每多一个2的幂次方, 就多算一次
// 叶子节点的值是数据的hash值
// 非叶子节点是左右子节点的hash值的hash值

const datas = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

const SHA256 = require("crypto-js/sha256");
const Getsha256HashCode = (data) => {
  let hash = SHA256(data).toString();
  console.log(hash);
  return hash;
};

class Node {
  constructor(data) {
    this.data = data;
    this.hash = Getsha256HashCode(this.data);
  }
}

class MerkleTree {
  constructor(datas) {
    this.datas = this.createTree(datas);
  }

  createTree(datas) {
    let dataNode = datas.map((data) => new Node(data));
    dataNode;
    while (dataNode.length > 1) {
      let nextLevel = [];
      for (let i = 0; i < dataNode.length; i += 2) {
        let left = dataNode[i];
        let right = (i%2!==0) ? dataNode[i + 1] : dataNode[i]; // 如果是奇数, 就取左节点
        let metaHash = Getsha256HashCode(left.hash + right.hash);
        let parentNode = new Node(metaHash);
        nextLevel.push(parentNode);
      }
      dataNode = nextLevel;
    }
    return dataNode[0];
  }
}

let tree = new MerkleTree(datas);
console.log(tree);
