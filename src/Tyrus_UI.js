/*
 * @Tyrus_ExtensionJS
 * @Author: Tyrus
 */

//  ---- **** Ty start **** ----
var TyUI = {

    /**
     * 设置文档根节点字号
     * @method setRem
     *
     * @example
     * TyUI.setRem()
     * window.onresize = Ty.setRem 浏览器被重置大小时也需要调用
     * 
     */
    setRem: function() {

        var _doc = 0
        var _clWidth = 0
        document.compatMode === 'CSS1Compat'
            ? _doc = document.documentElement
            : _doc = document.body

        _clWidth = _doc.clientWidth

        if (_clWidth > 750) _clWidth = 750
        _doc.style.fontSize = _clWidth / 10 + 'px'
    },

    /**
     * 获取系统信息
     * @method getSystemInfo
     *
     * @param  {DOM}   _el    DOM元素的 id 显示信息的容器
     */
    getSystemInfo: function(_el) {

        // 参数类型校验
        if (!_el.nodeType) {
            var vali = Object.prototype.toString.call(_el).split(' ')[1].match(/[a-z]+/i)[0]
            console.warn('Ty_err: 参数应为DOM元素 但获取到' + vali + '类型')
            return 
        }

        // 避免重复加载 清空列表中的元素
        _el.innerHTML = ''

        // 获取 userAgent 信息
        var info = window.navigator.userAgent.split(' ')
        var _ = new Date()
        var time = `${_.getFullYear()}年${_.getMonth() + 1}月${_.getDate()}日`
        var device = info[1].replace(/^\(|;$/g, '')
        var version = info[6].replace(/_|;|\)/g, ' ')

        // 获取显卡信息
        var gl = document.createElement('canvas').getContext('experimental-webgl')
        var debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
        var graphics = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)

        var deviceInfo = [
            `当前时间: ${time}`,
            `当前设备: ${device}`,
            `系统版本号: ${info[3] + ' ' + info[4] + ' ' + info[5] + ' ' + version}`,
            `设备显卡: ${graphics}`
        ]

        for (var i = 0; i < deviceInfo.length; i++) {
            var _li = document.createElement('li')
            _li.innerHTML = deviceInfo[i]
            _el.appendChild(_li)
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
     *      var options = {
     *          body: '通知的内容',
     *          requireInteraction: true,
     *          icon: '../static/img/img01.png'
     *      }
     *      TyUI.sendNotification('推送的内容', options, function() {
     *          console.log('_cli dosomthing')
     *      })
     */
    sendNotification: function(_tit, _opt, _cli) {
   
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
     * @param  {Object}    _params  画布信息
     * 
     * @example
     *      TyUI.getImageColor({
     *          url: 图片的url,
     *          canvas: {
     *              el: document.getElementById('canvas') canvas元素,
     *              width: 画布宽度,
     *              height: 画布高度
     *          }
     *          el: document.getElementById('canv') 需要设置背景色的元素,
     *          direction: '45deg' 渐变的方向,
     *          col1: { x: 30, y: 30 } 第一个色值的坐标
     *          col2 : { x: 170, y: 70 }第二个色值的坐标
     *      })
     */
    getImageColor: function(_params) {
   
        var img = new Image()
   
        // 解决跨越
        img.crossOrigin = ''
        img.src = _params.url
   
        // 设置canvas宽高
        _params.canvas.el.width = _params.canvas.width
        _params.canvas.el.height = _params.canvas.height
           
        var ctx = _params.canvas.el.getContext('2d')
   
        img.onload = function() {
            // 开始绘图
            ctx.drawImage(img, 0, 0, _params.canvas.width, _params.canvas.height)
               
            _params.el.style.background = 'linear-gradient(' +
                   _params.direction +
                   ', ' +
                   getRGBA(_params.col1) +
                   ', ' +
                   getRGBA(_params.col2) + ')'
        }
   
        function getRGBA(_p) {
               
            // 获取图片像素信息
            var pixel = ctx.getImageData(
                _p.x,
                _p.y,
                _params.canvas.width,
                _params.canvas.height
            )
            var data = pixel.data
   
            // 获取rgba值
            var rgba = 'rgba(' +
                   data[0] +
                   ',' +
                   data[1] +
                   ',' +
                   data[2] +
                   ',' +
                   (data[3] / 255) +
                   ')'
   
            return rgba
        }
    },

    /**
     * 判断滚动条是否滚动到页面最底部
     * @method isScrollBorwserBottom
     *
     * @return {Boolean}     返回 是否滚动到页面最底部
     */
    isScrollBorwserBottom: function() {

        var pos = 0
        var isBottom = false

        // scrollHeight clientHeight
        // 在DTD已声明的情况下用documentElement 未声明的情况下用body
        // document.compatMode 可以用来判断是否声明了DTD
        // 值为 BackCompat 未声明  值为 CSS1Compat 已声明
        if (document.compatMode === 'CSS1Compat') {
            pos = document.documentElement.scrollHeight - 
                (document.documentElement.scrollTop + document.body.scrollTop) - 
                document.documentElement.clientHeight
        } else {
            pos = document.body.scrollHeight - 
                document.body.scrollTop - 
                document.body.clientHeight
        }

        if (pos <= 0) {
            isBottom = true
            return isBottom
        }
        return isBottom
    },

    /**
     * 图片预览
     * @method previewImg
     *
     * @param  {DOMEvent}  _t  事件对象 e.target
     * 
     * @example 
     *      ELEMENT.addEventListener('change', function(e) {
     *          TyUI.previewImg(e.target)
     *      })
     * 
     */
    previewImg: function(_t) {
   
        var div = document.getElementById('previewBox')
       
        if (_t.files && _t.files[0]) {
       
            div.innerHTML = '<img id="previewImg" class="preview-img" />'
            var img = document.getElementById('previewImg')
       
            var reader
            window.FileReader
                ? reader = new FileReader()
                : console.log('此设备不支持 new FileReader')
       
            // 图片文件转换为base64
            reader.readAsDataURL(_t.files[0])
       
            reader.onload = function(e) {
                img.src = e.target.result
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
     *      var lazyImgs = document.getElementsByClassName('lazy-image')
     *      window.addEventListener('scroll', () => {
     *          TyUI.lazyLoad(lazyImgs)
     *      }, false)
     * 
     */
    lazyLoad: function(_imgs) {

        function getOffsetParentTop(e) {

            var ost = e.offsetTop
            // 向上查找所有 offsetParent
            // 叠加 offsetParent.offsetTop 精确元素到文档顶部的距离
            while (e.offsetParent) {
                e = e.offsetParent
                ost += e.offsetTop
            }

            return ost
        }
    
        // 如果已声明 <!DOCTYPE html> 
        // 使用 documentElement.clientHeight 获取浏览器可视高度
        // 而不是 body.clientHeight
        var clientHeight = document.documentElement.clientHeight
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    
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
     *      ELEMENT.addEventListener('click', function() {
     *          TyUI.scrollCrossDebug(true)
     *          // ... 打开/关闭 popup 等操作
     *      })
     */
    scrollCrossDebug: function(_isOpen) {

        if (_isOpen) {

            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            document.body.style.cssText += `position: fixed; top: -${scrollTop}px; width: 100%;`
        } else {

            let body = document.body
            body.style.position = 'static'
            body.style.width = 'auto'
            document.documentElement.scrollTop = document.body.scrollTop = -parseInt(body.style.top)
        }
    },

    /**
     * 实时截断小数点后两位之后的内容
     * @method formatterToFixed
     *
     * @param  {DOMEvent}  _t  事件对象 e.target
     * 
     * @example 
     *      ELEMENT.addEventListener('keyup', function(e) {
     *          TyUI.formatterToFixed(e.target)
     *      })
     * 
     */
    formatterToFixed: function(_t) {
        
        /* eslint no-useless-escape: "error" */
        // 清除“数字”和“.”以外的字符
        _t.value = _t.value.replace(/[^\d.]/g, '')

        // 只保留第一个. 清除多余的
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
     * @param  {Function}  _f  回调
     * @param  {Number}    _d  延迟
     * 
     * @example 
     *      ELEMENT.addEventListener('keydown', TyUI.debounce(function(e) {}, 1500))
     * 
     * @return {FUNCTION}  返回目标函数节流执行
     */
    debounce: function(_f, _d) {

        var timer

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
    throttle: function(_f, _d) {

        var switchCheck = true
        var timer

        return function() {

            if (!switchCheck) {
                return
            }

            switchCheck = false
            clearTimeout(timer)

            timer = setTimeout(() => {
                _f.apply(this, arguments)
                switchCheck = true
            }, _d)
        }
    }
} //  ---- **** Ty end **** ----
export default TyUI
