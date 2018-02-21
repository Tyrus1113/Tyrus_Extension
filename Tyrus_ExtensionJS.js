// Tyrus_ExtensionJS

// 移除数组选中项
Array.prototype.removeItem = function (x) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == x) {
            this.splice(i,1)
            break
        } else {
            console.log('Tyrus_ExtensionJS_Error: ')
        }
    }
}
// 数字从大到小/从小到大排序
Array.prototype.sortNum = function (k) {
    if (k == undefined) {k = false}
    var newVal = 0
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j <= i; j++) {
            if (k == true) {
                if (this[i] > this[j]) {
                    newVal = this[i]
                    this[i] = this[j]
                    this[j] = newVal
                }
            } else {
                if (this[i] < this[j]) {
                    newVal = this[i]
                    this[i] = this[j]
                    this[j] = newVal
                }
            }
        }
    }
    return this
}
// 取数组中最大项/最小项
Array.prototype.getMaxMinItem = function (k) {
    if (k == undefined) {k = false}
    var newVal = 0
    for (var i = 0; i < this.length; i++) {
        if (k == true) {
            if (this[i] > newVal) {
                newVal = this[i]
            }
        } else {
            if (this[i] < newVal) {
                newVal = this[i]
            }
        }
    }
    return newVal
}

var numArr = [0,1,2,3,4,5,6,7]
var strArr = ['a','b','c','d','e','f','g']

console.log(numArr)
// numArr.removeItem(2)
// numArr.sortNum(true)
console.log(numArr)
console.log(numArr.getMaxMinItem(true))







// Tyrus_ExtensionJS end ----------