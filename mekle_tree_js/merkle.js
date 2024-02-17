// pnpm install crypto-js

// 该错误是由于Node.js将JavaScript文件默认视为CommonJS模块，而不是ES模块。
// 而在你的代码中使用了ES模块的导入语法（import语句），因此出现了错误。
// import SHA256 from 'crypto-js/sha256';

const SHA256 = require("crypto-js/sha256");
const Getsha256HashCode = (data) => {
  let hash = SHA256(data).toString();
  console.log(hash);
  return hash;
};

class Node {
  constructor(balance, curHash, seedID) {
    this.balance = balance;
    this.curHash = curHash;
    this.seedID = seedID;
  }
}
class MerkleTree {
  constructor(balance, treeCore) {
    this.balance = balance;
    this.treeCore = treeCore.map(
      (item, index) => new Node(item, null, index)
    );
    // this.createTree();
  }
  // createTree(){
  //     let balance = this.balance;
  //     let index = 1;
  //     let treeCore = this.treeCore;
  //     let node = new Node(balance, index, treeCore);
  //     this.treeCore.push(node);
  //     console.log(this.treeCore);
  // }
}

let cur = 0;

const createTree = (balance, index, treeCore) => {
  // 设置起点
  if (index < 0 || index >= treeCore.length) {
    return;
  }
  // 左节点
  let l = createTree(balance, 2 * index, treeCore);
  let r = createTree(balance, 2 * index + 1, treeCore);
  // 右节点

  if (index > treeCore.length && cur < balance.length) {
    // treeCore[index] = new Node(
    //   balance[cur],
    //   Getsha256HashCode(balance[cur]),
    //   cur
    // );
    treeCore[index].seedID = cur;
    treeCore[index].balance = balance[cur];
    treeCore[index].curHash = Getsha256HashCode(balance[cur]);

    cur++;
  } else {
    if(r==null){
      r = l;}
      let metaHash = l + r;
      treeCore[index].curHash = Getsha256HashCode(metaHash);
  }

  return treeCore[index].curHash;
  
  // 如果不是叶子节点, 那么就通过其子节点来计算元哈希
  // 如果是叶子节点, 那么就将其作为叶子节点, 更新数据;
  // 数据有: balance,curHash ,seedID
  // treeCore的index位置, 的id是cur, 它的balance是balance[cur]

  // 最后返回根哈希
};

let balance = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
let treeCore = balance.map((item, index) => new Node(item, null, index));
let merkleNode = new MerkleTree(treeCore[1].curHash, treeCore);
// createTree(balance, 1, treeCore);
// treeCore
merkleNode 
let ans = createTree(balance, 1, treeCore);
ans
