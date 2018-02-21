// Tyrus_ExtensionJS

// 移除数组选中项
Array.prototype.removeItem = function (x) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == x) {
            this.splice(i,1)
            break
        }
    }
}
// 数字从大到小/从小到大排序
Array.prototype.sortNum = function (k) {
    // 若没有给定参数 则默认从小到大排序
    if (k == undefined) {k = false}
    var n = 0
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j <= i; j++) {
            if (k == true) {
                if (this[i] > this[j]) {
                    n = this[i]
                    this[i] = this[j]
                    this[j] = n
                }
            } else {
                if (this[i] < this[j]) {
                    n = this[i]
                    this[i] = this[j]
                    this[j] = n
                }
            }
        }
    }
    return this
}
// 取数组中最大项/最小项
Array.prototype.getMaxMinItem = function (k) {
    if (k == undefined) {k = false}
    var n = 0
    for (var i = 0; i < this.length; i++) {
        if (k == true) {
            if (this[i] > n) {
                n = this[i]
            }
        } else {
            if (this[i] < n) {
                n = this[i]
            }
        }
    }
    return n
}

var numArr = [6,3,4,2,1,7,0,5]
var strArr = ['a','b','c','d','e','f','g']

console.log(numArr)
// numArr.removeItem(2)
// numArr.sortNum()
// console.log(numArr)
console.log(numArr.getMaxMinItem())







// Tyrus_ExtensionJS end ----------