#define PAMPHLET_PREPROCESSOR

#include <../utility/defines.js>

function initButton(div, valueDiv, callback) {
    if (div.length != undefined) {
        FOREACH(each,div) {
            each.addEventListener("mouseup", function(evt) {
                if (callback != undefined) {
                    callback(this);
                }
            });
        }
    } else {
        div.addEventListener("mouseup", function(evt) {
            if (callback != undefined) {
                callback(this);
            }
        });
    }
    
}