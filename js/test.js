/*
 * @test
 * @Author: Tyrus
 * @Date: 2019-01-27 16:09:25
 * @Last Modified by: Tyrus
 * @Last Modified time: 2019-01-27
 */

 // 通用验证
/*
    schema 验证规则
    validate 通用验证函数
*/
var schema = {
    first : {
        required : true
    },
    second : {
        required : true
    }
}
function validate (schema, value) {

    for (var field in schema) {

        if (schema[field].required) {

            if (!value[field]) {
                return false
            }
        }
    }
    return true
}
// 验证
console.log(validate(schema, {
    first : 'Bruce',
    second: 'Wayne'
}))



// 原生fetch
fetch('https://static.segmentfault.com/sponsor/20180731.json', {
    method: 'GET',
    mode: 'cors',
    // credentials: 'include' // 强制提交cookie
})
.then(res => {
    return res.json()
})
.then(res => {
    // console.log(res)
})
.catch(err => {
    // console.log(err)
})

const regStr = 'asdfghjkqwehidsafhiadf hi adfdsasdfdsl'
console.log('/\bhi\b/:', /\bhi\b/.test(regStr))
console.log('/\bhi\b.*asdf/:', /\bhi\b.*asdf/.test(regStr))


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