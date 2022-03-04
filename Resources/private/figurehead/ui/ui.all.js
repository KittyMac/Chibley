#define PAMPHLET_PREPROCESSOR

function initFieldWithCount(textDiv, countDiv, max) {
        
    textDiv.updateCounter = function () {
        var l = textDiv.value.length;
    
        countDiv.innerText = `${l} of ${max}`
        if (l <= max) {
            countDiv.style.color = "white";
        } else {
            countDiv.style.color = "ERRORRED()";
        }
    }
    
    textDiv.oninput = textDiv.updateCounter;
    textDiv.onchange = textDiv.updateCounter;
    textDiv.onkeyup = textDiv.updateCounter;
    
    textDiv.updateCounter();
}