import Ty from './Tyrus_Extension'
import TEST from './test_Extension'

// 解决错误提示: Module parse failed: Unexpected character '#' (1:0)
// 在 import 路径之前添加loader
import 'style-loader!css-loader!sass-loader!../static/style/main.scss'

if (module.hot) {
    // 解决hot reload报错问题
    module.hot.accept()
}
// test_Extension.js
TEST()

var arr = [10000, 20000, 30000, 4000, 5000]
var arr1 = [40, 20, 30, 80, 90]
var arr2 = [3, 45, 76, 1, 10, 20]
var arr3 = [1, 2, 3, 1, 1, 3]
var time = ['2019-1', '2019-1', '2019-3', '2018-12']
var str = ''
var obj = {
    a: 10
}
console.log('test :', Ty.getSameItems('arr'))
