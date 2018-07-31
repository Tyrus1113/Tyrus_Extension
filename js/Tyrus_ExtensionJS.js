/*
 * @Tyrus_ExtensionJS
 * @Author: Tyrus
 * @Date: 2018-03-14 16:09:25
 * @Last Modified by: Tyrus
 * @Last Modified time: 2018-06-19
 */


// 移除数组选中项
/* 
    此方法返回新数组
    避免splice改变原数组
    参数1：数值 索引
*/
Array.prototype.ty_removeTheItem = function (_x) {

    if (typeof _x !== 'number') 
        return 'Ty_err: 参数不是Number类型'
    
    var n = []
    for (var i = 0; i < this.length; i++) {
        if (i !== _x) n.push(this[i])
    }
    
    return n
}




// 数字从大到小/从小到大排序
/* 
    此方法会改变原始数组
    参数1：true 从大到小排序
          默认/false 从小到大排序
*/
Array.prototype.ty_sortFromNum = function (_x) {

    if (_x != null && typeof _x !== 'boolean') 
        return 'Ty_err: 参数不是Bool类型'

    var _x = _x || false

    var n = 0
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j <= i; j++) {

            if (_x == true) {

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
/* 
    此方法不会改变原始数组
    参数1：true/ 取数组中最大值
           默认/false/ 取数组中最小值
*/
Array.prototype.ty_getMaxOrMinItem = function (_x) {

    if (_x != null && typeof _x !== 'boolean') 
        return 'Ty_err: 参数不是Bool类型'

    var _x = _x || false
    
    // 返回值在初始化时应当赋值数组其中一项
    // 否则会在返回最小值时出现异常
    var n = this[0]

    for (var i = 0; i < this.length; i++) {

        if (_x == true) {

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




// 本地存储
/* 
    注意：浏览器不会保留打开本地文件（file:///）的Cookie！
    参数1：cookie名称
    参数2：cookie值
    参数3：过期时间 Number类型 单位：天
*/
// 存储Cookie
function ty_setCookie (_n, _v, _e) {

    var d = new Date()
    d.setTime(d.getTime() + (_e * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()

    document.cookie = _n + '=' + _v + '; ' + expires
}

// 获取Cookie
function ty_getCookie (_n) {

    var _c = document.cookie.split(';')

    for (var i = 0; i < _c.length; i++) {
        var _t = _c[i].trim()
        _a = _t.split('=')[0]

        if (_a.indexOf(_n) == 0) {
            return decodeURIComponent(_t.split('=')[1])
        }
    }

    return ''
}

// 存储localStorage
function ty_setStorage (_n, _t) {

    if (typeof _t !== 'string') 
        _t = JSON.stringify(_t)
    
    window.localStorage.setItem(_n, _t)
}

// 获取localStorage
function ty_getStorage (_n) {

    return JSON.parse(window.localStorage.getItem(_n))

}

// 删除localStorage
function ty_removeStorage (_n) {

    return window.localStorage.removeItem(_n)

}




// 根据时间格式获取间隔时间
/* 
    此方法不会改变原始字符串
    时间格式：yyyy-mm-dd hh:mm:ss
    无参数
*/
String.prototype.ty_periodTime = function () {

    //把时间转换为时间戳
    var d      = Date.parse(this.replace(/-/gi,'/'))
    var minute = 1000 * 60
    var hour   = minute * 60
    var day    = hour * 24
    var month  = day * 30
    
    // 获取当前时间戳
    var now = new Date().getTime()
    var diffValue = now - d
    if (diffValue < 0) {return}
    var monthC = diffValue / month
    var weekC  = diffValue / (7 * day)
    var dayC   = diffValue / day
    var hourC  = diffValue / hour
    var minC   = diffValue / minute
    var result = null

    if(monthC >= 1) {
        result = parseInt(monthC) + "月前"
    } else if (weekC >= 1) {
        result = parseInt(weekC)  + "周前"
    } else if (dayC  >= 1) {
        result = parseInt(dayC)   + "天前"
    } else if (hourC >= 1) {
        result = parseInt(hourC)  + "小时前"
    } else if (minC  >= 1) {
        result = parseInt(minC)   + "分钟前"
    } else {
        result = "刚刚"
    }

    return result
}




// 去除空格
/* 
    以下trim方法不会改变原始字符串
    无参数
*/
// 除去左右两边空格
String.prototype.ty_trimBothSpace = function () {

    return this.replace(/(^\s*)|(\s*$)/g,'')

}

// 除去左边空格
String.prototype.ty_trimLeftSpace = function () {

　　return this.replace(/(^\s*)/g,'')

}

// 除去右边空格
String.prototype.ty_trimRightSpace = function () {

    return this.replace(/(\s*$)/g,'')

}

// 除去所有空格
String.prototype.ty_trimAllSpace = function () {

    return this.replace(/\s/g,'')

}




// 数字区间排序
/* 
    此方法不会改变原始数组
    参数1：数组中最后一项与最后附加项的值或区间    
*/
Array.prototype.ty_numberSection = function (_x) {

    if (_x != null && typeof _x !== 'number' && typeof _x !== 'string') 
        return 'Ty_err: 参数不是Bool类型'

    var n = []

    // 如果没有赋值参数 数组中附加项为最后一项+1
    var _x = _x || 1

    for (var i = 0; i < this.length; i++) {

        if (this[i] == this[this.length - 1]) {

            var r = this[this.length - 1] + _x
            var p = this[this.length - 1] + '-' + r
            n.push(p)

        } else {

            var p = this[i] + '-' + this[i + 1]
            n.push(p)

        }
    }

    return n
}




// 对象是否为空
/* 
    true:空 / false:非空
*/
Object.prototype.ty_isEmptyObj = function () {
    
    if (Object.prototype.toString.call(this) !== '[object Object]')
        return 'Ty_err: this不是对象类型'

    for (var k in this) {
        if (this.hasOwnProperty(k)) {
            return false
        }
    }

    return true
}




// 数组合并去重
/* 
    此方法会改变原始数组
    参数1：数组 需要合并的第一项
    参数2：数组 需要合并的第二项
    参数n：数组 需要合并项可多次添加
    无参数：只给调用者去重
*/
Array.prototype.ty_concatUniqueArray = function (_a1, _a2) {

    for (var i = 0; i < arguments.length; i++) {
        if (!Array.isArray(arguments[i])) 
            return 'Ty_Err:第'+ (i+1) +'个参数不是Array类型'
    }

    // 如果无参数则去重调用者
    if (arguments.length == 0) {

        var o = []
        for (var i = 0; i < this.length; i++) {
            if (o.indexOf(this[i]) === -1) o.push(this[i])
        }

        return o
    }

    // 进入方法先去重调用者
    var self = []
    for (var i = 0; i < this.length; i++) {
        if (self.indexOf(this[i]) === -1) self.push(this[i])
    }

    // 合并去重两个数组
    function concatUniqueFunc (r1, r2) {

        // 复制第一个数组 让原数组的值不被改变
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
    var s = concatUniqueFunc(self, _a1)

    // 从第二个参数开始循环执行合并去重
    for (var i = 1; i < arguments.length; i++) {
        s = concatUniqueFunc(s, arguments[i])
    }

    return s
}




// 时间字段排序
/* 
    此方法不会改变原始数组
    时间格式：yyyy-mm
    参数1：true 从近到远排序
           默认/false 从远到近排序
*/
Array.prototype.ty_yearMonthSort = function (_x) {

    if (typeof _x !== 'boolean') return 'Ty_err: 参数不是Bool类型'

    var t = []
    for (var i = 0; i < this.length; i++) {
        t.push(this[i].replace('-', ''))
    }

    // 给sort方法添加排序规则
    var nt = t.sort(function (a, b) {
        if (_x == true) {
            return b - a
        } else {
            return a - b
        }
    })

    var nn = []
    for (var i = 0; i < nt.length; i++) {
        var a = nt[i].replace(/(.{4})(.*)/ , '$1-$2')
        nn.push(a)
    }

    return nn
}




// 数组数字添加千分符
/* 
    此方法不会改变原始数组
    无参数
*/
Array.prototype.ty_addThousandMark = function () {

    var n = []
    for (var i = 0; i < this.length; i++) {
        var _str = this[i].toString()
        _str = _str.replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,')

        n.push(_str)
    }

    return n
}




// 深拷贝引用数据类型
/* 
    此方法不会改变原始对象
    无参数
*/
Object.prototype.ty_deepCloneObj = function () {

    var _o = this instanceof Array ? [] : {}

    if (this && typeof this === 'object') {
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                // 判断类型 递归复制调用者的子元素
                if (this[key] && typeof this[key] === 'object') {
                    _o[key] = deepCloneObj(this[key])
                } else {
                    _o[key] = this[key]
                }
                
            }
        }
    }
    return _o
    
    // 简化方式
    // return JSON.parse(JSON.stringify(this))
}




// 一次性函数
var onceFunc = function () {

    console.log('Just once')
    
    onceFunc = function() {
        
        console.log('Miss')
    }
}




// 通用验证
/*
    schema 验证规则
    validate 通用验证函数
*/
var schema = {
    first : {
        required : true
    },
    second : {
        required : true
    }
}
function validate (schema, value) {

    for (var field in schema) {

        if (schema[field].required) {

            if (!value[field]) {
                return false
            }
        }
    }
    return true
}
// 验证
console.log(validate(schema, {
    first : 'Bruce',
    second: 'Wayne'
}));




// 统计数组中相同项的个数
/* 
    此方法不会改变原始对象
    无参数
*/
Array.prototype.getSameItems = function () {

    return this.reduce(function (obj, name) {

        obj[name] = obj[name] ? obj[name] + 1 : 1

        return obj

    }, {})
}





// 基于promise封装ajax
const getJSON = function (url) {
    const promise = new Promise(function (resolve, reject) {
        const handler = function () {
            if(this.readyState !== 4) return
            this.status === 200 ? resolve(this.response) : reject(new Error(this.statusText))    
        }
        const client = new XMLHttpRequest()
        client.open('GET', url)
        client.onreadystatechange = handler
        client.responseType = 'json'
        client.setRequestHeader('Accept', 'application/json')
        client.send()
    })
    return promise
}

getJSON('https://static.segmentfault.com/sponsor/20180731.json')
.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err)
})

// 原生fetch
fetch('https://static.segmentfault.com/sponsor/20180731.json', {
    method: 'GET',
    mode: 'cors',
    // credentials: 'include' // 强制提交cookie
})
.then(response => {
    return response.json()
})
.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err)
})





// 测试区 如果使用此Ty库文件 请移除本行之后的代码段 ------
var cars = ['BMW', 'Benz', 'Benz', 'Tesla', 'BMW', 'Toyota']
var numArr = [6000,3000,4000,2000,1000,7000]
var strArr = ['a','b','c','d','e','f','g']
var strDate = "2018-02-22 12:11:00"
var strTest = ' 去除 两边 空白   '
var arr0 = [0,10,20,30,40,50]
var obj0 = {
    a : 0,
    b : 1
}
var arr1 = [1,3,5,7,9,1,-1]  
var arr2 = [2,1,6,5,10]
var arr3 = [3,10,7,1,15]
var arr4 = [4,21,6,18,7]
var arr5 = [6,22,32,19,4]
var arr6 = 'asdasdasd'
var arr7 = ['2017-03','2017-04','2017-07','2018-01','2017-04']
var arr8 = ['2017-01','2017-03','2017-04','2017-05','2017-06']
var arr9 = ['2017-01','2017-02','2017-08','2017-09']
var ar10 = [10]

let color = ['red', 'blue', 'green']
console.log(cars.getSameItems())


// 测试区 end ------
// ⚡
// Tyrus_ExtensionJS end -------------------------