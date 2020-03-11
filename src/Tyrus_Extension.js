/*
 * @Trus_Extension
 * @Author: Trus
 */

//  ---- **** T start **** ----
const T = {

    /**
     * 取数组中最大值
     * @method getMax
     *
     * @example
     *  T.getMax([1, 10.1, 3, 4])
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
     *  T.isEqualItems([1, 1, 1])
     * 
     * @param  {Array}   _arr  需要检查的数组
     * @return {Boolean}       返回 是否相等
     */
    isEqualItems: _arr => _arr.every(_i => _i === _arr[0]),

    /**
     * 删除数组中符合条件的值 (基础数据类型)
     * @method delItem
     *
     * @example
     *  T.delItem([1, 2, 3, 4], 3)
     * 
     * @param  {Array}                  _arr   需要检查的数组
     * @param  {Number/String/Boolean}  _name  需要删除的值
     * @return {Array}                       返回 删除指定值后的新数组
     */
    delItem: (_arr, _name) => _arr.filter(_i => _i !== _name),

    /**
     * 获取数组内的平均值
     * @method averageItems
     * 
     * @example
     *  T.averageItems([1, 2, 3, 4, 5])
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
     *  T.hasItemCount([1, 2, 3, 4, 5, 1, 4], 4)
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
     *  T.flattenItems([1, 2, 3, [5, ['test'], 7, [9, 10]]])
     * 
     * @param  {Array}  _arr  需要检查的数组
     * @return {Number} 返回   展平后的数组
     */
    flattenItems: _arr => [].concat(..._arr.map(_i => Array.isArray(_i) ? T.flattenItems(_i) : _i)),

    /**
     * 递归展平树结构
     * @method flattenTree
     *
     * @example
     *  T.flattenTree(ARR06)
     * 
     * @param  {Array}  _arr  需要检查的数组
     * @param  {Number} _i    层级数
     * @return {Array} 返回   展平后的数组
     */
    flattenTree: (_arr, _i = 0) => _arr.reduce((ar, { id, title, children = [] }) => ar.concat([{ id, title }], T.flattenTree(children, _i + 1)), []),

    /**
     * 差集
     * @method difference
     *
     * @example
     *  T.difference([1, 2, 3, 5], [1, 2, 4])
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
     *  T.intersection([1, 2, 3], [1, 2, 4])
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
     *  T.removeDuplicate(ARR, 'name')
     *  T.removeDuplicate(ARR01)
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
     *  T.deepClone(ARR)
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
     *  ELEMENT.addEventListener('click', T.onceCall((e) => {
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
     * @example 
     *  暂时对象中的值不可包含 NaN，Array，Object
     * 
     * @param  {Object}  _o1  需要对比的对象
     * @param  {Object}  _o2  需要对比的对象
     * @return {Boolean}      返回 是否相同
     */
    isEqualObj: (_o1, _o2) => {
        const o1 = Object.keys(_o1)
        const o2 = Object.keys(_o2)
        if (o1.length !== o2.length) return false
        
        for (let i = 0; i < o1.length; i++) {
            const key = o1[i]
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
    isEmptyObj: _o => Object.keys(_o).length > 0,

    /**
     * 数组横向纵向相互转换
     * @method transformArrayVerticallyAndHorizontally
     * 
     * @example
     *    const OBJ01 = {
     *        arr1: [163, 27, 191, 1515],
     *        arr2: [179, 33, 195, 0],
     *        arr3: [3351, 6272, 1717, 0],
     *        arr4: [36, 71, 673, 533],
     *        arr5: [0, 0, 1633, 0]
     *    }
     *   T.transformArrayVerticallyAndHorizontally(OBJ01)
     * 
     * @param  {Object}   _o  原对象
     * @return {Array}        返回 树结构
     */
    transformArrayVerticallyAndHorizontally: (_o) => {
        
        const vals = Object.values(_o)
        const newArr = []
        for (let i = 0; i < vals[0].length; i++) {
            const arr = []
            for (let j = 0; j < vals.length; j++) {
                arr.push(vals[j][i])
            }
            newArr.push(arr)
        }
        return newArr
    },

    /**
    * 根据各级别id 递归定位到最终级别的对象中
    * @method locateObject
    *
    * @param  {Array}   _a  原数组
    * @param  {Array}   _i  各级别id
    * @return {Object}      返回 定位到的对象
    */
    locateObject: (_a, _i) => {
        let o = {}

        for (let i = 0; i < _a.length; i++) {

            if (_a[i].id === _i[0]) {

                if (_a[i].children && _i.length > 1) {
                    _i.shift()
                    return T.locateObject(_a[i].children, _i)
                } else {
                    o = _a[i]
                }
                
            }
        }

        return o
    },
    
    // ----------------------------- 以上为数据相关 以下为UI相关 -----------------------------

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
     * @example
     *  T.setCookie('name', 'T', 1)
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
     * @example
     *  T.getCookie('name')
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
     *  T.addThousandMark(30000)
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
     *  T.delHTMLTags('<div id="popupMask"><a href="#">test text</a></div>')
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
     *  T.capitalize('Trus')
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
     *  T.capitalizeAllWords('patience. my old friend.')
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
     *  T.getByteLength('abcdefg')
     *  T.getByteLength('中文测试')
     *  
     * @param  {String}  _s     原字符串
     * @return {String} 返回    处理后的字符串
     */
    getByteLength: _s => new Blob([_s]).size,

    /**
     * Base64解码
     * @method decode
     *
     * @example
     *  T.decode('dGhpcyUyMGlzJTIwdGVzdCUyMCVFNSU5MCVBQiVFNiU5QyU4OSVFNCVCOCVBRCVFNiU5NiU4NyUyMDEyMw==')
     *  
     * @param  {String}  _s     原字符串
     * @return {String} 返回    解码后的字符串
     */
    decode: _s => window.decodeURIComponent(window.atob(_s)),
    
    /**
     * Base64编码
     * @method encode
     *
     * @example
     *  T.encode('this is test 含有中文 123')
     *  
     * @param  {String}  _s     原字符串
     * @return {String} 返回    编码码后的字符串
     */
    encode: _s => window.btoa(window.encodeURIComponent('this is test 含有中文 123')),

    /**
     * 设置文档根节点字号
     * @method setRem
     *
     * @example
     *  T.setRem()
     *  window.onresize = Ty.setRem 浏览器被重置大小时也需要调用
     * 
     */
    setRem: () => {

        let _doc = document.scrollingElement

        let _clWidth = _doc.clientWidth
        if (_clWidth > 750) _clWidth = 750
        _doc.style.fontSize = `${_clWidth / 10}px`
    },

    /**
     * 获取系统信息
     * @method getSystemInfo
     *
     * @param  {DOM}   _el    DOM元素的 id 显示信息的容器
     */
    getSystemInfo: _el => {

        // 避免重复加载 清空列表中的元素
        _el.innerHTML = ''

        // 获取 userAgent 信息
        const info = window.navigator.userAgent.split(' ')
        const date = new Date()
        const time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
        const device = info[1].replace(/^\(|;$/g, '')
        const version = info[6].replace(/_|;|\)/g, ' ')

        // 获取显卡信息
        const gl = document.createElement('canvas').getContext('experimental-webgl')
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
        const graphics = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)

        const deviceInfo = [
            `当前时间: ${time}`,
            `当前设备: ${device}`,
            `系统版本号: ${info[3]} ${info[4]} ${info[5]} ${version}`,
            `设备显卡: ${graphics}`
        ]

        for (let i = 0; i < deviceInfo.length; i++) {
            const _li = document.createElement('li')
            _li.innerHTML = deviceInfo[i]
            _el.appendChild(_li)
        }
    },

    /**
     * 根据时间格式获取间隔时间
     * @method periodTime
     *
     * @example
     *  var strDate = "2019-02-14 12:11:00"
     *  T.periodTime(strDate)  // 1周前
     * 
     * @param  {String}     "yyyy-mm-dd hh-mm-ss"
     * @return {String}     返回 文字叙述 "刚刚“ "N分钟前" "N天前"等
     */
    periodTime: _t => {

        // 把时间转换为时间戳
        const d = Date.parse(_t.replace(/-/gi, '/'))
        const minute = 1000 * 60
        const hour = minute * 60
        const day = hour * 24
        const month = day * 30
        const year = month * 12

        // 获取当前时间戳
        const now = new Date().getTime()
        const diffValue = now - d

        if (diffValue < 0) return

        let _r = null

        if (diffValue / year >= 1) {
            _r = parseInt(diffValue / year) + '年前'
        } else if (diffValue / month >= 1) {
            _r = parseInt(diffValue / month) + '个月前'
        } else if (diffValue / (7 * day) >= 1) {
            _r = parseInt(diffValue / (7 * day)) + '周前'
        } else if (diffValue / day >= 1) {
            _r = parseInt(diffValue / day) + '天前'
        } else if (diffValue / hour >= 1) {
            _r = parseInt(diffValue / hour) + '小时前'
        } else if (diffValue / minute >= 1) {
            _r = parseInt(diffValue / minute) + '分钟前'
        } else {
            _r = '刚刚'
        }

        return _r
    },

    /**
     * 格式化日期
     * @method dateFormatter
     *
     * @example
     *  T.dateFormatter('YYYY-MM-DD HH:mm:ss', new Date())
     *  // 2019-09-12 19:06:24
     *  T.dateFormatter('YYYYMMDDHHmmss', new Date())
     *  // 20190912191133
     * 
     * // 13位时间戳
     * @param  {String}  'YYYY-MM-DD HH:mm:ss' / 'YYYYMMDDHHmmss'
     * @return {String}  2019-09-12 19:06:24 / 20190912191133
     */
    dateFormatter: (_fmt, _d) => {

        const date = _d ? new Date(_d) : new Date()
        const year = date.getFullYear() + ''
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minutes = date.getMinutes()
        const second = date.getSeconds()

        return _fmt.replace(/YYYY|yyyy/g, year)
            .replace(/YY|yy/g, year.substr(2, 2))
            .replace(/MM/g, (month < 10 ? '0' : '') + month)
            .replace(/DD/g, (day < 10 ? '0' : '') + day)
            .replace(/HH|hh/g, (hour < 10 ? '0' : '') + hour)
            .replace(/mm/g, (minutes < 10 ? '0' : '') + minutes)
            .replace(/ss/g, (second < 10 ? '0' : '') + second)
    },

    /**
     * 根据时间戳返回时间间隔
     * @method timeInterval
     *
     * @example
     *  T.timeInterval(1566867166000, 1567693791000)
     * 
     * @param  {Number}     开始时间 1566867166000
     * @param  {Number}     结束时间 1567693791000
     * @return {Object}     { day: 9, hour: 13, minute: 37, second: 5 }
     */
    timeInterval: (_start, _end) => {
        
        const res = _end - _start
        if (res < 0) { return false }

        // 计算天数后取余剩余毫秒再次计算
        const DAY = Math.floor(res / (24 * 60 * 60 * 1000))

        const surplus1 = res % (24 * 60 * 60 * 1000)
        const HOUR = Math.floor(surplus1 / (60 * 60 * 1000))

        const surplus2 = surplus1 % (60 * 60 * 1000)
        const MINUTE = Math.floor(surplus2 / (60 * 1000))

        const surplus3 = surplus2 % (60 * 1000)
        const SECOND = Math.floor(surplus3 / 1000)
        
        return {
            day: DAY,
            hour: HOUR,
            minute: MINUTE,
            second: SECOND
        }
    },

    /**
     * 推送通知
     * @method sendNotification
     * 
     * @param  {String}    _tit  通知的标题
     * @param  {Object}    _opt  通知的配置参数
     * @param  {Function}  _cli  点击通知的回调函数
     * 
     * @example
     *  var options = {
     *      body: '通知的内容',
     *      requireInteraction: true,
     *      icon: '../static/img/img01.png'
     *  }
     *  T.sendNotification('推送的内容', options, () => {
     *      console.log('_cli dosomthing')
     *  })
     */
    sendNotification: (_tit, _opt, _cli) => {
   
        // 检查浏览器是否支持
        if (!window.Notification || !window.Notification.requestPermission()) {
            console.warn('Ty_err: 此浏览器不支持通知')
            return false
        } else {
            // 用户未选择 发起询问通知
            Notification.requestPermission().then(result => {
                if (result === 'granted' || result === 'default') {
                    const noti = new Notification(_tit, _opt)
                    noti.onclick = _cli
                } else if (result === 'default') {
                    console.warn('Ty_err: 用户关闭授权 可再次请求授权')
                } else {
                    console.warn('Ty_err: 用户拒绝授权')
                }
            }).catch(() => {
                console.warn('Ty_err: 授权失败')
            })
        }
    },

    /**
     * 获取图片色值
     * @method getImageColor
     * 
     * @example
     *  T.getImageColor({
     *      url: 图片的url,
     *      canvas: {
     *          el: document.getElementById('canvas') canvas元素,
     *          width: 画布宽度,
     *          height: 画布高度
     *      }
     *      el: document.getElementById('canv') 需要设置背景色的元素,
     *      direction: '45deg' 渐变的方向,
     *      col1: { x: 30, y: 30 } 第一个色值的坐标
     *      col2 : { x: 170, y: 70 }第二个色值的坐标
     *  })
     * 
     * @param  {Object}    _params  画布信息
     */
    getImageColor: _params => {
   
        const img = new Image()
   
        // 解决跨越
        img.crossOrigin = ''
        img.src = _params.url
   
        // 设置canvas宽高
        _params.canvas.el.width = _params.canvas.width
        _params.canvas.el.height = _params.canvas.height
           
        const ctx = _params.canvas.el.getContext('2d')
   
        img.onload = () => {
            // 开始绘图
            ctx.drawImage(img, 0, 0, _params.canvas.width, _params.canvas.height)
               
            _params.el.style.background = `linear-gradient(${_params.direction},
                ${getRGBA(_params.col1)},
                ${getRGBA(_params.col2)})`
        }
   
        const getRGBA = _p => {
               
            // 获取图片像素信息
            const pixel = ctx.getImageData(
                _p.x,
                _p.y,
                _params.canvas.width,
                _params.canvas.height
            )
            const data = pixel.data
   
            // 获取rgba值
            const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${(data[3] / 255)})`
   
            return rgba
        }
    },

    /**
     * 判断滚动条是否滚动到页面最底部
     * @method isScrollBorwserBottom
     *
     * @return {Boolean}     返回 是否滚动到页面最底部
     */
    isScrollBorwserBottom: () => {

        let _isBottom = false
        const _pos = document.scrollingElement.scrollHeight - 
                document.scrollingElement.scrollTop - 
                document.scrollingElement.clientHeight

        if (_pos <= 0) {
            _isBottom = true
            return _isBottom
        }
        return _isBottom
    },

    /**
     * 图片预览
     * @method previewImg
     *
     * @example 
     *  ELEMENT.addEventListener('change', e => {
     *      T.previewImg(e.target)
     *  })
     * 
     * @param  {DOMEvent}  _t  事件对象 e.target
     */
    previewImg: _t => {

        if (!window.FileReader) {
            console.log('此设备不支持 new FileReader')
            return
        }
   
        const div = document.getElementById('previewBox')
       
        if (_t.files && _t.files[0]) {
       
            div.innerHTML = '<img id="previewImg" class="preview-img" />'
            const img = document.getElementById('previewImg')
       
            const reader = new FileReader()
       
            // 图片文件转换为base64
            reader.readAsDataURL(_t.files[0])
       
            reader.onload = e => {
                img.src = e.target.result
            }
        }
    },

    /**
     * 获取图片原始尺寸
     * @method getNaturalDimensions
     *
     * @example 
     *  T.getNaturalDimensions(la, natural => {
     *      console.log(natural)
     *  })
     * 
     * @param  {DOM}        _el  图片元素
     * @param  {Function}   _fn  回调
     */
    getNaturalDimensions: (_el, _fn) => {
    
        if (_el.naturalWidth) {
            _fn({
                width: _el.naturalWidth,
                height: _el.naturalHeight
            })
        } else {
            // IE 6/7/8
            const img = new Image()
            img.src = _el.src

            if (img.complete) {
                _fn({
                    width: img.width,
                    height: img.height
                })
            } else {
                img.onload = () => {
                    _fn({
                        width: img.width,
                        height: img.height
                    })
                }
            }
        }
    },

    /**
     * 懒加载
     * @method lazyLoad
     *
     * @param  {DOM}  _imgs  需加载的所有图片元素
     * 
     * @example 
     *  var lazyImgs = document.getElementsByClassName('lazy-image')
     *  window.addEventListener('scroll', () => {
     *      T.lazyLoad(lazyImgs)
     *  }, false)
     */
    lazyLoad: _imgs => {

        const getOffsetParentTop = e => {

            let ost = e.offsetTop
            // 向上查找所有 offsetParent
            // 叠加 offsetParent.offsetTop 精确元素到文档顶部的距离
            while (e.offsetParent) {
                e = e.offsetParent
                ost += e.offsetTop
            }

            return ost
        }
    
        const clientHeight = document.scrollingElement.clientHeight
        const scrollTop = document.scrollingElement.scrollTop
        
        for (var i = 0; i < _imgs.length; i++) {
            
            // 可视高度 + 滚动高度 > 当前元素距文档顶部的高度 则元素已进入浏览器可视范围
            if (clientHeight + scrollTop > getOffsetParentTop(_imgs[i])) {
    
                _imgs[i].src = _imgs[i].getAttribute('data-img')
            }
        }
    },

    /**
     * 解决滚动穿透问题
     * @method scrollCrossDebug
     *
     * @param  {Boolean}  _isOpen  在popup打开/关闭时调用
     * 
     * @example 
     *  ELEMENT.addEventListener('click', () => {
     *      T.scrollCrossDebug(true)
     *      // ... 打开/关闭 popup 等操作
     *  })
     */
    scrollCrossDebug: _isOpen => {

        if (_isOpen) {

            let scrollTop = document.scrollingElement.scrollTop
            document.body.style.cssText += `position: fixed; top: -${scrollTop}px; width: 100%;`
        } else {

            let body = document.body
            body.style.position = 'static'
            body.style.width = 'auto'
            document.scrollingElement.scrollTop = -parseInt(body.style.top)
        }
    },

    /**
     * 实时截断小数点后两位之后的内容
     * @method formatterToFixed
     *
     * @example 
     *  ELEMENT.addEventListener('keyup', e => {
     *      T.formatterToFixed(e.target)
     *  })
     * 
     * @param  {DOMEvent}  _t  事件对象 e.target
     */
    formatterToFixed: _t => {
        
        /* eslint no-useless-escape: "error" */
        // 清除“数字”和“.”以外的字符
        _t.value = _t.value.replace(/[^\d.]/g, '')

        // 只保留第一个“.” 清除多余的
        _t.value = _t.value.replace(/\.{2,}/g, '.')
        _t.value = _t.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')

        // 只能输入两个小数
        // eslint-disable-next-line no-useless-escape
        _t.value = _t.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')

        // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的数字
        if (_t.value.indexOf('.') < 0 && _t.value !== '') {
            _t.value = parseFloat(_t.value)
        }
    },

    /**
     * 函数防抖
     * @method debounce
     *
     * @example 
     *  ELEMENT.addEventListener('keydown', T.debounce(e => {}, 1500))
     * 
     * @param  {Function}  _f  回调
     * @param  {Number}    _d  延迟
     * 
     * @return {FUNCTION}  返回目标函数节流执行
     */
    debounce: (_f, _d) => {

        let timer

        return function() {

            clearTimeout(timer)

            timer = setTimeout(() => {
                _f.apply(this, arguments)
            }, _d)
        }
    },

    /**
     * 函数节流
     * @method throttle
     *
     * @param  {Function}  _f  回调
     * @param  {Number}    _d  延迟
     * 
     * @example 
     *      ELEMENT.addEventListener('mousemove', T.throttle(e => {}, 1000))
     * 
     * @return {FUNCTION}  返回目标函数节流执行
     */
    throttle: (_f, _d) => {

        let switchCheck = true
        let timer

        return function() {

            if (!switchCheck) return

            switchCheck = false
            clearTimeout(timer)

            timer = setTimeout(() => {
                _f.apply(this, arguments)
                switchCheck = true
            }, _d)
        }
    },

    /**
     * X轴滚动到某处 (过渡动画)
     * @method scrollX
     *
     * @param  {Number}  _x  X轴坐标
     * 
     * @description
     *  由于 left 与 top 会同时执行 遇到单独执行某轴 
     *  另一轴需要重新获取坐标保持不变
     *  所以分开执行
     * 
     * @example 
     *  ELEMENT.addEventListener('click', () => {
     *      T.scrollX(document.getElementById('testBtn').offsetWidth)
     *  })
     * 
     */
    scrollX: _x => {

        // 无参数 则X轴滚动到页面最左边
        _x = _x || 0

        window.scrollTo({
            left: _x,
            behavior: 'smooth'
        })
    },

    /**
     * Y轴滚动到某处 (过渡动画)
     * @method scrollY
     *
     * @param  {Number}  _target  目标元素的offsetTop
     * 
     * @example 
     *      ELEMENT.addEventListener('click', () => {
     *          T.scrollY(document.getElementById('canv').offsetTop)
     *      })
     */
    scrollY: (_target = 0) => {

        // requestAnimationFrame 兼容处理
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = fn => setTimeout(fn, 17)
        }

        let s = document.scrollingElement.scrollTop
    
        let step = () => {

            // 下一秒位置 = 当前位置 + (当前位置与目标位置的距离的四分之一)
            s = s + (_target - s) / 4

            // 滚动高度小于1时 终止动画
            if (Math.abs(s - _target) < 1) {
                s = 0
                return
            }

            window.scrollTo(0, s)
            requestAnimationFrame(step)
        }
    
        step()
    }

} //  ---- **** T end **** ----

module.exports = T
