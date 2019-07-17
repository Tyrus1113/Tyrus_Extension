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

window.addEventListener('scroll', () => {
    console.log('scrollTop :', document.documentElement.scrollTop || document.body.scrollTop)
    console.log('isScrollBorwserBottom :', Ty.isScrollBorwserBottom())
}, false)

document.getElementById('formatterTest').onkeyup = function(e) {
    Ty.formatterToFixed(this)
}

// 截取小数点后几位
// function clearNoNum(obj) {
//     console.log(obj, obj.value)
//     /* eslint no-useless-escape: "error" */
//     obj.value = obj.value.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
//     obj.value = obj.value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
//     obj.value = obj.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
//     // eslint-disable-next-line no-useless-escape
//     obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
//     if (obj.value.indexOf('.') < 0 && obj.value !== '') { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
//         obj.value = parseFloat(obj.value)
//     }
// }
// clearNoNum()
