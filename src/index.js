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
// TEST()

Ty.getSystemInfo(document.getElementById('deviceInfo'))
console.log(window.screen.width, window.screen.height)
console.log(window.screen.deviceXDPI)

console.log('Ty.openArrayItem():', Ty.openDeepArrayItem([1, [2, 3, [5, [6, [7]]]]]))

const options = {
    body: 'Welcome to Tyrus_Extension ~',
    icon: '/favicon_ty.ico'
}
Ty.sendNotification('Tyrus_Extension', options, function() {
    console.log('_cli')
})

const canvas = {
    el: document.getElementById('canvas'),
    width: 200,
    height: 100
}
const col1 = {
    x: 30,
    y: 30
}
const col2 = {
    x: 170,
    y: 70
}
Ty.getImageColor({
    url: 'https://s3.ifanr.com/wp-content/uploads/2019/03/27092132_4843.jpg!260',
    canvas,
    el: document.getElementById('canv'),
    direction: '45deg',
    col1,
    col2
})
