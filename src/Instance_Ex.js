/*
 * @instance
 * @Author: Tyrus
 */

import T from './Tyrus_Extension'

// 设置文档根节点字号
T.setRem()
window.onresize = T.setRem

// 懒加载
const lazyImgs = document.getElementsByClassName('lazy-image')

// 回到顶部
const goback = document.getElementById('goback')
goback.addEventListener('click', () => {
    T.scrollY()
})

// 滚动监听
window.addEventListener('scroll', () => {
    
    console.log('scrollTop :', document.scrollingElement.scrollTop)
    document.scrollingElement.scrollTop >= 300
        ? goback.style.display = 'block'
        : goback.style.display = 'none'
    
    // 判断滚动条是否滚动到页面最底部
    console.log('isScrollBorwserBottom :', T.isScrollBorwserBottom())
    
    // 懒加载
    T.lazyLoad(lazyImgs)
}, false)

// 获取系统信息
T.getSystemInfo(document.getElementById('deviceInfo'))
console.log(window.screen.width, window.screen.height)

// 推送通知
const options = {
    body: 'Welcome to Trus_Extension ~',
    icon: '/favicon_ty.ico'
}
T.sendNotification('Trus_Extension', options, () => {
    console.log('_cli')
})

// 获取图片色值
T.getImageColor({
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
document.getElementById('canvas').addEventListener('mousemove', T.throttle(e => {
    console.log(`${e.clientX}, ${e.clientY}`)
}, 1000))

// 函数防抖
document.getElementById('throttleTest').addEventListener('keydown', T.debounce(e => {
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
    T.formatterToFixed(e.target)
})

// 图片预览
document.getElementById('previewInput').addEventListener('change', e => {
    T.previewImg(e.target)
})

// 解决滚动穿透问题
document.getElementById('scrollCross').addEventListener('click', () => {
    T.scrollCrossDebug(true)
    document.getElementById('popupMask').style.display = 'block'
    document.getElementById('popupContainer').style.display = 'block'
})
document.getElementById('popupMask').addEventListener('click', () => {
    T.scrollCrossDebug(false)
    document.getElementById('popupMask').style.display = 'none'
    document.getElementById('popupContainer').style.display = 'none'
})

// 滚动到某处 (过渡动画)
document.getElementById('ScrollToAnywhere').addEventListener('click', () => {
    T.scrollY(document.getElementById('canvasContainer').offsetTop)
})

// 获取图片原始尺寸
// 目标元素与懒加载测试元素相同 先把目标元素 .lazy-image 滑动到可视范围后再测试
const la = document.getElementById('getNaturalDimensions')
T.getNaturalDimensions(la, natural => {
    console.log('getNaturalDimensions:', natural)
})

// 格式化日期
console.log('periodTime:', T.periodTime(T.dateFormatter('2020-4-18 22:19:00', 'YYYY-MM-DD HH:mm:ss')))
console.log('dateFormatter:', T.dateFormatter(1567693791000))
console.log('dateFormatter:', T.dateFormatter(1567693791000))
// 时间间隔
console.log('timeInterval:', T.timeInterval(1566867166000, 1567693791000))

// 从url中获取参数
console.log('getUrlParam:', T.getUrlParam('ch'))

// 检查数组各项是否相等
console.log('isEqualItems:', T.isEqualItems([1, 1, 1]))

// 获取数组内的平均值
console.log('averageItems:', T.averageItems([1, 2, 3, 4, 5]))

// 获取数组内其中一项出现的次数
console.log('hasItemCount:', T.hasItemCount([1, 2, 3, 4, 5, 1, 4], 4))

// 递归展平数组
console.log('flattenArray:', T.flattenArray([1, 2, 3, [5, ['test'], 7, [9, 10]]]))

// 差集
console.log('difference:', T.difference([1, 2, 3, 5], [1, 2, 4]))

// 交集
console.log('intersection:', T.intersection([1, 2, 3], [1, 2, 4]))

// 删除字符串中的xml/html标签
console.log('delHTMLTags:', T.delHTMLTags('<div id="popupMask"><a href="#">test text</a></div>'))

// 首字母大写
console.log('capitalize:', T.capitalize('Trus'))

// 每个单词首字母大写
console.log('capitalizeAllWords:', T.capitalizeAllWords('patience. my old friend.'))

// 获取字节长度
console.log('getByteLength:', T.getByteLength('abcdefg'))
console.log('getByteLength:', T.getByteLength('中文测试'))

// 判断类型
console.log('is Set:', T.is(Set, new Set([1, 2, 3])))
console.log('is Map:', T.is(Map, new Map([['a', 6], ['b', 8]])))
console.log('is RegExp:', T.is(RegExp, /./g))
console.log('is Number:', T.is(Number, 'a'))
console.log('is Function:', T.is(Function, x => x === 1))

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
console.log('unique:', T.removeDuplicate(ARR, 'name'))
console.log('unique:', T.removeDuplicate(ARR01))

// 取数组中最大值 最小值
console.log('getMax:', T.getMax([1, 10.1, 3, 4]), ...ARR01)
console.log('getMin:', T.getMin([-1, 10.1, 3, 4]))

// 数字添加千分符
console.log('addYearMonthSort:', T.addThousandMark(30000))
// 数字添加万字符
console.log('addTenThousandMark:', T.addTenThousandMark(365000))

// 深拷贝引用数据类型
console.log('ARR:', ARR)
let deepCloneTest = T.deepClone(ARR)
deepCloneTest[0].name = 'T'
console.log('deepClone:', deepCloneTest, 'original ARR:', ARR)

// 只执行一次的函数
document.getElementById('onceBtn').addEventListener('click', T.onceCall(e => {
    console.log('onceFunc called just once', e)
}))

// Base64解码
console.log('decode:', T.decode('dGhpcyUyMGlzJTIwdGVzdCUyMCVFNSU5MCVBQiVFNiU5QyU4OSVFNCVCOCVBRCVFNiU5NiU4NyUyMDEyMw=='))

// Base64编码
console.log('encode:', T.encode('this is test 含有中文 123'))

// 点赞
document.getElementById('thumbsBtn').addEventListener('click', function() {
    if (!T.hasClass(this, 'thumbs-color')) {
        this.classList.add('thumbs', 'thumbs-color')
        this.addEventListener('animationend', () => {
            this.classList.remove('thumbs')
        })
    } else {
        this.classList.remove('thumbs-color')
    }
})

// 删除数组中符合条件的值 (基础数据类型)
console.log('delItem:', T.delItem([1, 2, 3, 4], 3))

const OBJ01 = {
    arr1: [163, 27, 191, 1515],
    arr2: [179, 33, 195, 0],
    arr3: [3351, 6272, 1717, 0],
    arr4: [36, 71, 673, 533],
    arr5: [0, 0, 1633, 0]
}
const ARR03 = [
    [163, 27, 191, 1515],
    [179, 33, 195, 0],
    [3351, 6272, 1717, 0],
    [36, 71, 673, 533],
    [0, 0, 1633, 0]
]
const ARR04 = [
    [163, 179, 3351, 36, 0],
    [27, 33, 6272, 71, 0],
    [191, 195, 1717, 673, 1633],
    [1515, 0, 0, 533, 0]
]

// 数组横向纵向相互转换
console.log('transformArrayVerticallyAndHorizontally:', T.transformArrayVerticallyAndHorizontally(OBJ01))

const ARR05 = [
    {
        firstId: 163,
        secondId: 27,
        thirdId: 191
    },
    {
        firstId: 163,
        secondId: 27,
        thirdId: 193
    },
    {
        firstId: 179,
        secondId: 33,
        thirdId: 169
    },
    {
        firstId: 179,
        secondId: 35,
        thirdId: 188
    },
    {
        firstId: 673,
        secondId: 1633,
        thirdId: 1515
    }
]

var ARR06 = [
    {
        id: 346,
        title: 'AUDI4',
        children: [
            {
                id: 358,
                title: 'AUDI6'
            },
            {
                id: 357,
                title: 'AUDI5'
            }
        ]
    },
    {
        id: 363,
        title: 'AUDI10',
        children: [
            {
                id: 345,
                title: 'AUDI3'
            },
            {
                id: 343,
                title: 'AUDI2'
            }
        ]
    },
    {
        id: 344,
        title: 'AUDI1'
    },
    {
        id: 274,
        title: 'BMW6',
        children: [
            {
                id: 275,
                title: 'BMW7',
                children: [
                    {
                        id: 277,
                        title: 'BMW9'
                    },
                    {
                        id: 276,
                        title: 'BMW8',
                        children: [
                            {
                                id: 293,
                                title: 'BMW10'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 278,
        title: 'BMW10',
        children: [
            {
                id: 279,
                title: 'BMW11',
                children: [
                    {
                        id: 268,
                        title: 'BMW2'
                    }
                ]
            }
        ]
    },
    {
        id: 283,
        title: 'BENZ3',
        children: [
            {
                id: 292,
                title: 'BENZ53',
                children: [
                    {
                        id: 290,
                        title: 'BENZ43'
                    },
                    {
                        id: 288,
                        title: 'BENZ33'
                    },
                    {
                        id: 291,
                        title: 'BENZ52'
                    }
                ]
            },
            {
                id: 287,
                title: 'BENZ32',
                children: [
                    {
                        id: 289,
                        title: 'BENZ42'
                    }
                ]
            }
        ]
    }
]
// 根据各级别id 递归定位到最终级别的对象中
console.log('locateOfPath:', T.locateOfPath(ARR06, [274, 275, 276, 293]))
console.log('locate:', T.locate(ARR06, 293))

// 判断传入的数据类型
console.log('whichType:', T.whichType(() => {}))

// 查找树结构中符合条件的目标项 并返回集合
console.log('findCondition:', T.findCondition(ARR06, v => v < 300))

// 递归展平树结构
console.log('flatten:', T.flattenTree(ARR06))

// 统计字符串中出现相同字母的数量
console.log('countStringItem:', T.countStringItem('This is a test'))

// 统计数组中出现相同数字的数量
console.log('countNumberItem:', T.countNumberItem([2, 5, 8, 7, 5, 5]))

// 过滤掉多余字段
console.log('filterField:', T.filterField(ARR06))

// 替换URL参数
document.getElementById('testBtn').addEventListener('click', () => {
    T.replaceURLParam('page', 16)
})

// 网络图片转Base64
T.iMGToBase64('https://qny.smzdm.com/202008/25/5f44cbc8d7145475.png', false)
