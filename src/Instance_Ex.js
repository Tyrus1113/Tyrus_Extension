/*
 * @instance
 * @Author: Tyrus
 */

import Ty from './Tyrus_Extension'
import TyUI from './Tyrus_UI'

// 设置文档根节点字号
TyUI.setRem()
window.onresize = Ty.setRem

// 懒加载
const lazyImgs = document.getElementsByClassName('lazy-image')

// 回到顶部
const goback = document.getElementById('goback')
goback.addEventListener('click', () => {
    TyUI.scrollY()
})

// 滚动监听
window.addEventListener('scroll', () => {
    
    // console.log('scrollTop :', document.scrollingElement.scrollTop)
    document.scrollingElement.scrollTop >= 300
        ? goback.style.display = 'block'
        : goback.style.display = 'none'
    
    // 判断滚动条是否滚动到页面最底部
    console.log('isScrollBorwserBottom :', TyUI.isScrollBorwserBottom())
    
    // 懒加载
    TyUI.lazyLoad(lazyImgs)
}, false)

// 获取系统信息
TyUI.getSystemInfo(document.getElementById('deviceInfo'))
console.log(window.screen.width, window.screen.height)

// 推送通知
const options = {
    body: 'Welcome to Tyrus_Extension ~',
    icon: '/favicon_ty.ico'
}
TyUI.sendNotification('Tyrus_Extension', options, () => {
    console.log('_cli')
})

