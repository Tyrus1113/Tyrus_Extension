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
Array.prototype.sortFromNum = function (k) {
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
Array.prototype.getMaxOrMinItem = function (k) {
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

// 根据时间格式获取间隔时间
String.prototype.periodTime = function () {
    //把时间转换为时间戳
    var d = Date.parse(this.replace(/-/gi,'/'))
    var minute = 1000 * 60
    var hour = minute * 60
    var day = hour * 24
    var halfamonth = day * 15
    var month = day * 30
    // 获取当前时间戳
    var now = new Date().getTime()
    var diffValue = now - d
    if (diffValue < 0) {return}
    var monthC = diffValue / month
    var weekC = diffValue / (7 * day)
    var dayC = diffValue / day
    var hourC = diffValue / hour
    var minC = diffValue / minute
    var result = null
    if(monthC >= 1) {
        result = parseInt(monthC) + "月前"
    } else if (weekC >= 1) {
        result = parseInt(weekC) + "周前"
    } else if (dayC >= 1) {
        result = parseInt(dayC) + "天前"
    } else if (hourC >= 1) {
        result = parseInt(hourC) + "小时前"
    } else if (minC >= 1) {
        result = parseInt(minC) + "分钟前"
    } else {
        result = "刚刚"
    }
    return result
}

// 除去左右两边空格
String.prototype.trimBothSpace = function () {
    return this.replace(/(^\s*)|(\s*$)/g,'')
}
// 除去左边空格
String.prototype.trimLeftSpace = function () {
　　return this.replace(/(^\s*)/g,'')
}
// 除去右边空格
String.prototype.trimRightSpace = function () {
    return this.replace(/(\s*$)/g,'')
}
// 除去所有空格
String.prototype.trimAllSpace = function () {
    return this.replace(/\s/g,'')
}

// 数字区间排序
Array.prototype.numberSection = function () {
    var n = []
    for (var i = 0; i < this.length; i++) {
        if (this[i] == this[this.length-1]) {
            var r = this[this.length-1] + (this[1] - this[0])
            var p = this[this.length-1] + '-' + r
            n.push(p)
        } else {
            var p = this[i] + '-' + this[i+1]
            n.push(p)
        }
    }
    console.log(n);
}

// 对象是否为空 true:空 | false:非空
Object.prototype.isEmptyObj = function () {
    var e = 'Tyrus_ExtensionJS Error: 不是对象类型'  
    var s = Object.prototype.toString.call(this)
    if (s == '[object Object]') {
        for (var k in this) {
            if (this.hasOwnProperty(k)) {
                return false
            }
        }
    } else {
        return e
    }
    return true
}

// 数组合并 去重 排序
Array.prototype.concatUniqueSort = function (a1,a2) {
    if (arguments.length <= 0) {
        return 'Tyrus_ExtensionJS Error: 缺少参数'
    }
    
    // 先合并去重前两个数组
    function concatUniqueFunc (r1,r2) {
        // 深拷贝第一个数组 让原数组的值不会被改变
        var n = r1.concat()
        for (var i = 0; i < r2.length; i++) {
            if (n.indexOf(r2[i]) === -1) {
                // r2[i]到n中进行查找重复值 
                // 返回-1则无重复
                n.push(r2[i])
            }
        }
        return n
    }
    var s = concatUniqueFunc(this,a1)
    for (let i = 1; i < arguments.length; i++) {
        // 从第二个参数开始循环执行合并去重
        s = concatUniqueFunc(s,arguments[i])
    }

    var t = []
    for (var i = 0; i < s.length; i++) {
        t.push(s[i].replace('-',''))
    }
    console.log(t);


    // 给sort方法添加排序规则
    function sortFunc (a,b) { return a - b }

    var nt = t.sort(sortFunc)
    var nn = []
    for (var i = 0; i < nt.length; i++) {
        nn.push(nt[i].splice(5,0,'-')) // 错误出现在此行  尽快完成此方法
    }
    return nn
}

// 测试区 ------
var objTest = {}
var numArr = [6,3,4,2,1,7,0,5]
var strArr = ['a','b','c','d','e','f','g']
var strDate = "2018-02-22 12:11:00"
var strTest = ' 去除 两边 空白   '
var ar = [0,10,20,30,40,50]
// var arr1 = [1,3,5,7,9]  
// var arr2 = [2,1,6,5,10]  
// var arr3 = [3,10,7,1,15]
// var arr4 = [4,21,6,18,7]
var arr1 = ['2017-01','2017-02','2017-03','2017-04','2017-07','2018-01']  
var arr2 = ['2017-01','2017-03','2017-04','2017-05','2017-06']  
var arr3 = ['2017-01','2017-02','2017-03','2017-04']
console.log(objTest.isEmptyObj());
console.log(arr1.concatUniqueSort(arr2,arr3));
// console.log(Object.prototype.toString.call(numArr));
// console.log(strDate.periodTime());
// console.log(strTest)
// console.log(strTest.trimAllSpace());
// ar.numberSection()
// numArr.removeItem(2)
// numArr.sortFromNum()
// console.log(numArr)
// console.log(numArr.getMaxORMinItem(true))


// 测试区 end ------

// Tyrus_ExtensionJS end ----------