// import { quickSort, selectionSort } from "./sort";
const sort = require('./sort');

const testData = [2, 3, 6, 12, 50, 7, 3, 10, 9, 6, 1, 3, 2];

console.log(`快速排序结果：${sort.quick(testData.concat())}`);
console.log(`选择排序结果：${sort.selection(testData.concat())}`);
