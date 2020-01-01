/*
 * @Tyrus_ExtensionJS
 * @Author: Tyrus
 */

//  ---- **** Ty start **** ----
const TyUI = {

    /**
     * 设置文档根节点字号
     * @method setRem
     *
     * @example
     *  TyUI.setRem()
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
     *  TyUI.periodTime(strDate)  // 1周前
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
     *  TyUI.dateFormatter('YYYY-MM-DD HH:mm:ss', new Date())
     *  // 2019-09-12 19:06:24
     *  TyUI.dateFormatter('YYYYMMDDHHmmss', new Date())
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
     *  TyUI.timeInterval(1566867166000, 1567693791000)
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
     *  TyUI.sendNotification('推送的内容', options, () => {
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
     *  TyUI.getImageColor({
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
               
            _params.el.style.background = `linear-gradient(${_params.direction}, ${getRGBA(_params.col1)}, ${getRGBA(_params.col2)})`
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
     *      TyUI.previewImg(e.target)
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
     *  TyUI.getNaturalDimensions(la, natural => {
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
     *      TyUI.lazyLoad(lazyImgs)
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
     *      TyUI.scrollCrossDebug(true)
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
     *      TyUI.formatterToFixed(e.target)
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
     *  ELEMENT.addEventListener('keydown', TyUI.debounce(e => {}, 1500))
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
     *      ELEMENT.addEventListener('mousemove', TyUI.throttle(e => {}, 1000))
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
     *      TyUI.scrollX(document.getElementById('testBtn').offsetWidth)
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
     *          TyUI.scrollY(document.getElementById('canv').offsetTop)
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

} //  ---- **** Ty end **** ----

module.exports = TyUI
