/*
 * @test
 * @Author: Tyrus
 * @Date: 2019-01-27 16:09:25
 * @Last Modified by: Tyrus
 * @Last Modified time: 2019-02-08
 */

function test() {

	const testArr = [4, 6, 7, 9, 10, 21, 26]
	const testStr = 'Welcome to Ty_Extension!'
	// 返回数组中所有元素都大于 18 的元素
	let filter = testArr.filter(item => item > 18)
	console.log('filter:', filter)
    
	// 检测数组的所有元素是否都大于等于 98
	let every = testArr.every(item => item > 98)
	console.log('every:', every)
    
	// 检测数组中是否有元素大于 8
	let some = testArr.some(item => item > 8)
	console.log('some:', some)
    
	// 计算数组元素相加后的总和
	let reduce = testArr.reduce((total, num) => total + num)
	console.log('reduce:', reduce)
    
	// 获取数组中大于 8的第一个 元素
	let find = testArr.find(item => item > 8)
	console.log('find:', find)
    
	// 判断数组中是否含有指定的值 6
	let includes = testArr.includes(6)
	console.log('includes:', includes)
	let includesStr = testStr.includes('to')
	console.log('includesStr:', includesStr)
    
	// ---------------------------------------------
	console.log('-------------')
    
	const regStr = 'ffawtehid sa fhiadf hi adfdsasdfdsl'
	const patience = 'pati*ence tience'
	const chapter = 'Chapter 991'
	const html = `<div>
                        <h1>ABCDEFG</h1>
                    </div>`
	console.log('regStr:', /\bhi/.test(regStr))
	console.log('regStr:', /\bhi\b.*asdf/.test(regStr))
	console.log('regStr:', regStr.match(/sa/gi))
	console.log('patience:', /pati*\*ence/.test(regStr))
	console.log('patience tience:', patience.match(/\bti/gi))
	console.log('Chapter:', /^Chapter [1-9][0-9]{0,1}/.test(chapter))
	console.log('Chapter:', chapter.match(/^Chapter [1-9][0-9]{0,1}/))
	console.log('html - replace:', html.replace(/<[^\/]\w+>/g, 'span'))
    
	let regNum1 = '1223334444'
	console.log('regNum1:', regNum1.match(/\d{2}/g))
	console.log('regNum1:', regNum1.match(/[124]/g))
    
	let regStr1 = 'abc123de45fgh6789qqq111'
	let regStr2 = 'abcdefghijkl'
	console.log('regStr1:', regStr1.match(/\d+/g))
	console.log('regStr2:', regStr2.match(/[a-f]/g))
	console.log('regStr2:', regStr2.match(/.{3}/g))
    
	let space = '  space '
	console.log('space:', space.match(/^\s+|\s+$/g))
	console.log('space:', space.replace(/^\s+|\s+$/g, '空格'))
	console.log('space - res:', `(${space.replace(/^\s+|\s+/g, '')})`)
    
	let age = '18'
	console.log('age:', /(18|19)|([2-5]\d)|(6[0-5])/.test(age))
    
	const caStr = '123asd 45 321 askd89 00'
	let tmp = ''
	const caArr = []
	for (let i = 0; i < caStr.length; i++) {
		if (caStr.charAt(i) >= '0' && caStr.charAt(i) <= '9') {
			tmp += caStr.charAt(i)
		} else {
			if (tmp) {
				caArr.push(tmp)
				tmp = ''
			}
		}
	}
	if (tmp) {
		caArr.push(tmp)
		tmp = ''
	}
	console.log('caArr:', caArr)
	console.log('caStr:', caStr.match(/\d+/g))
    
	let tel = '0532-83846666'
	let _tel = /(\d{2,3}-)?[1-9]\d{7}(-\d{1,4})?/
	console.log('tel:', _tel.test(tel))
    
	let mail = 'asd@163.com'
	let _mail = /^\w+@[a-z0-9]+\.[a-z]+$/i
	console.log('mail:', _mail.test(mail))
    
	let phone = '13912341234'
	let _phone = /^1[35789]\d{9}$/
	console.log('phone:', _phone.test(phone))
    
	console.log('-------------')
    
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
	// delete obj.newKey
	// console.log('obj.newkey:', obj.newKey)
    
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
    
	// ---------------------------------------------
    
	let numbers = [5, 4, 13, 9, 5]
	let setStr = 'ababbc'
    
	let max = Math.max.apply(null, numbers)
	console.log('max:', max)
    
	const _arr = new Set(numbers)
	const _setStr = [...new Set(setStr)].join('')
	console.log('_setStr:', _setStr)
	// const _arr = []
	// for (let i = 0; i < numbers.length; i++) {
	//     for (let j = i + 1; j < numbers.length; j++) {
	//         if (numbers[i] === numbers[j]) {
	//             ++ i
	//         }
	//     }
	//     _arr.push(numbers[i])
	// }
	console.log('uni - numbers:', _arr)
    
	function foo(a, b, c) {
		console.log('spread_arr:', a, b, c)
	}
	const spread_arr = [0, 1, 2, 3]
	foo(...spread_arr)
    
	const spread_arr1 = [...spread_arr, 5, 6, 7]
	console.log('spread:', spread_arr1, spread_arr1[0])
    
	const spread_arr3 = [...spread_arr]
	console.log('spread_arr3:', spread_arr3)
	// 返回false 深拷贝数组 spread_arr,spread_arr3指向不同的数组
	console.log('deep copy:', spread_arr === spread_arr3)
    
	function rest(...args) {
		console.log('args:', args)
	}
	rest('params1', 'params2', 'params3')
    
	const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries']
	if (redFruits.includes('apple')) {
		console.log('redFruits')
	}
    
	// ---------------------------------------------
    
	const unique_a = [1, 2, 3]
	const unique_b = [2, 4, 5]
    
	let union = unique_a.concat(unique_b.filter(_v => {
		return unique_a.indexOf(_v) === -1
	}))
	console.log('union:', union)
    
	let intersection = unique_a.filter(_v => {
		return unique_b.indexOf(_v) > -1
	})
	console.log('intersection:', intersection)
    
	let difference = unique_a.filter(_v => {
		return unique_b.indexOf(_v) === -1
	})
	console.log('difference:', difference)
    
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
    
	// function sleep(wait) {
	//     return new Promise((res, rej) => {
	//         setTimeout(() => {
	//             res(wait)
	//         }, wait)
	//     })
	// }
	// let k1 = sleep(500)
	// let k2 = sleep(800)
	// let k3 = sleep(1000)
	// Promise.race([k1, k2, k3]).then(result => {
	//     console.log('race - result:', result)
	// })
	// sleep(100).then(result => {
	//     return sleep(result + 100)
	// }).then(result02 => {
	//     return sleep(result02 + 100)
	// }).then(result03 => {
	//     console.log('sleep - result03:', result03)
	// })
    
	// async function demo() {
	//     let result01 = await sleep(100)
	//     let result02 = await sleep(result01 + 100)
	//     let result03 = await sleep(result02 + 100)
	//     return result03
	// }
	// demo().then(result => {
	//     console.log('demo - result:', result)
	// })
    
	// let p = new Promise((resolve, reject) => {
	//     setTimeout(() => {
	//         reject('p - error')
	//     }, 1000)
	// })
	// async function tryCatch(_p) {
	//     try {
	//         let result = await p
	//     } catch (e) {
	//         console.log(e)
	//     }
	// }
	// tryCatch()
}

export default test