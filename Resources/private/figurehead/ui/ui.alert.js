#define PAMPHLET_PREPROCESSOR

#include <../utility/defines.js>

var alertsQueue = [];

function handleAlertsQueue() {
    
    let animateAlert = function(div, t) {
	    div.style.height = (t * div.actualHeight) + "px";
        div.style.minHeight = div.style.height;
    }
    
    var openContainer = function() {
        if (alertsContainer.isOpen == false) {
            alertsContainer.isOpen = true;
            
            alertsContainer.style.display = "flex";
            Laba.cancel(alertsContainer);
            Laba.animate(alertsContainer, "f1", undefined, function() { });
        }
    }
    var closeContainer = function() {
        if (alertsContainer.isOpen == true) {
            alertsContainer.isOpen = false;
            
            Laba.cancel(alertsContainer);
            Laba.animate(alertsContainer, "f0", undefined, function() {
                alertsContainer.style.display = "none";
            });
        }
    }
    var closeAlert = function (uniqueID) {
        var alertDiv = document.getElementById(uniqueID);
        if EXISTS(alertDiv) {
            if (alertsQueue.length == 0) {
                closeContainer();
            }
        	Laba.animate(alertDiv, "!f0", function(div, t) {
                animateAlert(div, 1.0 - t);
        	}, function() {
        	    removeFromParent(alertDiv);
                handleAlertsQueue();
        	});
        }
    }
    
    var openAlert = function (alert) {
        var askValue = alert.value;
        var ask = alert.ask;
        var message = alert.message;
        var buttons = alert.buttons;
        var callbacks = alert.callbacks;
        
        var uniqueID = UNIQUEID();
        var buttonsHtml = '';
        var first = true;
        for (var idx = buttons.length-1; idx >= 0; idx -= 1) {
            var btnName = buttons[idx];
            if (first) {
                first = false;
                buttonsHtml += `ALERT_BUTTON_CONTROL_DEFAULT(${uniqueID}Btn${idx},${btnName})`;
            } else {
                buttonsHtml += `ALERT_BUTTON_CONTROL(${uniqueID}Btn${idx},${btnName})`;
            }
        }
        var alertHtml = "";
        
        if (ask) {
            alertHtml = `ASK(${uniqueID},${message},${buttonsHtml})`;
        } else {
            alertHtml = `ALERT(${uniqueID},${message},${buttonsHtml})`;
        }
        
        insertHtml(alertsContainer, alertHtml);
        
        var input = document.getElementById(uniqueID + "Value");
        if EXISTS(input) {
            input.callback = callbacks[callbacks.length-1];
            textFieldOnEnter(input, function() {
                let value = undefined;
                if EXISTS(input) {
                    value = input.value;
                }
                if EXISTS(input.callback) {
                    input.callback(value);
                }
                closeAlert(uniqueID);
            });
            input.value = askValue;
            input.focus();
        }
        
        for (var idx = callbacks.length-1; idx >= 0; idx -= 1) {
            var button0 = document.getElementById(uniqueID + "Btn" + idx);
            button0.callback = callbacks[idx];
            button0.addEventListener("mouseup", function(evt) {
                let value = undefined;
                if EXISTS(input) {
                    value = input.value;
                }
                if EXISTS(evt.currentTarget.callback) {
                    evt.currentTarget.callback(value);
                }
                closeAlert(uniqueID);
            });
        }
        
        requestAnimationFrame(function() {
            var alertDiv = document.getElementById(uniqueID);
        
            alertDiv.actualHeight = alertDiv.offsetHeight;
        	Laba.animate(alertDiv, "!f1", function(div, t) {
        	    animateAlert(div, t);
        	}, function(div) {
                div.style.height = "";
        	});
        });
    }
    
    if (alertsQueue.length == 0) {
        closeContainer();
        return;
    }
    
    openContainer();
    
    if (alertsContainer.children.length == 0) {
        openAlert(alertsQueue.shift());
    }
}

function alert(message, buttons, callbacks) {
    if UNDEFINED(message) {
        return;
    }
    
    if UNDEFINED(alertsContainer.isOpen) {
        alertsContainer.isOpen = false;
    }
    
    if UNDEFINED(buttons) {
        buttons = ["Ok"];
    }
    if UNDEFINED(callbacks) {
        callbacks = [undefined];
    }
    
    message = message.replaceAll("\n", "<br>");
    
    alertsQueue.push({
        message:message,
        buttons:buttons,
        callbacks:callbacks,
    })
    
    handleAlertsQueue();
}


function ask(message, value, buttons, callbacks) {
    if UNDEFINED(message) {
        return;
    }
    
    if UNDEFINED(alertsContainer.isOpen) {
        alertsContainer.isOpen = false;
    }
    
    if UNDEFINED(buttons) {
        buttons = ["Ok"];
    }
    if UNDEFINED(callbacks) {
        callbacks = [undefined];
    }
    
    message = message.replaceAll("\n", "<br>");
    
    alertsQueue.push({
        value: value,
        ask:true,
        message:message,
        buttons:buttons,
        callbacks:callbacks,
    })
    
    handleAlertsQueue();
}