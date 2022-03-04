#define PAMPHLET_PREPROCESSOR

#include <./figurehead.html>

#include <./ui/ui.all.js>

#include <./ui/ui.all.js>
#include <./ui/ui.alert.js>
#include <./ui/ui.button.js>

#include <./utility/laba.js>
#include <./utility/utility.js>
#include <./utility/navigation.js>
#include <./utility/timer.js>

function InitFigurehead() {
    initTimers();
    
    function animate() {
        Laba.update()
        window.requestAnimationFrame(animate);
    }
    animate();
}