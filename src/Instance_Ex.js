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
    var MAXWIDTH = 260 
    var MAXHEIGHT = 180
    var div = document.getElementById('preview')
    if (file.files && file.files[0]) {
        div.innerHTML = '<img id=imghead>'
        var img = document.getElementById('imghead')
        img.onload = function() {
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight)
            img.width = rect.width
            img.height = rect.height
            img.style.marginTop = rect.top + 'px'
        }
        var reader = new FileReader()
        reader.onload = function(evt) { img.src = evt.target.result }
        reader.readAsDataURL(file.files[0])
    } else { // 兼容IE
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="'
        file.select()
        var src = document.selection.createRange().text
        div.innerHTML = '<img id=imghead>'
        var img = document.getElementById('imghead')
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight)
        div.innerHTML = "<div id=divhead style='width:" + rect.width + 'px;height:' + rect.height + 'px;margin-top:' + rect.top + 'px;' + sFilter + src + "\"'></div>"
    }
}
function clacImgZoomParam(maxWidth, maxHeight, width, height) {
    var param = { top: 0, left: 0, width: width, height: height }
    var rateWidth, rateHeight
    if (width > maxWidth || height > maxHeight) {
        rateWidth = width / maxWidth
        rateHeight = height / maxHeight
                
        if (rateWidth > rateHeight) {
            param.width = maxWidth
            param.height = Math.round(height / rateWidth)
        } else {
            param.width = Math.round(width / rateHeight)
            param.height = maxHeight
        }
    }
    param.left = Math.round((maxWidth - param.width) / 2)
    param.top = Math.round((maxHeight - param.height) / 2)
    return param
}

document.getElementById('uploadImg').onchange = function(e) {
    previewImage(e.target)
}
