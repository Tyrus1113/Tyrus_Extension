import './Instance_Ex'

// 解决错误提示: Module parse failed: Unexpected character '#' (1:0)
// 在 import 路径之前添加loader
// import 'style-loader!css-loader!sass-loader!../static/style/main.scss'
// 在webpack resolve.alias 给static配置绝对路径标识 ^
// require('^/style/main.scss')
import '^/style/main.scss'

if (module.hot) {
    // 解决hot reload报错问题
    module.hot.accept()
}
