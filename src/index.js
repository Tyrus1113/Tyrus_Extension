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

Ty.getSystemInfo(10)
// Ty.getSystemInfo(document.getElementById('deviceInfo'))

console.log(window.screen.width, window.screen.height)
console.log(window.screen.deviceXDPI)
