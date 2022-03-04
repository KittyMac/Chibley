#define PAMPHLET_PREPROCESSOR

#include <./defines.js>

function isDarkMode() {
    if (window.matchMedia &&  window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return true;
    }
    return false;
}

function watchDarkMode(callback) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        callback(event.matches);
    });
}

function print(s) {
    console.log(s);
}

function hide(div) {
    div.style.display = "none";
}

function show(div) {
    div.style.display = "flex";
}

function hashCode(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}

function onRangeChange(r,f) {
  var n,c,m;
  r.addEventListener("input",function(e){n=1;c=e.target.value;if(c!=m)f(e);m=c;});
  r.addEventListener("change",function(e){if(!n)f(e);});
}

function rad2Deg(radians) {
    var pi = Math.PI;
    return radians * (180/pi);
}

function deg2Rad(degrees) {
    var pi = Math.PI;
    return degrees * (pi/180);
}

function rand01() {
    return Math.random();
}

function randSign() {
    if (Math.random() < 0.5) {
        return -1;
    }
    return 1;
}

function randomFromArray(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function getChild(div, id) {
	return div.getElementById(id)
}

function insertAt(arr, idx, obj) {
    arr.splice(idx, 0, obj);
}

function removeAt(arr, idx) {
    arr.splice(idx, 1);
    return arr;
}

function removeOne(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function removeAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
}

function removeAllChildren(div) {
	while (div.firstChild) {
		div.removeChild(div.firstChild);
	}
}

function removeFromParent(div) {
    if (div.parentElement) {
        div.parentElement.removeChild(div);
    }
}

function disableDiv(div) {
    div.style.opacity = 0.5;
    div.style.pointerEvents = "none";
}

function enableDiv(div) {
    div.style.opacity = 1.0;
    div.style.pointerEvents = "auto";
}

function replaceHtml(div, html) {
    div.innerHTML = html;
    runAllScriptsIn(div);
}

function insertHtml(div, html) {
    let n = div.children.length;
    div.insertAdjacentHTML("beforeend", html);
    for (var i = n; i < div.children.length; i++) {
        runAllScriptsIn(div.children[i]);
    }
    return div.children[n];
}

function runAllScriptsIn(div) {
    if (div.type == "text/javascript") {
        eval(div.innerHTML)
    }
    
    var scripts = Array.from(div.getElementsByTagName('script'));
    FOREACH (child,scripts) {
        if (child.type == undefined || child.type == "text/javascript") {
            eval(child.innerHTML)
        }
    }
}

function prettyDate(d) {
    // https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
    return new Date(d).toLocaleDateString("en-US");
}

function lerp(a, b, t) {
    return a * (1-t) + b * t
}

function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}

function clamp01(num) {
    return num <= 0 ? 0 : num >= 1 ? 1 : num;
}

function parseVec(sector) {
    if (sector == undefined) {
        return {x:0, y:0};
    }
    var a = sector.split(',');
    return {x:parseFloat(a[0]), y:parseFloat(a[1])};
}

function distanceSq(p0, p1) {
    return (p1.x - p0.x) * (p1.x - p0.x) + (p1.y - p0.y) * (p1.y - p0.y);
}

function allElementsFromPoint(x, y) {
    // https://stackoverflow.com/questions/8813051/determine-which-element-the-mouse-pointer-is-on-top-of-in-javascript
    var element, elements = [];
    var old_visibility = [];
    while (true) {
        element = document.elementFromPoint(x, y);
        if (!element || element === document.documentElement) {
            break;
        }
        elements.push(element);
        old_visibility.push(element.style.visibility);
        element.style.visibility = 'hidden';
    }
    for (var k = 0; k < elements.length; k++) {
        elements[k].style.visibility = old_visibility[k];
    }
    elements.reverse();
    return elements;
}

function textFieldOnReturn(div, callback) {
    div.addEventListener("keyup", function(event) {
    	if (event.keyCode === 13) {
    		event.preventDefault();
    		callback();
    	}
    });
}

function textFieldOnChange(div, callback) {
    div.addEventListener("keyup", function(event) {
        clearTimeout(div.searchTimeout);
    	if (event.keyCode === 13) {
    		event.preventDefault();
    		callback();
    	} else {
			div.searchTimeout = setTimeout(function(){ callback() }, 650);
    	}
    });
}

function textFieldOnEnter(div, callback) {
    div.addEventListener("keyup", function(event) {
    	if (event.keyCode === 13) {
    		event.preventDefault();
    		callback();
    	}
    });
}

function UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function UNIQUEID() {
    return 'bxxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function stripHtml(html) {
    print(html)
    let doc = new DOMParser().parseFromString(html, 'text/html');
    print(doc.body.textContent)
    return doc.body.textContent || "";
}

function unstripHtml(x) {
    return x.replace("&lt;", "<");
}

function clone(x) {
    return JSON.parse(JSON.stringify(x));
}

function isSmallScreen() {
    return (window.innerWidth < window.innerHeight || window.innerWidth < 900);
}
