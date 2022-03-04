#define PAMPHLET_PREPROCESSOR

#include <./defines.js>

let globalTimers = [];

function initTimers() {
    setInterval(callTimers, 250);
}

function callTimers() {
    FOREACH(timer, globalTimers) {
        timer.counter -= 250;
        if (timer.counter <= 0) {
            timer.counter = timer.delay;
            timer.callback();
        }
    }
}

function addTimer(ms, callback) {
    globalTimers.push({
        callback: callback,
        delay: ms,
        counter: ms,
    });
}

function clearTimer(callback) {
    FOREACH(timer,globalTimers) {
        if (timer.callback == callback) {
            removeOne(globalTimers, timer);
        }
    }
}

function clearAllTimer() {
    globalTimers = [];
}