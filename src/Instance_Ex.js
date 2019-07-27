/*
 * @instance
 * @Author: Tyrus
 */

import Ty from './Tyrus_Extension'
import TyUI from './Tyrus_UI'

// 设置文档根节点字号
TyUI.setRem()
window.onresize = Ty.setRem

TyUI.getSystemInfo(document.getElementById('deviceInfo'))
console.log(window.screen.width, window.screen.height)

const options = {
    body: 'Welcome to Tyrus_Extension ~',
    icon: '/favicon_ty.ico'
}
TyUI.sendNotification('Tyrus_Extension', options, function() {
    console.log('_cli')
})

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

var box = document.getElementById('canvas')
box.onmousemove = Ty.throttle(function(e) {
    console.log(`${e.clientX}, ${e.clientY}`)
}, 1000)

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

window.addEventListener('scroll', () => {
    console.log('scrollTop :', document.documentElement.scrollTop || document.body.scrollTop)
    console.log('isScrollBorwserBottom :', TyUI.isScrollBorwserBottom())
}, false)

document.getElementById('formatterTest').onkeyup = function(e) {
    Ty.formatterToFixed(this)
}

document.getElementById('previewInput').onchange = function(e) {
    TyUI.previewImg(e.target)
}
