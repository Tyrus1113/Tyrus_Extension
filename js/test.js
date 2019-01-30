/*
 * @test
 * @Author: Tyrus
 * @Date: 2019-01-27 16:09:25
 * @Last Modified by: Tyrus
 * @Last Modified time: 2019-01-28
 */

var numArr = [4, 6, 7, 9, 10, 21, 26]

// 返回数组中所有元素都大于 18 的元素
let filter = numArr.filter(item => {return item > 8})
console.log('filter:', filter)

// 检测数组的所有元素是否都大于等于 98
let every = numArr.every(item => {return item > 98})
console.log('every:', every)

// 检测数组中是否有元素大于 8
let some = numArr.some(item => {return item > 8})
console.log('some:', some)

// 计算数组元素相加后的总和
let reduce = numArr.reduce((total, num) => {return total + num})
console.log('reduce:', reduce)

// 获取数组中大于 8的第一个 元素
let find = numArr.find(item => {return item > 8})
console.log('find:', find)

// ---------------------------------------------
console.log('-------------')
const regStr = 'ffawtehidsafhiadf hi adfdsasdfdsl'
const regStr1 = 'pati*ence'
console.log('/\bhi\b/:', /\bhi\b/.test(regStr))
console.log('/\bhi\b.*asdf/:', /\bhi\b.*asdf/.test(regStr))
console.log('/\bpati*\*ence\b/:', /\bpati*\*ence\b/.test(regStr1))
console.log('-------------')
// ---------------------------------------------

let p1 = Promise.resolve(123)
let p2 = Promise.resolve('hello')
let p3 = Promise.resolve('success')
let p4 = Promise.reject('error')
Promise.all([p1, p2, p3, p4]).then(result => {
    console.log('result:', result)
}).catch(result => {
    console.log('result:', result)
})

function sleep(wait) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(wait)
        }, wait)
    })
}
let k1 = sleep(500)
let k2 = sleep(800)
let k3 = sleep(1000)
Promise.race([k1, k2, k3]).then(result => {
    console.log('race - result:', result)
})
sleep(100).then(result => {
    return sleep(result + 100)
}).then(result02 => {
    return sleep(result02 + 100)
}).then(result03 => {
    console.log('sleep - result03:', result03)
})

async function demo() {
    let result01 = await sleep(100)
    let result02 = await sleep(result01 + 100)
    let result03 = await sleep(result02 + 100)
    return result03
}
demo().then(result => {
    console.log('demo - result:', result)
})

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('p - error')
    }, 1000)
})
async function tryCatch(_p) {
    try {
        let result = await p
    } catch (e) {
        console.log(e)
    }
}
tryCatch()

// ---------------------------------------------

let obj = {
    test: 'test',
    name: 'asd'
}
Object.defineProperty(obj, 'newKey', {
    // 设置属性的值 默认undefined
    value: 'hello',
    // 值是否可以被重写 默认false不能被重写
    writable: false,
    // 目标属性是否可被枚举 默认false不能被枚举
    enumerable: false,
    // 目标属性是否可以删除或是否可以再次修改特性
    configurable: false
})
for (const attr in obj) {
    console.log('attr:', attr)
}
delete obj.newKey
console.log('obj.newkey:', obj.newKey)

var obj1 = {
    test: 'test'
}
let initValue = 'hello'
Object.defineProperty(obj1, 'newKey', {
    // 当使用getter setter方法 不允许使用writable和value属性
    get() {
        // 当获取值得时候触发的函数
        return `${initValue} world`
    },
    set(value) {
        // 当设置值的时候触发的函数 设置的新值通过参数value拿到
        initValue = value
    },
})
console.log('obj1.newkey:', obj1.newKey)

function Archiver() {
    var temperature = null
    var archive = []
    Object.defineProperty(this, 'temperature', {
        get: function() {
            console.log('temperature - get')
            return temperature
        },
        set: function(value) {
            temperature = value
            archive.push({
                val: temperature
            })
        }
    })    
    this.getArchive = function() {
        return archive
    }
}
var arc = new Archiver()
arc.temperature
arc.temperature = 1
arc.temperature = 2
console.log('arc.getArchive():', arc.getArchive())

