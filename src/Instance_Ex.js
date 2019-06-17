/*
 * @instance
 * @Author: Tyrus
 */
import Ty from './Tyrus_Extension'

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

Ty.getImageColor({
    url: 'https://s3.ifanr.com/wp-content/uploads/2019/03/27092132_4843.jpg!260',
    canvas: {
        el: document.getElementById('canvas'),
        width: 200,
        height: 100
    },
    el: document.getElementById('canv'),
    direction: '45deg',
    col1: {
        x: 30,
        y: 30
    },
    col2: {
        x: 170,
        y: 70
    }
})

window.addEventListener('scroll', () => {
    // console.log('scrollTopX :', scrollTopX())
    console.log('isScrollBorwserBottom :', Ty.isScrollBorwserBottom())
}, false)

Ty.setRem()
window.onresize = Ty.setRem
