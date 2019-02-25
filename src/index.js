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

Ty.getSystemInfo(document.getElementById('deviceInfo'))

function showNotice() {   
    Notification.requestPermission(function(perm) {  
        if (perm === 'granted') {  
            var notification = new Notification('这是一个通知撒:', {  
                dir: 'auto',  
                lang: 'hi',  
                tag: 'testTag',  
                icon: 'https://static.cnblogs.com/images/adminlogo.gif',  
                body: '通知content'  
            })  
        }  
    })  
} 
showNotice()
console.log(window.screen.width, window.screen.height)
console.log(window.screen.deviceXDPI)
