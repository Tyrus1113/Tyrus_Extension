/*
 * @instance
 * @Author: Tyrus
 */

import Ty from './Tyrus_Extension'
import TyUI from './Tyrus_UI'

// 设置文档根节点字号
TyUI.setRem()
window.onresize = Ty.setRem

// 获取系统信息
TyUI.getSystemInfo(document.getElementById('deviceInfo'))
console.log(window.screen.width, window.screen.height)

// 推送通知
const options = {
    body: 'Welcome to Tyrus_Extension ~',
    icon: '/favicon_ty.ico'
}
TyUI.sendNotification('Tyrus_Extension', options, function() {
    console.log('_cli')
})

// 获取图片色值
TyUI.getImageColor({
    url: 'https://i.loli.net/2019/08/05/HoIAjlTLnURGQce.jpg',
    canvas: {
        el: document.getElementById('canvas'),
        width: 200,
        height: 100
    },
    el: document.getElementById('canv'),
    direction: '45deg',
    col1: {
        x: 1,
        y: 99
    },
    col2: {
        x: 199,
        y: 1
    }
})

// 函数节流
document.getElementById('canvas').addEventListener('mousemove', TyUI.throttle(e => {
    console.log(`${e.clientX}, ${e.clientY}`)
}, 1000))

// 函数防抖
document.getElementById('throttleTest').addEventListener('keydown', TyUI.debounce(function(e) {
    console.log(e.target.value)
    fetch(`https://api.myjson.com/bins/jlxrd?&txt=${e.target.value}`, {
        method: 'get'
    }).then(function(resp) {
        resp.json().then((data) => {
            console.log(data)
        })
    })
}, 1500))

// 懒加载
var lazyImgs = document.getElementsByClassName('lazy-image')

window.addEventListener('scroll', () => {
    // console.log('scrollTop :', document.documentElement.scrollTop || document.body.scrollTop)
    
    // 判断滚动条是否滚动到页面最底部
    console.log('isScrollBorwserBottom :', TyUI.isScrollBorwserBottom())
    
    // 懒加载
    TyUI.lazyLoad(lazyImgs)
}, false)

// 实时截断小数点后两位之后的内容
document.getElementById('formatterTest').addEventListener('keyup', function(e) {
    TyUI.formatterToFixed(e.target)
})

// 图片预览
document.getElementById('previewInput').addEventListener('change', function(e) {
    TyUI.previewImg(e.target)
})

// 解决滚动穿透问题
document.getElementById('scrollCross').addEventListener('click', function() {
    TyUI.scrollCrossDebug(true)
    document.getElementById('popupMask').style.display = 'block'
    document.getElementById('popupContainer').style.display = 'block'
})
document.getElementById('popupMask').addEventListener('click', function() {
    TyUI.scrollCrossDebug(false)
    document.getElementById('popupMask').style.display = 'none'
    document.getElementById('popupContainer').style.display = 'none'
})

// 滚动到某处 (过渡动画)
document.getElementById('ScrollToAnywhere').addEventListener('click', () => {
    scrollY(document.getElementById('formatterTest').offsetTop)
})

// 获取图片原始尺寸
// 目标元素与懒加载测试元素相同 先把目标元素 .lazy-image 滑动到可视范围后再测试
var la = document.getElementById('getNaturalDimensions')
TyUI.getNaturalDimensions(la, natural => {
    console.log(natural)
})

// 格式化日期
console.log(TyUI.periodTime(TyUI.dateFormatter('YYYY-MM-DD HH:mm:ss', new Date())))
console.log(TyUI.dateFormatter('YYYY-MM-DD HH:mm:ss', 1567693791000))
console.log(TyUI.dateFormatter('YYYYMMDDHHmmss', 1567693791000))
console.log(TyUI.timeInterval(1566867166000, 1567693791000))

// 从url中获取所有参数转Object
console.log(Ty.getUrlParams())

// 检查数组各项是否相等
console.log('isEqualItems:', Ty.isEqualItems([1, 1, 1]))

// 获取数组内的平均值
console.log('averageItems:', Ty.averageItems([1, 2, 3, 4, 5]))

// 获取数组内其中一项出现的次数
console.log('hasItemCount:', Ty.hasItemCount([1, 2, 3, 4, 5, 1, 4], 4))

// 递归展平数组
console.log('flattenItems:', Ty.flattenItems([1, 2, 3, [5, ['test'], 7, [9, 10]]]))

// 删除数组中符合条件的值 Testing...
// const delItem = (_arr, _fn) => _arr.splice(_arr.findIndex(_i => _fn(_i)), 1)
// console.log(delItem([1, 2, 3, 4], n => n > 3))

var scrollY = function(_target = 0) {
    let s = document.documentElement.scrollTop || document.body.scrollTop

    let step = () => {
        s = s + (_target - s) / 4
        if (Math.abs(s - _target) < 1) { return }
        window.scrollTo(0, s)
        requestAnimationFrame(step)
    }

    step()
}
