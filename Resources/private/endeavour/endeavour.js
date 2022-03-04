#define PAMPHLET_PREPROCESSOR

#include <./endeavour.html>

let endeavour = {}

endeavour.send = function(api, callback) {
    send(api, function(xhttp) {
        let json = xhttp.getResponseHeader("Service-Response");
        if (json != undefined) {
            let response = JSON.parse(json);
            callback(xhttp, response);
        } else {
            callback(xhttp, undefined);
        }
    });
}

endeavour.new = function(callback) {
    endeavour.send({
        "service": "EndeavourService",
        "command": "new"
    }, callback);
}

endeavour.join = function(documentUUID, callback) {
    endeavour.send({
        "service": "EndeavourService",
        "command": "join",
        "documentUUID": documentUUID
    }, callback);
}

endeavour.leave = function(documentUUID, callback) {
    endeavour.send({
        "service": "EndeavourService",
        "command": "leave",
        "documentUUID": documentUUID
    }, callback);
}