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
    url: 'https://s3.ifanr.com/wp-content/uploads/2019/03/27092132_4843.jpg!260',
    canvas: {
        el: document.getElementById('canvas'),
        width: 200,
        height: 100
    },
    el: document.getElementById('canv'),
    direction: '45deg',
    col1: {
        x: 30,
        y: 30
    },
    col2: {
        x: 170,
        y: 70
    }
})

// 函数节流
var box = document.getElementById('canvas')
box.onmousemove = Ty.throttle(function(e) {
    console.log(`${e.clientX}, ${e.clientY}`)
}, 1000)

// 函数防抖
var ipt = document.getElementById('throttleTest')
ipt.onkeydown = Ty.debounce(function(e) {
    console.log(e.target.value)
    fetch(`https://api.myjson.com/bins/jlxrd?&txt=${e.target.value}`, {
        method: 'get'
    }).then(function(resp) {
        resp.json().then((data) => {
            console.log(data)
        })
    })
}, 1500)

// 懒加载
var lazyImgs = document.getElementsByClassName('lazy-image')

window.addEventListener('scroll', () => {
    console.log('scrollTop :', document.documentElement.scrollTop || document.body.scrollTop)
    
    // 判断滚动条是否滚动到页面最底部
    console.log('isScrollBorwserBottom :', TyUI.isScrollBorwserBottom())
    
    // 懒加载
    TyUI.lazyLoad(lazyImgs)
}, false)

// 实时截断小数点后两位之后的内容
document.getElementById('formatterTest').onkeyup = function(e) {
    Ty.formatterToFixed(this)
}

// 图片预览
document.getElementById('previewInput').onchange = function(e) {
    TyUI.previewImg(e.target)
}

// 解决滚动穿透问题
document.getElementById('scrollCross').onclick = function() {
    TyUI.scrollCrossDebug(true)
    document.getElementById('popupMask').style.display = 'block'
    document.getElementById('popupContainer').style.display = 'block'
}
document.getElementById('popupMask').onclick = function() {
    TyUI.scrollCrossDebug(false)
    document.getElementById('popupMask').style.display = 'none'
    document.getElementById('popupContainer').style.display = 'none'
}

// 原生平滑滚动
document.getElementById('scrollToBottom').onclick = function() {

    // window.scrollTo(0, document.documentElement.scrollHeight)
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
    })
}
