#define PAMPHLET_PREPROCESSOR

function sendIfModified(command, ifModifiedString, blocking, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
			if (this.status == 503) {
				window.location.href = "./"
			} else {
                if (this.status != 200) {
                    if (this.responseText != undefined && this.responseText.length > 0) {
                        //alert(this.responseText);
                    } else if (this.statusText != undefined) {
                        //alert(this.responseText);
                    }
                }
                                
	            if (callback != undefined) {
	                callback(this);
	            }
			}
        }
    };
    xhttp.open("POST", "./");
    
    let sessionId = sessionStorage.getItem("Session-Id");
    if (sessionId != undefined) {
        xhttp.setRequestHeader("Session-Id", sessionId);
    }
    
    xhttp.setRequestHeader("Flynn-Tag", "hotload");
    xhttp.setRequestHeader("Pragma", "no-cache");
    xhttp.setRequestHeader("Expires", "-1");
    xhttp.setRequestHeader("Cache-Control", "no-cache");
    if (ifModifiedString != undefined) {
        xhttp.setRequestHeader("If-Modified-Since", ifModifiedString);
    }
    
    if (command instanceof FormData) {
        xhttp.send(command);
    } else {
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(command));
    }
}

function send(command, callback) {
    return sendIfModified(command, undefined, false, callback)
}

function endSession(callback) {
	send({ "endUserSession":true }, function() {
        callback();
	})
}