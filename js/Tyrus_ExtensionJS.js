/*
 * @Tyrus_ExtensionJS
 * @Author: Tyrus
 * @Date: 2018-03-14 16:09:25
 * @Last Modified by: Tyrus
 * @Last Modified time: 2018-06-19
 */
const Ty = {

    /**
     * 移除数组选中项
     * 
     * @method removeArrayItem
     * @param  {Array}  _a  原数组
     * @param  {Number} _x  删除项的数组索引
     * @return {Array}      返回 新数组
     */
    removeArrayItem (_a, _x) {

        if (typeof _x !== 'number') 
            return 'Ty_err: 参数不是Number类型'
        
        var n = []
        for (var i = 0; i < _a.length; i++) {
            if (i !== _x) n.push(_a[i])
        }
        
        return n
    },


    

    /**
     * 数字从大到小 或 从小到大排序
     * 
     * @method sortArrayNum
     * @param  {Array}   _a  原数组
     * @param  {Boolean} _x  true 从大到小 / 默认 false 从小到大
     * @return {Array}       返回 原数组
     */
    sortArrayNum (_a, _x) {

        if (_x != null && typeof _x !== 'boolean') 
            return 'Ty_err: 参数不是Bool类型'
    
        var _x = _x || false
    
        var n = 0
        for (var i = 0; i < _a.length; i++) {
            for (var j = 0; j <= i; j++) {
    
                if (_x == true) {
    
                    if (_a[i] > _a[j]) {
                        n = _a[i]
                        _a[i] = _a[j]
                        _a[j] = n
                    }
    
                } else {
                    
                    if (_a[i] < _a[j]) {
                        n = _a[i]
                        _a[i] = _a[j]
                        _a[j] = n
                    }
    
                }
            }
        }
        return _a
    },




    /**
     * 取数组中最大项 或 最小项
     * 
     * @method getArrayTheItem
     * @param  {Array}  _a  原数组
     * @param  {Array}  _x  true 取数组中最大值 / 默认 false 取数组中最小值
     * @return {Array}      返回 新数组
     */
    getArrayTheItem (_a, _x) {

        if (_x != null && typeof _x !== 'boolean') 
            return 'Ty_err: 参数不是Bool类型'
    
        var _x = _x || false
        
        // 返回值在初始化时应当赋值数组其中一项
        // 否则会在返回最小值时出现异常
        var n = _a[0]
    
        for (var i = 0; i < _a.length; i++) {
    
            if (_x == true) {
    
                if (_a[i] > n) {
                    n = _a[i]
                }
    
            } else {
    
                if (_a[i] < n) {
                    n = _a[i]
                }
    
            }
        }
        return n
    },




    /**
     * 存储Cookie
     * 注意：浏览器不会保留打开本地文件（file:///）的Cookie！
     * 
     * @method setTheCookie
     * @param  {String}  _n  cookie名称
     * @param  {String}  _v  cookie值
     * @param  {Number}  _e  过期时间 单位：天
     */
    setTheCookie (_n, _v, _e) {

        var d = new Date()
        d.setTime(d.getTime() + (_e * 24 * 60 * 60 * 1000))
        var expires = 'expires=' + d.toUTCString()
    
        document.cookie = _n + '=' + _v + '; ' + expires
    },




    /**
     * 获取Cookie
     * 注意：浏览器不会保留打开本地文件（file:///）的Cookie！
     * 
     * @method getTheCookie
     * @param  {String}  _n  cookie名称
     * @return {String}      返回 Cookie
     */
    getTheCookie (_n) {

        var _c = document.cookie.split(';')
    
        for (var i = 0; i < _c.length; i++) {
            var _t = _c[i].trim()
            _a = _t.split('=')[0]
    
            if (_a.indexOf(_n) == 0) {
                return decodeURIComponent(_t.split('=')[1])
            }
        }
    
        return ''
    },




    /**
     * 存储localStorage
     * 
     * @method setTheStorage
     * @param  {String}  _n  storage名称
     * @param  {Any}     _v  storage值
     */
    setTheStorage (_n, _v) {

        if (typeof _v !== 'string') 
            _v = JSON.stringify(_v)
        
        window.localStorage.setItem(_n, _v)
    },




    /**
     * 获取localStorage
     * 
     * @method getTheStorage
     * @param  {String}  _n  storage名称
     * @return {Any}        返回 storage
     */
    getTheStorage (_n) {

        return JSON.parse(window.localStorage.getItem(_n))
    },




     /**
     * 删除localStorage
     * 
     * @method getTheStorage
     * @param  {String}  _n  storage名称
     * @return {Any}        返回 storage
     */
    ty_removeStorage (_n) {

        return window.localStorage.removeItem(_n)
    },




    /**
     * 根据时间格式获取间隔时间
     * 
     * @example
     *          let strDate = "2018-08-22 12:11:00"
     *          Ty.periodTime(strDate)  // 1周前
     * @method periodTime
     * @param  {String}     "yyyy-mm-dd hh-mm-ss"
     * @return {String}     返回 文字叙述 "刚刚“ "N分钟前" "N天前"等
     */
    periodTime (_t) {

        //把时间转换为时间戳
        var d      = Date.parse(_t.replace(/-/gi,'/'))
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
        var _r = null

        if(monthC >= 1) {
            _r = parseInt(monthC) + "个月前"
        } else if (weekC >= 1) {
            _r = parseInt(weekC)  + "周前"
        } else if (dayC  >= 1) {
            _r = parseInt(dayC)   + "天前"
        } else if (hourC >= 1) {
            _r = parseInt(hourC)  + "小时前"
        } else if (minC  >= 1) {
            _r = parseInt(minC)   + "分钟前"
        } else {
            _r = "刚刚"
        }

        return _r
    },




    /**
     * 去除多余空格
     * 
     * @method  
     * @param  {String}     带有多余空格的字符串
     * @return {String}     返回 清除空格
     */
    // 除去左右两边空格
    trimBothSpace (_s) {

        return _s.replace(/(^\s*)|(\s*$)/g,'')
    },
    // 除去左边空格
    trimLeftSpace (_s) {

    　　return _s.replace(/(^\s*)/g,'')
    },
    // 除去右边空格
    trimRightSpace (_s) {

        return _s.replace(/(\s*$)/g,'')
    },
    // 除去所有空格
    trimAllSpace (_s) {

        return _s.replace(/\s/g,'')
    },




    /**
     * 添加数字区间
     * 
     * @method addNumberSection
     * @param  {Array}   _a    原数组
     * @param  {Number}  _x    数组中最后一项与最后附加项的值或区间
     * @return {Array}         返回 新数组
     */
    addNumberSection (_a, _x) {

        if (_x != null && typeof _x !== 'number' && typeof _x !== 'string') 
            return 'Ty_err: 参数不是Number类型'

        var n = []

        // 如果没有赋值参数 数组中附加项为最后一项 +1
        var _x = _x || 1

        for (var i = 0; i < _a.length; i++) {

            if (_a[i] == _a[_a.length - 1]) {

                var r = _a[_a.length - 1] + _x
                var p = _a[_a.length - 1] + '-' + r
                n.push(p)

            } else {

                var p = _a[i] + '-' + _a[i + 1]
                n.push(p)

            }
        }

        return n
    },




    /**
     * 对象是否为空
     * 
     * @method addNumberSection
     * @param  {Object}   _o    原对象
     * @return {Boolean}        返回 true 空 / false 非空
     */
    isEmptyObj (_o) {
        
        if (Object.prototype.toString.call(this) !== '[object Object]')
            return 'Ty_err: this不是对象类型'

        for (var k in _o) {
            if (_o.hasOwnProperty(k)) {
                return false
            }
        }

        return true
    },

} //  ---- **** Ty end **** ----




















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

    // 如果无参数则只去重调用者
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




