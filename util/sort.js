
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const base = arr.pop();
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= base) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([base], quickSort(right));
}

function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[i]) {
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

module.exports.quick = quickSort;
module.exports.selection = selectionSort;