// 获取图片色值
TyUI.getImageColor({
    url: 'https://i.loli.net/2019/08/05/HoIAjlTLnURGQce.jpg',
    canvas: {
        el: document.getElementById('canvas'),
        width: 260,
        height: 130
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
document.getElementById('throttleTest').addEventListener('keydown', TyUI.debounce(e => {
    console.log(e.target.value)
    fetch(`https://api.myjson.com/bins/jlxrd?&txt=${e.target.value}`, {
        method: 'get'
    }).then(resp => {
        resp.json().then((data) => {
            console.log(data)
        })
    })
}, 1500))

// 实时截断小数点后两位之后的内容
document.getElementById('formatterTest').addEventListener('keyup', e => {
    TyUI.formatterToFixed(e.target)
})

// 图片预览
document.getElementById('previewInput').addEventListener('change', e => {
    TyUI.previewImg(e.target)
})

// 解决滚动穿透问题
document.getElementById('scrollCross').addEventListener('click', () => {
    TyUI.scrollCrossDebug(true)
    document.getElementById('popupMask').style.display = 'block'
    document.getElementById('popupContainer').style.display = 'block'
})
document.getElementById('popupMask').addEventListener('click', () => {
    TyUI.scrollCrossDebug(false)
    document.getElementById('popupMask').style.display = 'none'
    document.getElementById('popupContainer').style.display = 'none'
})

// 滚动到某处 (过渡动画)
document.getElementById('ScrollToAnywhere').addEventListener('click', () => {
    TyUI.scrollY(document.getElementById('canvasContainer').offsetTop)
})

// 获取图片原始尺寸
// 目标元素与懒加载测试元素相同 先把目标元素 .lazy-image 滑动到可视范围后再测试
const la = document.getElementById('getNaturalDimensions')
TyUI.getNaturalDimensions(la, natural => {
    console.log('getNaturalDimensions:', natural)
})

// 格式化日期
console.log('periodTime:', TyUI.periodTime(TyUI.dateFormatter('YYYY-MM-DD HH:mm:ss', '2019-10-30 12:11:00')))
console.log('dateFormatter:', TyUI.dateFormatter('YYYY-MM-DD HH:mm:ss', 1567693791000))
console.log('dateFormatter:', TyUI.dateFormatter('YYYYMMDDHHmmss', 1567693791000))
console.log('timeInterval:', TyUI.timeInterval(1566867166000, 1567693791000))

// 从url中获取参数
console.log('getUrlParam:', Ty.getUrlParam('ch'))

// 检查数组各项是否相等
console.log('isEqualItems:', Ty.isEqualItems([1, 1, 1]))

// 获取数组内的平均值
console.log('averageItems:', Ty.averageItems([1, 2, 3, 4, 5]))

// 获取数组内其中一项出现的次数
console.log('hasItemCount:', Ty.hasItemCount([1, 2, 3, 4, 5, 1, 4], 4))

// 递归展平数组
console.log('flattenItems:', Ty.flattenItems([1, 2, 3, [5, ['test'], 7, [9, 10]]]))

// 差集
console.log('difference:', Ty.difference([1, 2, 3, 5], [1, 2, 4]))

// 交集
console.log('intersection:', Ty.intersection([1, 2, 3], [1, 2, 4]))

// 删除字符串中的xml/html标签
console.log('delHTMLTags:', Ty.delHTMLTags('<div id="popupMask"><a href="#">test text</a></div>'))

// 首字母大写
console.log('capitalize:', Ty.capitalize('tyrus'))

// 每个单词首字母大写
console.log('capitalizeAllWords:', Ty.capitalizeAllWords('patience. my old friend.'))

// 获取字节长度
console.log('getByteLength:', Ty.getByteLength('abcdefg'))
console.log('getByteLength:', Ty.getByteLength('中文测试'))

// 判断类型
console.log('is Set:', Ty.is(Set, new Set([1, 2, 3])))
console.log('is Map:', Ty.is(Map, new Map([['a', 6], ['b', 8]])))
console.log('is RegExp:', Ty.is(RegExp, /./g))
console.log('is Number:', Ty.is(Number, 'a'))
console.log('is Function:', Ty.is(Function, x => x === 1))

// 数组与对象数组去重
const ARR = [
    { name: 'Allen', age: 10 },
    { name: 'Ben', age: 7 },
    { name: 'Sarah', age: 8 },
    { name: 'Allen', age: 9 },
    { name: 'Candy', age: 8 }
]
const ARR01 = [1, 2, 2, 4, 4, 6, 8]
const ARR02 = [9, 6, 5, 7, 3, 2, 1]
console.log('unique:', Ty.removeDuplicate(ARR, 'name'))
console.log('unique:', Ty.removeDuplicate(ARR01))

// 取数组中最大值 最小值
console.log('getMax:', Ty.getMax([1, 10.1, 3, 4]), ...ARR01)
console.log('getMin:', Ty.getMin([-1, 10.1, 3, 4]))

// 数字添加千分符
console.log('addYearMonthSort:', Ty.addThousandMark(30000))

// 深拷贝引用数据类型
console.log('ARR:', ARR)
let deepCloneTest = Ty.deepClone(ARR)
deepCloneTest[0].name = 'Ty'
console.log('deepClone:', deepCloneTest, 'original ARR:', ARR)

// 只执行一次的函数
document.getElementById('onceBtn').addEventListener('click', Ty.onceCall(e => {
    console.log('onceFunc called just once', e)
}))

console.log('isEmptyObj:', Ty.isEmptyObj({}))

// Base64解码
console.log('decode:', Ty.decode('dGhpcyUyMGlzJTIwdGVzdCUyMCVFNSU5MCVBQiVFNiU5QyU4OSVFNCVCOCVBRCVFNiU5NiU4NyUyMDEyMw=='))

// Base64编码
console.log('encode:', Ty.encode('this is test 含有中文 123'))

// 点赞
document.getElementById('thumbsBtn').addEventListener('click', function() {
    if (!Ty.hasClass(this, 'thumbs-color')) {
        this.classList.add('thumbs', 'thumbs-color')
        this.addEventListener('animationend', () => {
            this.classList.remove('thumbs')
        })
    } else {
        this.classList.remove('thumbs-color')
    }
})

console.log('delItem:', delItem([1, 2, 3, 4], 1))
// 删除数组中符合条件的值 (基础数据类型)
console.log('delItem:', Ty.delItem([1, 2, 3, 4], 3))
