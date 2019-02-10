import Ty from './Tyrus_Extension'
import TEST from './test_Extension'

import '../static/style/main.css'
if (module.hot) {
	// 解决hot reload报错问题
	module.hot.accept()
}
// test_Extension.js
TEST()