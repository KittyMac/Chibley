#define PAMPHLET_PREPROCESSOR

#define UNDEFINED(X) ((X) == undefined || (X) === "")
#define EXISTS(X) ((X) != undefined && (X) !== "" && (X) !== "undefined")

#define FOREACH(X,Y) for (let _arr = (Y != undefined ? Y : []), _idx = 0, X = undefined; X = _arr[_idx], _idx < _arr.length; _idx++)
#define FOREACHREV(X,Y) for (let _arr = (Y != undefined ? Y : []), _idx = _arr.length - 1, X = undefined; X = _arr[_idx], _idx >= 0; _idx--)
