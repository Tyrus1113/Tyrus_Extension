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
    TyUI.scrollY(document.getElementById('canv').offsetTop)
})

var url = 'ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=better-scroll%E4%B8%8A%E6%8B%89%E5%8A%A0%E8%BD%BD&oq=better-scroll&rsv_pq=a0d91a0d00060eaf&rsv_t=19c8L0m%2FPYZ%2BwpD9sJU%2FEqylGhb2ULVoPf5xjkv3d7X1yf14ku10vNEVumE&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_sug3=24&rsv_sug1=8&rsv_sug7=100&rsv_sug2=0&inputT=4974&rsv_sug4=7241'
console.log(Ty.getUrlParams(url))
console.log(Ty.getUrlParams(url, 'wd1'))
