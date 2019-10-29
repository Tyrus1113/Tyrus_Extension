/*
 * @Tyrus_Extension
 * @Author: Tyrus
 */

//  ---- **** Ty start **** ----
var Ty = {

    /**
     * 取数组中最大值
     * @method getMax
     *
     * @example
     *  Ty.getMax([1, 10.1, 3, 4])
     * 
     * @param  {Array}  _a 原数组
     * @return {Array}     返回 最大值
     */
    getMax: _a => Math.max(..._a),

    // 取数组中最小值
    getMin: _a => Math.min(..._a),

    /**
     * 检查数组各项是否相等
     * @method isEqualItems
     *
     * @example
     *  Ty.isEqualItems([1, 1, 1])
     * 
     * @param  {Array}   _arr  需要检查的数组
     * @return {Boolean}       返回 是否相等
     */
    isEqualItems: _arr => _arr.every(_i => _i === _arr[0]),

    /**
     * 获取数组内的平均值
     * @method averageItems
     * 
     * @example
     *  Ty.averageItems([1, 2, 3, 4, 5])
     *
     * @param  {Array}   _arr  需要检查的数组
     * @return {Number}        返回 平均值
     */
    averageItems: _arr => _arr.reduce((_t, _i) => _t + _i, 0) / _arr.length,

    /**
     * 获取数组内其中一项出现的次数
     * @method hasItemCount
     *
     * @example
     *  Ty.hasItemCount([1, 2, 3, 4, 5, 1, 4], 4)
     * 
     * @param  {Array}                     _arr  需要检查的数组
     * @param  {Number/String/Boolean}     _tar  目标值
     * @return {Number}                          返回 次数
     */
    hasItemCount: (_arr, _tar) => _arr.reduce((_t, _i) => (_i === _tar ? _t + 1 : _t), 0),

    /**
     * 递归展平数组
     * @method flattenItems
     *
     * @example
     *  Ty.flattenItems([1, 2, 3, [5, ['test'], 7, [9, 10]]])
     * 
     * @param  {Array}  _arr  需要检查的数组
     * @return {Number} 返回   展平后的数组
     */
    flattenItems: _arr => [].concat(..._arr.map(_i => Array.isArray(_i) ? Ty.flattenItems(_i) : _i)),

    /**
     * 差集
     * @method difference
     *
     * @example
     *  Ty.difference([1, 2, 3, 5], [1, 2, 4])
     * 
     * @param  {Array}  _a  需要检查的数组
     * @param  {Array}  _b  需要检查的数组
     * @return {Array} 返回  差异值的数组
     */
    difference: (_a, _b) => _a.filter(_i => _b.indexOf(_i) === -1),

    /**
     * 交集
     * @method intersection
     *
     * @example
     *  Ty.intersection([1, 2, 3], [1, 2, 4])
     *  
     * @param  {Array}  _a  需要检查的数组
     * @param  {Array}  _b  需要检查的数组
     * @return {Array} 返回  相同值的数组
     */
    intersection: (_a, _b) => _a.filter(_i => _b.indexOf(_i) !== -1),
    
    /**
     * 数组与对象数组去重
     * @method removeDuplicate
     * 
     * @example
     *  Ty.removeDuplicate(ARR, 'name')
     *  Ty.removeDuplicate(ARR01)
     *
     * @param  {Array / Array-Object} _a  需去重的数组(或数组对象)
     * @param  {String}               _k  可无限添加(非必填)
     * @return {Array}                    返回 去重后的数组
     */
    removeDuplicate: (_a, _k) => {

        const arr = []
        const obj = {}

        _a.forEach(item => {

            const attr = _k ? item[_k] : item

            if (!obj[attr]) {
                obj[attr] = attr
                arr.push(item)
            }
        })
        return arr
    },

    /**
     * 深拷贝引用数据类型
     * @method deepClone
     *
     * @example
     *  Ty.deepClone(ARR)
     * 
     * @param  {object} _x  原对象 Object Array Function 等
     * @return {object}     返回 新对象
     */
    deepClone: _x => JSON.parse(JSON.stringify(_x)),

    /**
     * 只执行一次的函数
     * @method onceCall
     *
     * @example
     *  ELEMENT.addEventListener('click', Ty.onceCall((e) => {
     *      console.log('onceFunc called just once:', e)
     * }))
     * @param  {Function} _fn  需要执行的操作
     * @return {Function}      返回 唯一一次方法调用
     */
    onceCall: _fn => {

        let lock = false

        return () => {
            if (!lock) {
                lock = true
                // eslint-disable-next-line no-undef
                _fn.call(this, arguments)
            }
        }
    },

    /**
     * 校验数据类型
     * @method is
     *
     * @param  {String}  _t    需要校验的数据类型
     * @param  {ALL}     _v    需要校验的值
     * 
     */
    is: (_t, _v) => ![undefined, null].includes(_v) && _v.constructor === _t,

    /**
     * 比较两个对象是否相同
     * @method isEqualObj
     *
     * @param  {Object}  _o1  需要对比的对象
     * @param  {Object}  _o2  需要对比的对象
     * @return {Boolean}      返回 是否相同
     */
    isEqualObj: (_o1, _o2) => {
        var o1 = Object.keys(_o1)
        var o2 = Object.keys(_o2)
        if (o1.length !== o2.length) return false
        
        for (var i = 0; i < o1.length; i++) {
    
            var key = o1[i]
            if (_o1[key] !== _o2[key]) return false
        }
    
        return true
    },

    /**
     * 对象是否为空
     * @method isEmptyObj
     *
     * @param  {Object}   _o  原对象
     * @return {Boolean}      返回 true 非空 / false 空
     */
    isEmptyObj: _o => Object.keys(_o).length !== 0,

    /**
     * 去除多余空格
     * @method
     *
     * @param  {String}     带有多余空格的字符串
     * @return {String}     返回 清除空格
     */
    // 除去左边空格
    trimLeft: _s => _s.replace(/(^\s*)/g, ''),

    // 除去右边空格
    trimRight: _s => _s.replace(/(\s*$)/g, ''),

    // 除去所有空格
    trimAll: _s => _s.replace(/\s/g, ''),

    /**
     * 是否含有class
     * @method hasClass
     *
     * @param  {DOM}     _d    DOM元素
     * @param  {String}  _c    class名称
     * @return {Boolean}       返回是否含有class
     */
    hasClass: (_d, _c) => _d.classList.contains(_c),

    /**
     * 存储Cookie
     * 注意：浏览器不会保留打开本地文件（file:///）的Cookie！
     * @method setCookie
     *
     * @param  {String}  _n  cookie名称
     * @param  {String}  _v  cookie值
     * @param  {Number}  _e  过期时间 单位：天
     */
    setCookie: (_n, _v, _e) => {

        const d = new Date()
        d.setTime(d.getTime() + (_e * 24 * 60 * 60 * 1000))
        const expires = `expires=${d.toUTCString()}`

        document.cookie = `${_n}=${_v};${expires}`
    },

    /**
     * 获取Cookie
     * 注意：浏览器不会保留打开本地文件（file:///）的Cookie！
     * @method getCookie
     *
     * @param  {String}  _n  cookie名称
     * @return {String}      返回 Cookie
     */
    getCookie: _n => {

        let _c = document.cookie.split(';')
        let _a = ''

        for (let i = 0; i < _c.length; i++) {

            _a = _c[i].trim().split('=')
            // 使用indexOf方法查找会出现问题
            if (_a[0] === _n) {
                return decodeURIComponent(_a[1])
            }
        }

        return ''
    },

    /**
     * 从url中获取参数
     * @method getUrlParam
     *
     * @param  {String} _n     DOM元素
     * @return {Object / null} 返回所有参数的集合 无则返回null
     */
    getUrlParam: _n => decodeURIComponent(new URLSearchParams(location.search).get(_n)),

    /**
     * 数字添加千分符
     * @method addThousandMark
     *
     * @example
     *  Ty.addThousandMark(30000)
     * 
     * @param  {Number / String} _m   原数字
     * @return {String}               返回 新数组
     */
    addThousandMark: _m => _m.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,'),

    /**
     * 删除字符串中的xml/html标签
     * @method delHTMLTags
     *
     * @example
     *  Ty.delHTMLTags('<div id="popupMask"><a href="#">test text</a></div>')
     *  
     * @param  {String}  _s  html / xml 标签
     * @return {String} 返回  移除标签后的字符串
     */
    delHTMLTags: _s => _s.replace(/<[^>]*>/g, ''),

    /**
     * 首字母大写
     * @method capitalize
     *
     * @example
     *  Ty.capitalize('tyrus')
     *  
     * @param  {Array}  [_f, ..._r] 首字母 和 拆分后的剩余字母
     * @return {String} 返回        处理后的字符串
     */
    capitalize: ([_f, ..._r]) => _f.toUpperCase() + _r.join(''),

    /**
     * 每个单词首字母大写
     * @method capitalizeAllWords
     *
     * @example
     *  Ty.capitalizeAllWords('patience. my old friend.')
     *  
     * @param  {String}  _s     原字符串
     * @return {String} 返回    处理后的字符串
     */
    capitalizeAllWords: _s => _s.replace(/\b[a-z]/g, _i => _i.toUpperCase()),

    /**
     * 获取字节长度
     * @method getByteLength
     *
     * @example
     *  Ty.getByteLength('abcdefg')
     *  Ty.getByteLength('中文测试')
     *  
     * @param  {String}  _s     原字符串
     * @return {String} 返回    处理后的字符串
     */
    getByteLength: _s => new Blob([_s]).size

} //  ---- **** Ty end **** ----

export default Ty
