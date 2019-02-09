import _ from 'lodash'
import '../static/style/main.css'

import Ty from './Tyrus_Extension'
import TEST from './test_Extension'

function createDomElement() {
	let dom = document.createElement('div')
	dom.innerHTML = _.join(['123', '456', '789'], '')
	return dom
}

let divDom = createDomElement()

document.body.appendChild(divDom)


// test_Extension.js
TEST()