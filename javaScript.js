window.onload = function () {
    // slideTransition ----------------------------------------------------
    open_Transition.onclick = function () {
        slideTransitionMain.style.width = "300px";
        this.style.marginLeft = "300px";
        this.style.display = 'none';
    }
    close_Transition.onclick = function () {
        slideTransitionMain.style.width = "0";
        open_Transition.style.marginLeft = "0";
        open_Transition.style.display = 'block';
    }

    // slideTransition end ----------------------------------------------------

    // slide ----------------------------------------------------
    var minWidth = 0;
    var maxWidth = 700;
    var time = 1000;
    var timer = null;
    var toggled = false;
    var slide = document.getElementById('slide');
    var slBox = document.getElementById('slideBox');

    slBox.style.width = minWidth + 'px';
    slide.onclick = function () {
        clearInterval (timer);
        var instanceWidth = parseInt(slBox.style.width);
        var init = (new Date()).getTime();
        var width = (toggled = !toggled) ? maxWidth : minWidth;

        var disp = width - parseInt(slBox.style.width);
        timer = setInterval (function () {
            var instance = (new Date()).getTime() - init;
            if (instance < time) {
                var pos = Math.floor(disp * instance / time);
                result = instanceWidth + pos;
                slBox.style.width = result + 'px';
                document.getElementById('log').innerHTML = 'Current Width:<p>' + result + '</p> Current Time:<p>' + instance + '</p>';
            } else {
                slBox.style.width = width + 'px';
                clearInterval (timer);
                // slide.innerHTML = toggled ? 'slide close' : 'slide open';
                document.getElementById('log').innerHTML = 'Current Width:<p>' + width + '</p> Current Time:<p>' + time + '</p>';
            }
        },1);
    }
    
    // slide end ----------------------------------------------------

    // full screen ---------------------------------------------
    var fs = document.getElementById('fullScreen');
    fs.onclick = function () {
        var docElm = document.documentElement;
        //W3C
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        //FireFox
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        }
        //Chrome等
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
        //IE11
        else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }

        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
    document.addEventListener ('fullscreenchange',function (e) {
        console.log('webkitfullscreenchange',e);
    });
    // full screen end ---------------------------------------------

    // getLocation
    getLoc.onclick = function () {

    }
    // getLocation end 
    















} // --- window.onload end ---