// 数组动态去重
/* 
    异步调用方法
*/
var _init = []
var _el = document.getElementsByClassName('_button')

// 获取所有相同class的元素数组绑定事件
for (var i = 0; i < _el.length; i++) {

    _el[i].onclick = function () {
        
        _init.push(this.innerHTML)

        console.log(ty_dynamicUniqueSort(_init))
    }
}
/* 
    参数1：数组 异步获取到的字段
*/
function ty_dynamicUniqueSort (_a) {

    var _init = []

    for (var i = 0; i < _a.length; i++) {

        if (_init.indexOf(_a[i]) !== -1) 
            _init.splice(_init.indexOf(_a[i]), 1)
        
        _init.push(_a[i])
    }

    return _init
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
/* 
    无参数
*/
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
Array.prototype.ty_getSameItems = function () {

    return this.reduce(function (obj, name) {

        obj[name] = obj[name] ? obj[name] + 1 : 1

        return obj

    }, {})
}





// 基于promise封装ajax
/* 
    参数1: url
*/
const getJSON = function (url) {

    const promise = new Promise(function (resolve, reject) {

        const handler = function () {
            if(this.readyState !== 4) return
            this.status === 200 
            ? resolve(this.response) 
            : reject(new Error(this.statusText))
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
    // console.log(res)
})
.catch(err => {
    // console.log(err)
})

// 原生fetch
fetch('https://static.segmentfault.com/sponsor/20180731.json', {
    method: 'GET',
    mode: 'cors',
    // credentials: 'include' // 强制提交cookie
})
.then(res => {
    return res.json()
})
.then(res => {
    // console.log(res)
})
.catch(err => {
    // console.log(err)
})




// 测试区 如使用此Ty库文件 请移除本行之后的代码段 ------
var cars = ['BMW', 'Benz', 'Benz', 'Tesla', 'BMW', 'Cadillac']
var numArr = [6000,3000,4000,2000,1000,7000]
var strArr = ['a','b','c','d','e','f','g']
var strDate = "2018-08-22 12:11:00"
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
// console.log(cars.ty_getSameItems())

console.log(Ty.removeArrayItem(cars, 3))
console.log(Ty.sortArrayNum(arr1, true))
console.log(Ty.getArrayTheItem(arr5, true))
console.log(Ty.periodTime(strDate))
console.log(Ty.addNumberSection(numArr, 1000))
console.log(Ty.isEmptyObj(obj0))

// 测试区 end ------
// ⚡
// Tyrus_ExtensionJS end -------------------------