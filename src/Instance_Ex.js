/*
 * @instance
 * @Author: Tyrus
 */
import Ty from './Tyrus_Extension'

// 设置文档根节点字号
Ty.setRem()
window.onresize = Ty.setRem

Ty.getSystemInfo(document.getElementById('deviceInfo'))
console.log(window.screen.width, window.screen.height)

const options = {
    body: 'Welcome to Tyrus_Extension ~',
    icon: '/favicon_ty.ico'
}
Ty.sendNotification('Tyrus_Extension', options, function() {
    console.log('_cli')
})

Ty.getImageColor({
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
    console.log('isScrollBorwserBottom :', Ty.isScrollBorwserBottom())
}, false)

document.getElementById('formatterTest').onkeyup = function(e) {
    Ty.formatterToFixed(this)
}

function previewImage(file) {

    var div = document.getElementById('uploadPreview')

    if (file.files && file.files[0]) {

        div.innerHTML = '<img id="uploadImg" class="upload-img" />'
        var img = document.getElementById('uploadImg')

        var reader = new FileReader()
        reader.onload = function(e) {
            console.log('e.target.result:', e.target.result)
            img.src = e.target.result
        }
        reader.readAsDataURL(file.files[0])
    }
}

document.getElementById('uploadInput').onchange = function(e) {
    previewImage(e.target)
}
