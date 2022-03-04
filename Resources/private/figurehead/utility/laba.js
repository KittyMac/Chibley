#define PAMPHLET_PREPROCESSOR

/* The Labal langauge is very minimalistic. Each command is a single, non numerical character (excluding +/-). 
 * Each command can optionally be followed by a single numerical value, which makes sense only in the context of the command. For example,
 * "<120" would mean animate left 120 units.
 * 
 * x move to x position
 * y move to y position
 * 
 * < move left
 * > move right
 * ^ move up
 * v move down
 * 
 * f alpha fade
 * 
 * s uniform scale
 * 
 * r roll
 * p pitch
 * w yaw
 * 
 * d duration for current pipe
 * 
 * D staggaered duration based on sibling/child index
 * 
 * L loop (absolute) this segment (value is number of times to loop, -1 means loop infinitely)
 * 
 * l loop (relative) this segment (value is number of times to loop, -1 means loop infinitely)
 * 
 * e easing (we allow e# for shorthand or full easeInOutQuad)
 * 
 * | pipe animations (chain)
 *
 * , pipe animations with built in delay
 * 
 * ! invert an action (instead of move left, its move to current position from the right)
 * 
 * [] concurrent Laba animations ( example: [>d2][!fd1] )
 * 
 * * means a choreographed routine; the * is followed by a series of operators which represent the preprogrammed actions
 * 
 */

function StringBuilder()
{
	var strings = [];
	
	this.length = function() {
		var l = 0
		for(var i = 0; i < strings.length; i++){
			l += strings[i].length;
		}
		return l;
	}
	
	this.setLength = function(l) {
		// we need to collapse the strings, then trim
		let newString = strings.join("").substring(0, l);
		strings = [];
		strings[0] = newString;
	}
	
	this.insert = function(i, s) {
		let newString = strings.join("");
		strings = [];
		strings[0] = newString.substring(0,i);
		strings[1] = s;
		strings[2] = newString.substring(i);
	}
	
	this.delete = function(s, e) {
		let newString = strings.join("");
		strings = [];
		strings[0] = newString.substring(0,s);
		strings[1] = newString.substring(e+1);
	}

	this.append = function (string)
	{
		string = verify(string);
		if (string.length > 0) strings[strings.length] = string;
	};

	this.appendLine = function (string)
	{
		string = verify(string);
		if (this.isEmpty())
		{
			if (string.length > 0) strings[strings.length] = string;
			else return;
		}
		else strings[strings.length] = string.length > 0 ? "\r\n" + string : "\r\n";
	};

	this.clear = function () { strings = []; };

	this.isEmpty = function () { return strings.length == 0; };

	this.toString = function () { return strings.join(""); };

	var verify = function (string)
	{
		if (!defined(string)) return "";
		if (getType(string) != getType(new String())) return String(string);
		return string;
	};

	var defined = function (el)
	{
		// Changed per Ryan O'Hara's comment:
		return el != undefined && typeof(el) != "undefined";
	};

	var getType = function (instance)
	{
		if (!defined(instance.constructor)) throw Error("Unexpected object type");
		var type = String(instance.constructor).match(/function\s+(\w+)/);

		return defined(type) ? type[1] : "undefined";
	};
};

String.prototype.format = function() {
	a = this;
	for (k in arguments) {
		a = a.replace("{" + k + "}", arguments[k])
	}
	return a
}

Math.radians = function(degrees) {
	return degrees * Math.PI / 180;
};

Math.degrees = function(radians) {
	return radians * 180 / Math.PI;
};

function easeLinear(val) {
	let start = 0.0;
	let end = 1.0;
    return start + (end - start) * val;
}

function easeInQuad(val) {
    let start = 0.0;
    var end = 1.0;
    end -= start;
    return end * val * val + start;
}

function easeOutQuad(val) {
    let start = 0.0;
    var end = 1.0;
    end -= start;
    return -end * val * (val - 2) + start;
}

function easeInOutQuad(val) {
    let start = 0.0;
    var end = 1.0;
    val /= 0.5;
    end -= start;
    if (val < 1) return end / 2 * val * val + start;
    val--;
    return -end / 2 * (val * (val - 2) - 1) + start;
}

function easeInCubic(val) {
    let start = 0.0;
    var end = 1.0;
    end -= start;
    return end * val * val * val + start;
}

function easeOutCubic(val) {
    let start = 0.0;
    var end = 1.0;
    val--;
    end -= start;
    return end * (val * val * val + 1) + start;
}

function easeInOutCubic(val) {
    let start = 0.0;
    var end = 1.0;
    val /= 0.5;
    end -= start;
    if (val < 1) return end / 2 * val * val * val + start;
    val -= 2;
    return end / 2 * (val * val * val + 2) + start;
}


function easeInQuart(val) {
    let start = 0.0;
    var end = 1.0;
    end -= start;
    return end * val * val * val * val + start;
}

function easeOutQuart(val) {
    let start = 0.0;
    var end = 1.0;
    val--;
    end -= start;
    return -end * (val * val * val * val - 1) + start;
}

function easeInOutQuart(val) {
    let start = 0.0;
    var end = 1.0;
    val /= 0.5;
    end -= start;
    if (val < 1) return end / 2 * val * val * val * val + start;
    val -= 2;
    return -end / 2 * (val * val * val * val - 2) + start;
}


function easeInQuint(val) {
    let start = 0.0;
    var end = 1.0;
    end -= start;
    return end * val * val * val * val * val + start;
}

function easeOutQuint(val) {
    let start = 0.0;
    var end = 1.0;
    val--;
    end -= start;
    return end * (val * val * val * val * val + 1) + start;
}

function easeInOutQuint(val) {
    let start = 0.0;
    var end = 1.0;
    val /= 0.5;
    end -= start;
    if (val < 1) return end / 2 * val * val * val * val * val + start;
    val -= 2;
    return end / 2 * (val * val * val * val * val + 2) + start;
}



function easeInSine(val) {
    let start = 0.0;
    var end = 1.0;
    end -= start;
    return -end * Math.cos(val / 1 * (Math.PI / 2)) + end + start;
}

function easeOutSine(val) {
    let start = 0.0;
    var end = 1.0;
    end -= start;
    return end * Math.sin(val / 1 * (Math.PI / 2)) + start;
}

function easeInOutSine(val) {
    let start = 0.0;
    var end = 1.0;
    end -= start;
    return -end / 2 * (Math.cos(Math.PI * val / 1) - 1) + start;
}



function easeInExpo(val) {
    let start = 0.0;
    var end = 1.0;
    end -= start;
    return end * Math.pow(2, 10 * (val / 1 - 1)) + start;
}

function easeOutExpo(val) {
    let start = 0.0;
    var end = 1.0;
    end -= start;
    return end * (-Math.pow(2, -10 * val / 1) + 1) + start;
}

function easeInOutExpo(val) {
    let start = 0.0;
    var end = 1.0;
    val /= 0.5;
    end -= start;
    if (val < 1) return end / 2 * Math.pow(2, 10 * (val - 1)) + start;
    val--;
    return end / 2 * (-Math.pow(2, -10 * val) + 2) + start;
}




function easeInCirc(val) {
    let start = 0.0;
    var end = 1.0;
    end -= start;
    return -end * (Math.sqrt(1 - val * val) - 1) + start;
}

function easeOutCirc(val) {
    let start = 0.0;
    var end = 1.0;
    val--;
    end -= start;
    return end * Math.sqrt(1 - val * val) + start;
}

function easeInOutCirc(val) {
    let start = 0.0;
    var end = 1.0;
    val /= 0.5;
    end -= start;
    if (val < 1) return -end / 2 * (Math.sqrt(1 - val * val) - 1) + start;
    val -= 2;
    return end / 2 * (Math.sqrt(1 - val * val) + 1) + start;
}

function easeOutBounce(p) {
  	if (p < (4 / 11.0)) {
  		return ((121.0 * p) * p) / 16.0
    } else if (p < (8.0 / 11.0)) {
  		return (((363.0 / 40.0) * p * p) - ((99.0 / 10.0) * p)) + (17.0 / 5.0)
    } else if (p < (9.0 / 10.0)) {
  		return (((4356.0 / 361.0) * p * p) - ((35442.0 / 1805.0) * p)) + (16061.0 / 1805.0)
    } else {
  		return (((54.0 / 5.0) * p * p) - ((513.0 / 25.0) * p)) + (268.0 / 25.0)
    }
}

function easeInBounce(val) {
	return 1.0 - easeOutBounce(1.0 - val)
}

function easeInOutBounce(val){
  	if (val < 0.5) {
  		return (0.5 * easeInBounce(val * 2.0))
    } else {
  		return (0.5 * easeOutBounce((val * 2.0) - 1.0)) + 0.5
    }
}

function easeShake(val){
	return (Math.sin(val * 3.14 * 6 + 0.785) - 0.5) * (1.0 - val)
}

var _allLabalTimers = []

class _LabaTimer {

    update() {
		
		var localThis = this;
		
        var currentTime = performance.now();
        var t = (currentTime - this.startTime) / (this.endTime - this.startTime);
        if (this.endTime == this.startTime) {
        	t = 1.0;
		}
        if (t >= 1.0) {
            t = 1.0;
        }
        
		if (this.onUpdate != undefined) {
			var easingAction = this.action.easing;
			if (easingAction == undefined) {
				easingAction = easeInOutQuad;
			}
			this.onUpdate(this.view, easingAction(t));
		}
		
		//console.log("{0}   {1}   {2}   {3}".format(this.startTime, this.endTime, currentTime, t))
        if (t >= 1.0) {
            this.action(t, false);

            if (this.loopCount == -1) {
                this.action(0.0, true);
		        this.startTime = performance.now();
				this.endTime = this.startTime + this.duration * 1000
                
                this.view.labaCommitElemVars();
                return;
            }
            if (this.loopCount > 1) {
                this.loopCount--;
                this.action(0.0, true);
		        this.startTime = performance.now();
				this.endTime = this.startTime + this.duration * 1000
                
                this.view.labaCommitElemVars();
                return;
            }

            removeOne(_allLabalTimers, this);

            if (this.onComplete != undefined) {
                this.onComplete(this.view);
            }
            
            this.view.labaCommitElemVars();
            return;
        }
		
        this.action(t, false);
        
        this.view.labaCommitElemVars();
    }

    // Simple timer class to replace the one method we used from LeanTween
    constructor(elem, act, startVal, endVal, dura, onUpdate, onComplete, loops) {

        this.view = elem;
		this.loopCount = loops;
		this.action = act;
		this.duration = dura;
		this.onComplete = onComplete;
		this.onUpdate = onUpdate;
        this.startTime = performance.now();
		this.endTime = this.startTime + this.duration * 1000

        this.action(0.0, true);
	    
        _allLabalTimers.push(this);
        
        this.update(0);
    }
}

class _LabaAction {
	
	constructor(laba, operatorChar, elem, inverse, rawValue, easing, easingName) {
		
		this.operatorChar = operatorChar;
		this.elem = elem;
		this.inverse = inverse;
		this.rawValue = rawValue;
		this.easing = easing;
		this.easingName = easingName;

		this.action = laba.PerformActions[operatorChar];
		this._describe = laba.DescribeActions[operatorChar];
		this._init = laba.InitActions[operatorChar];
		
		if(this.inverse == false){
			this.fromValue = 0.0;
			this.toValue = 1.0;
		}else{
			this.fromValue = 1.0;
			this.toValue = 0.0;
		}
		
		if(this._init != undefined){
            this._init(this);
		}
	}
	
	reset(laba) {
		if (this._init != undefined) {
			var tempAction = new _LabaAction (laba, this.operatorChar, this.elem, this.inverse, this.rawValue, this.easing, this.easingName);
			this.fromValue = tempAction.fromValue;
			this.toValue = tempAction.toValue;
			return true;
		}
		return false;
	}

	perform(v) {
		if (this.action != undefined) {
			//console.log("this.easing: " + this.easingName)
			this.action (this.elem, this.fromValue + (this.toValue - this.fromValue) * this.easing(v), this);
			return true;
		}
		return false;
	}

	describe(sb) {
		if (this._describe != undefined) {
			this._describe (sb, this);
			return true;
		}
		return false;
	}
}


class _Laba {
	
	isOperator(c) {
        if (c == ',' || c == '|' || c == '!' || c == 'e') {
            return true;
        }
        return (c in this.InitActions);
    }

    isNumber(c) {
        return (c == '+' || c == '-' || c == '0' || c == '1' || c == '2' || c == '3' || c == '4' || c == '5' || c == '6' || c == '7' || c == '8' || c == '9' || c == '.');
    }
	
    update() {
        // called by the pixijs update loops
        for (var i in _allLabalTimers) {
            _allLabalTimers[i].update()
        }
    }
	
	parseAnimationString(elem, charString) {
		var idx = 0;

		var currentPipeIdx = 0;
		var currentActionIdx = 0;
        var easingAction = this.allEasings [3]; // easeInOutQuad
		var easingName = this.allEasingsByName [3];
		
		var combinedActions = []
		for(var i=0;i<this.kMaxPipes;i++){
			combinedActions[i] = []
			for(var j=0;j<this.kMaxActions;j++){
				combinedActions[i][j] = undefined
			}
		}

		while (idx < charString.length) {

			var invertNextOperator = false;
			var action = ' ';

			// find the next operator
			while (idx < charString.length) {
				var c = charString [idx];
				if (this.isOperator (c)) {
					if (c == '!') {
						invertNextOperator = true;
					} else if (c == '|') {
						currentPipeIdx++;
						currentActionIdx = 0;
                    } else if (c == ',') {
					    if (currentActionIdx != 0) {
                            currentPipeIdx++;
                            currentActionIdx = 0;
                        }
						
                        combinedActions [currentPipeIdx][currentActionIdx] = new _LabaAction (this, 'd', elem, false, this.kDefaultDuration * 0.26, easingAction, easingName);
                        currentPipeIdx++;
                        currentActionIdx = 0;
                    } else {
						action = c;
						idx++;
						break;
					}
				}
				idx++;
			}

			// skip anything not important
			while (idx < charString.length && !this.isNumber (charString [idx]) && !this.isOperator (charString [idx])) {
				idx++;
			}

			var value = this.LabaDefaultValue;

			// if this is a number read it in
			if (idx < charString.length && this.isNumber (charString [idx])) {
				
				// read in numerical value (if it exists)
				var isNegativeNumber = false;
				if (charString [idx] == '+') {
					idx++;
				} else if (charString [idx] == '-') {
					isNegativeNumber = true;
					idx++;
				}

				value = 0.0;

                var fractionalPart = false;
				var fractionalValue = 10.0;
				while (idx < charString.length) {
					var c = charString [idx];
					if (this.isNumber (c)) {
						if (c >= '0' && c <= '9') {
							if (fractionalPart) {
								value = value + (c - '0') / fractionalValue;
								fractionalValue *= 10.0;
							} else {
								value = value * 10 + (c - '0');
							}
						}
						if (c == '.') {
							fractionalPart = true;
						}
					}
					if (this.isOperator (c)) {
						break;
					}
					idx++;
				}

				if (isNegativeNumber) {
					value *= -1.0;
				}
			}


			// execute the action?
			if (action != ' ') {
				if (action in this.InitActions) {
					//console.log("[{0},{1}] action: {2} value: {3} inverted: {4}".format(currentPipeIdx, currentActionIdx, action, value, invertNextOperator));
					combinedActions [currentPipeIdx][currentActionIdx] = new _LabaAction (this, action, elem, invertNextOperator, value, easingAction, easingName);
					currentActionIdx++;
				} else {
					if (action == 'e') {
						var easingIdx = (value);
						if (easingIdx >= 0 && idx < this.allEasings.length) {
							easingAction = this.allEasings [easingIdx];
							easingName = this.allEasingsByName [easingIdx];
						}
					}
				}
			}

		}

		return combinedActions;
	}
	
	animateOne(elem, animationString, onUpdate, onComplete) {
		var localThis = this;
		var actionList = this.parseAnimationString (elem, animationString);
		var durationAction1 = this.PerformActions['d'];
		var durationAction2 = this.PerformActions['D'];
		var loopAction1 = this.PerformActions['L'];
		var loopAction2 = this.PerformActions['l'];
		
		var numOfPipes = 0;

		var duration = 0.0;
		var looping = 1.0;
		var loopingRelative = false;
		for (var i = 0; i < this.kMaxPipes; i++) {
			if (actionList [i][0] != undefined) {
				numOfPipes++;

				var durationForPipe = this.kDefaultDuration;
				for (var j = 0; j < this.kMaxActions; j++) {
                    if(actionList [i][j] != undefined) {
                        if (actionList[i][j].action == durationAction1 || actionList[i][j].action == durationAction2) {
                            durationForPipe = actionList[i][j].fromValue;
                        }
                        if (actionList[i][j].action == loopAction1) {
                            looping = actionList[i][j].fromValue;
                        }
                        if (actionList[i][j].action == loopAction2) {
                            loopingRelative = true;
                            looping = actionList[i][j].fromValue;
                        }
                    }
				}
				duration += durationForPipe;
			}
		}

		// having only a single pipe makes things much more efficient, so treat it separately
		if (numOfPipes == 1) {

			if (loopingRelative) {
                new _LabaTimer(elem, function (fv,f) {
                    if (f == true) {
                        for (var j = 0; j < localThis.kMaxActions; j++) {
                            if (actionList [0][j] != undefined && !actionList [0][j].reset (localThis)) {
                                break;
                            }
                        }
                    }
                    for (var i = 0; i < localThis.kMaxActions; i++) {
                        if (actionList [0][i] != undefined && !actionList [0][i].perform (fv)) {
                            break;
                        }
                    }
                }, 0.0, 1.0, duration, onUpdate, onComplete, looping);
			} else {
				for (var j = 0; j < localThis.kMaxActions; j++) {
					if (actionList [0][j] != undefined && !actionList [0][j].reset (localThis)) {
						break;
					}
				}
                new _LabaTimer (elem, function (fv,f) {
					for (var i = 0; i < localThis.kMaxActions; i++) {
						if (actionList [0][i] != undefined && !actionList [0][i].perform (fv)) {
							break;
						}
					}
				}, 0.0, 1.0, duration * localThis.kTimeScale, onUpdate, onComplete, looping);
			}
		} else {
			
			var nextAction = undefined;
			for (var pipeIdx = numOfPipes - 1; pipeIdx >= 0; pipeIdx--) {

				var durationForPipe = this.kDefaultDuration;
				var loopingForPipe = 1.0;
				var loopingRelativeForPipe = false;
				for (var j = 0; j < this.kMaxActions; j++) {
				    if (actionList [pipeIdx][j] != undefined) {						
                        if (actionList[pipeIdx][j].action == durationAction1 || actionList[pipeIdx][j].action == durationAction2) {
                            durationForPipe = actionList[pipeIdx][j].fromValue;
                        }
                        if (actionList[pipeIdx][j].action == loopAction1) {
                            loopingForPipe = actionList[pipeIdx][j].fromValue;
                        }
                        if (actionList[pipeIdx][j].action == loopAction2) {
                            loopingRelativeForPipe = true;
                            loopingForPipe = actionList[pipeIdx][j].fromValue;
                        }
                    }
				}
				
				let idx = pipeIdx;
                var localNextAction = nextAction;
				if (localNextAction == undefined) {
					localNextAction = onComplete;
				}
				if (localNextAction == undefined) {
					localNextAction = function () { return undefined; };
				}


				let loopingRelativeForPipeFinal = loopingRelativeForPipe;
				let durationForPipeFinal = durationForPipe;
				let loopingForPipeFinal = loopingForPipe;
				let localNextActionFinal = localNextAction;

				nextAction = function () {

					if (loopingRelativeForPipeFinal) {
                        new _LabaTimer (elem, function (fv,f) {
							if (f == true) {
								for (var j = 0; j < localThis.kMaxActions; j++) {
									if (actionList [idx][j] != undefined && !actionList [idx][j].reset (localThis)) {
										break;
									}
								}
							}
							for (var j = 0; j < localThis.kMaxActions; j++) {
								if (actionList [idx][j] != undefined && !actionList [idx][j].perform (fv)) {
									break;
								}
							}
						}, 0.0, 1.0, durationForPipeFinal, onUpdate, localNextActionFinal, loopingForPipeFinal);
					} else {
						for (var j = 0; j < localThis.kMaxActions; j++) {
							if (actionList [idx][j] != undefined && !actionList [idx][j].reset (localThis)) {
								break;
							}
						}
                        new _LabaTimer (elem, function (fv,f) {
							for (var j = 0; j < localThis.kMaxActions; j++) {
								if (actionList [idx][j] != undefined && !actionList [idx][j].perform (fv)) {
									break;
								}
							}
						}, 0.0, 1.0, durationForPipeFinal * localThis.kTimeScale, onUpdate, localNextActionFinal, loopingForPipeFinal);
					}
				};
			}

			if (nextAction != undefined) {
				nextAction ();
			} else {
				if (onComplete != undefined) {
					onComplete(this.view);
				}
			}

		}
	}
	
	reset(elem) {
		if (elem.labaTransformX == undefined){
			var localElem = elem;
			localElem.labaResetElemVars = function() {
				localElem.labaTransformX = 0;
				localElem.labaTransformY = 0;
				localElem.labaTransformZ = 0;
				localElem.labaRotationX = 0;
				localElem.labaRotationY = 0;
				localElem.labaRotationZ = 0;
				localElem.labaScale = 1;

                if (localElem.style != undefined){
                    localElem.labaAlpha = parseFloat(localElem.style.opacity);
                }
				if (isNaN(localElem.labaAlpha)) {
					localElem.labaAlpha = 1;
				}
			}		
			localElem.labaCommitElemVars = function() {
				if (localElem.position != undefined) {
					// assume this is a pixijs object
					localElem.position.set(localElem.labaTransformX, localElem.labaTransformY);
					localElem.scale.set(localElem.labaScale, localElem.labaScale);
					localElem.rotation = localElem.labaRotationZ;
					localElem.alpha = localElem.labaAlpha;
                }
				if (localElem.style != undefined) {
					var mat = Matrix.identity()				
					mat = Matrix.multiply(mat, Matrix.translate(localElem.labaTransformX, localElem.labaTransformY, localElem.labaTransformZ))
					mat = Matrix.multiply(mat, Matrix.rotateX(Math.radians(localElem.labaRotationX)))
					mat = Matrix.multiply(mat, Matrix.rotateY(Math.radians(localElem.labaRotationY)))
					mat = Matrix.multiply(mat, Matrix.rotateZ(Math.radians(localElem.labaRotationZ)))
					mat = Matrix.multiply(mat, Matrix.scale(localElem.labaScale, localElem.labaScale, localElem.labaScale))
			
					let matString = "perspective(500px) matrix3d({0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15})".format(mat.m00,mat.m10,mat.m20,mat.m30,mat.m01,mat.m11,mat.m21,mat.m31,mat.m02,mat.m12,mat.m22,mat.m32,mat.m03,mat.m13,mat.m23,mat.m33)
					
					localElem.style["webkitTransform"] = matString;
					localElem.style["MozTransform"] = matString;
					localElem.style["msTransform"] = matString;
					localElem.style["OTransform"] = matString;
					localElem.style["transform"] = matString;
			
					localElem.style["opacity"] = localElem.labaAlpha;
				}
			}
		}
		
		elem.labaResetElemVars()
		if (elem.style == undefined && elem.position != undefined) {
			elem.labaTransformX = elem.position.x;
			elem.labaTransformY = elem.position.y;
			elem.labaRotationZ = elem.rotation;
			elem.labaScale = elem.scale.x;
			elem.labaAlpha = elem.alpha;
		}
	}
    
    set(elem, tx, ty, tz, rx, ry, rz, scale, alpha) {
        this.reset(elem);
		elem.labaTransformX = tx;
		elem.labaTransformY = ty;
        elem.labaTransformZ = tz;
		elem.labaRotationX = rx;
		elem.labaRotationY = ry;
		elem.labaRotationZ = rz;
		elem.labaScale = scale;
        elem.labaAlpha = alpha;
        elem.labaCommitElemVars();
    }

	animate(elem, animationString, onUpdate, onComplete) {
		
		// we utilize memory storage on the element to store our animatable variables
		if (elem.labaTransformX == undefined){
			this.reset(elem)
		}
	
		if (animationString.includes ("[")) {
			var parts = animationString.replace ('[', ' ').split ("]");
			for (var i = 0; i < parts.length; i++) {
				var part = parts[i];
				if (part.length > 0) {
					this.animateOne (elem, part, onUpdate, onComplete);
					onComplete = undefined;
				}
			}
		} else {
			this.animateOne (elem, animationString, onUpdate, onComplete);
			onComplete = undefined;
		}
	}
	
	
	cancel(elem) {
        for (var i in _allLabalTimers) {
            if (_allLabalTimers[i].view == elem) {
                removeOne(_allLabalTimers, _allLabalTimers[i]);
            }
        }
	}
	
	
	
	
	describeOne(elem, animationString, sb) {
		var actionList = this.parseAnimationString (elem, animationString);
		var durationAction1 = this.PerformActions['d'];
		var durationAction2 = this.PerformActions['D'];
		var loopingAction1 = this.PerformActions['L'];
		var loopingAction2 = this.PerformActions['l'];

		var numOfPipes = 0;

		var duration = 0.0;
		var looping = 1;
		var loopingRelative = "absolute";
		for (var i = 0; i < this.kMaxPipes; i++) {
			if (actionList [i][0] != undefined) {
				numOfPipes++;

				var durationForPipe = this.kDefaultDuration;
				for (var j = 0; j < this.kMaxActions; j++) {
				    if(actionList [i][j] != undefined) {
                        if (actionList[i][j].action == durationAction1 || actionList[i][j].action == durationAction2) {
                            durationForPipe = actionList[i][j].fromValue;
                        }
                        if (actionList[i][j].action == loopingAction1) {
                            looping =  actionList[i][j].fromValue;
                        }
                        if (actionList[i][j].action == loopingAction2) {
                            looping =  actionList[i][j].fromValue;
                            loopingRelative = "relative";
                        }
                    }
				}
				duration += durationForPipe;
			}
		}

		// having only a single pipe makes things much more efficient, so treat it separately
		if (numOfPipes == 1) {
			var stringLengthBefore = sb.length();
			
			for (var i = 0; i < this.kMaxActions; i++) {
				if (actionList [0][i] != undefined && !actionList [0][i].describe (sb)) {
					break;
				}
			}


			if (looping > 1) {
				sb.append (" {0} repeating {1} times, ".format(loopingRelative, looping));
			} else if (looping == -1) {
				sb.append (" {0} repeating forever, ".format(loopingRelative));
			}

			if (stringLengthBefore != sb.length()) {
				sb.append (" {0}  ".format(actionList [0][0].easingName));

				sb.setLength(sb.length() - 2);
				if (duration == 0.0) {
					sb.append (" instantly.");
				} else {
					sb.append (" over {0} seconds.".format(duration * this.kTimeScale));
				}
			} else {
				if (sb.length() > 2) {
                    sb.setLength(sb.length() - 2);
				}
				sb.append (" wait for {0} seconds.".format(duration * this.kTimeScale));
			}

		} else {

			for (var pipeIdx = 0; pipeIdx < numOfPipes; pipeIdx++) {
				var stringLengthBefore = sb.length();

				var durationForPipe = this.kDefaultDuration;
				var loopingForPipe = 1;
				var loopingRelativeForPipe = "absolute";
				for (var j = 0; j < this.kMaxActions; j++) {
				    if (actionList [pipeIdx][j] != undefined) {
                        if (actionList[pipeIdx][j].action == durationAction1 || actionList[pipeIdx][j].action == durationAction2) {
                            durationForPipe = actionList[pipeIdx][j].fromValue;
                        }
                        if (actionList[pipeIdx][j].action == loopingAction1) {
                            loopingForPipe =  actionList[pipeIdx][j].fromValue;
                        }
                        if (actionList[pipeIdx][j].action == loopingAction2) {
                            loopingForPipe =  actionList[pipeIdx][j].fromValue;
                            loopingRelativeForPipe = "relative";
                        }
                    }
				}

				var idx = pipeIdx;
				for (var j = 0; j < this.kMaxActions; j++) {
					if (actionList [idx][j] != undefined && !actionList [idx][j].reset (this)) {
						break;
					}
				}

				for (var j = 0; j < this.kMaxActions; j++) {
					if (actionList [idx][j] != undefined && !actionList [idx][j].describe (sb)) {
						break;
					}
				}

				if (loopingForPipe > 1) {
					sb.append (" {0} repeating {1} times, ".format(loopingRelativeForPipe, loopingForPipe));
				} else if (loopingForPipe == -1) {
					sb.append (" {0} repeating forever, ".format(loopingRelativeForPipe));
				}

				if (stringLengthBefore != sb.length()) {
					sb.append (" {0}  ".format(actionList [idx][0].easingName));

					sb.setLength(sb.length() - 2);
					if (durationForPipe == 0.0) {
						sb.append (" instantly.");
					} else {
						sb.append (" over {0} seconds.".format(durationForPipe * this.kTimeScale));
					}
				} else {
					sb.append (" wait for {0} seconds.".format(durationForPipe * this.kTimeScale));
				}

				if (pipeIdx + 1 < numOfPipes) {
					sb.append (" Once complete then  ");
				}
			}
		}
	}

	describe(elem, animationString) {
		if (animationString == undefined || animationString.length == 0) {
			return "do nothing";
		}

		var sb = new StringBuilder ();
		
		if (animationString.includes ("[")) {
			var parts = animationString.replace ('[', ' ').split ("]");
			var animNumber = 0;
			sb.append ("Perform a series of animations at the same time.\n");
			for (var i = 0; i < parts.length; i++) {
				var part = parts[i];
				if (part.length > 0) {
					sb.append ("Animation #{0} will ".format(animNumber+1));
					this.describeOne (elem, part, sb);
					sb.append ("\n");
					animNumber++;
				}
			}
		} else {
			this.describeOne (elem, animationString, sb);
		}
			
		if (sb.length() > 0) {
			// upper case the starting letter
			sb.insert (0, sb.toString ().substring (0, 1).toUpperCase ());
			sb.delete(1,1);
		}

		return sb.toString ();
	}
	
	
	
	
	registerOperation(charOperator, initFunc, performFunc, describeFunc){
		this.InitActions[charOperator] = initFunc
		this.PerformActions[charOperator] = performFunc
		this.DescribeActions[charOperator] = describeFunc
	}
	
	constructor() {
		this.allEasings = [
			easeLinear,			// 0
			easeInQuad,			// 1
			easeOutQuad,		// 2
			easeInOutQuad,		// 3
			easeInCubic,		// 4
			easeOutCubic,		// 5
			easeInOutCubic,		// 6
			easeInQuart,		// 7
			easeOutQuart,		// 8
			easeInOutQuart,		// 9
			easeInQuint,		// 10
			easeOutQuint,		// 11
			easeInOutQuint,		// 12
			easeInSine,			// 13
			easeOutSine,		// 14
			easeInOutSine,		// 15
			easeInExpo,			// 16
			easeOutExpo,		// 17
			easeInOutExpo,		// 18
			easeInCirc,			// 19
			easeOutCirc,		// 20
			easeInOutCirc,		// 21
			easeInBounce,		// 22
			easeOutBounce,		// 23
			easeInOutBounce,	// 24
			easeShake			// 25
		]

		this.allEasingsByName = [
	            "ease linear", "ease out quad", "ease in quad", "ease in/out quad", "ease in cubic", "ease out cubic", "ease in/out cubic", "ease in quart", "ease out quart", "ease in/out quart",
	            "ease in quint", "ease out quint", "ease in/out quint", "ease in sine", "eas out sine", "ease in/out sine", "ease in expo", "ease out expo", "ease in out expo", "ease in circ", "ease out circ", "ease in/out circ",
	            "ease in bounce", "ease out bounce", "ease in/out bounce", "ease shake"
	    ]

		this.LabaDefaultValue = Number.MIN_VALUE;
		
		this.InitActions = {};
		this.PerformActions = {};
		this.DescribeActions = {};

		this.kMaxPipes = 40;
		this.kMaxActions = 40;
		this.kDefaultDuration = 0.57;
		this.kTimeScale = 1.0;
		
		let LabaDefaultValueFinal = this.LabaDefaultValue
		let LabaDefaultDuration = this.kDefaultDuration
		
		this.registerOperation(
				'L',
				function (newAction) {
                    if (newAction.rawValue == LabaDefaultValueFinal) {
                        newAction.rawValue = -1.0;
                    }
                    newAction.fromValue = newAction.toValue = newAction.rawValue;
                    return newAction;
                },
                function (rt, v, action) { return undefined; },
                function (sb, action) { return undefined; }
        );
		
        this.registerOperation(
                'l',
                function (newAction) {
                    if (newAction.rawValue == LabaDefaultValueFinal) {
                        newAction.rawValue = -1.0;
                    }
                    newAction.fromValue = newAction.toValue = newAction.rawValue;
                    return newAction;
                },
                function (rt, v, action) { return undefined; },
                function (sb, action) { return undefined; }
        );

        this.registerOperation(
                'd',
                function (newAction) {
                    if (newAction.rawValue == LabaDefaultValueFinal) {
                        newAction.rawValue = LabaDefaultDuration;
                    }
                    newAction.fromValue = newAction.toValue = newAction.rawValue;
                    return newAction;
                },
                function (rt, v, action) { return undefined; },
                function (sb, action) { return undefined; }
        );

        this.registerOperation(
                'D',
                function (newAction) {
                    if (newAction.rawValue == LabaDefaultValueFinal) {
                        newAction.rawValue = LabaDefaultDuration;
                    }
										
					var childIdx = 0;
					var child = newAction.elem;
					while( (child = child.previousSibling) != undefined ) 
					  childIdx++;
					
                    newAction.fromValue = newAction.toValue = newAction.rawValue * childIdx;
                    return newAction;
                },
                function (rt, v, action) { return undefined; },
                function (sb, action) { return undefined; }
        );

        this.registerOperation(
                'x',
                function (newAction) {
                    if (newAction.rawValue == LabaDefaultValueFinal) {
                        newAction.rawValue = 0.0;
                    }
                    if(!newAction.inverse){
                        newAction.fromValue = newAction.elem.labaTransformX;
                        newAction.toValue = newAction.rawValue;
                    }else{
                        newAction.fromValue = newAction.rawValue;
                        newAction.toValue = newAction.elem.labaTransformX;
                    }
                    return newAction;
                },
                function (elem, v, action) {
					elem.labaTransformX = v;
                },
                function (sb, action) {
                    if (!action.inverse ) {
                        sb.append("move to {0} x pos, ".format(action.rawValue));
                    } else {
                        sb.append("move from {0} x pos, ".format(action.rawValue));
                    }
                }
        );


        this.registerOperation(
                'y',
                function (newAction) {
                    if (newAction.rawValue == LabaDefaultValueFinal) {
                        newAction.rawValue = 0.0;
                    }
                    if(!newAction.inverse){
                        newAction.fromValue = newAction.elem.labaTransformY;
                        newAction.toValue = newAction.rawValue;
                    }else{
                        newAction.fromValue = newAction.rawValue;
                        newAction.toValue = newAction.elem.labaTransformY;
                    }
                    return newAction;
                },
                function (elem, v, action) {
					elem.labaTransformY = v;
                },
                function (sb, action) {
                    if(!action.inverse ) {
                        sb.append("move to {0} y pos, ".format(action.rawValue));
                    } else {
                        sb.append("move from {0} y pos, ".format(action.rawValue));
                    }
                    return undefined;
                }
        );
		
        this.registerOperation(
                'z',
                function (newAction) {
                    if (newAction.rawValue == LabaDefaultValueFinal) {
                        newAction.rawValue = 0.0;
                    }
                    if(!newAction.inverse){
                        newAction.fromValue = newAction.elem.labaTransformZ;
                        newAction.toValue = newAction.rawValue;
                    }else{
                        newAction.fromValue = newAction.rawValue;
                        newAction.toValue = newAction.elem.labaTransformZ;
                    }
                    return newAction;
                },
                function (elem, v, action) {
					elem.labaTransformZ = v;
                },
                function (sb, action) {
                    if(!action.inverse ) {
                        sb.append("move to {0} z pos, ".format(action.rawValue));
                    } else {
                        sb.append("move from {0} z pos, ".format(action.rawValue));
                    }
                    return undefined;
                }
        );
		
        this.registerOperation(
                '<',
                function (newAction) {
                    if (newAction.rawValue == LabaDefaultValueFinal) {
                        newAction.rawValue = newAction.elem.offsetWidth;
                    }
                    if(!newAction.inverse){
                        newAction.fromValue = newAction.elem.labaTransformX;
                        newAction.toValue = newAction.elem.labaTransformX - newAction.rawValue;
                    }else{
                        newAction.fromValue = newAction.elem.labaTransformX + newAction.rawValue;
                        newAction.toValue = newAction.elem.labaTransformX;
                    }
                    return newAction;
                },
                function (elem, v, action) {
					elem.labaTransformX = v
                },
                function (sb, action) {
                    if(!action.inverse ) {
                        sb.append("move left {0} units, ".format(action.rawValue));
                    } else {
                        sb.append("move in from right {0} units, ".format(action.rawValue));
                    }
                    return undefined;
                }
        );


        this.registerOperation(
                '>',
                function (newAction) {
                    if (newAction.rawValue == LabaDefaultValueFinal) {
                        newAction.rawValue = newAction.elem.offsetWidth;
                    }
                    if(!newAction.inverse){
                        newAction.fromValue = newAction.elem.labaTransformX;
                        newAction.toValue = newAction.elem.labaTransformX + newAction.rawValue;
                    }else{
                        newAction.fromValue = newAction.elem.labaTransformX - newAction.rawValue;
                        newAction.toValue = newAction.elem.labaTransformX;
                    }
                    return newAction;
                },
                function (elem, v, action) {
					elem.labaTransformX = v
                },
                function (sb, action) {
                    if(!action.inverse) {
                        sb.append("move right {0} units, ".format(action.rawValue));
                    } else {
                        sb.append("move in from left {0} units, ".format(action.rawValue));
                    }
                    return undefined;
                }
        );

        this.registerOperation(
                '^',
                function (newAction) {
                    if (newAction.rawValue == LabaDefaultValueFinal) {
                        newAction.rawValue = newAction.elem.offsetHeight;
                    }
                    if(!newAction.inverse){
                        newAction.fromValue = newAction.elem.labaTransformY;
                        newAction.toValue = newAction.elem.labaTransformY - newAction.rawValue;
                    }else{
                        newAction.fromValue = newAction.elem.labaTransformY + newAction.rawValue;
                        newAction.toValue = newAction.elem.labaTransformY;
                    }
                    return newAction;
                },
                function (elem, v, action) {
                    elem.labaTransformY = v
                },
                function (sb, action) {
                    if(!action.inverse ) {
                        sb.append("move up {0} units, ".format(action.rawValue));
                    } else {
                        sb.append("move in from below {0} units, ".format(action.rawValue));
                    }
                    return undefined;
                }
        );

        this.registerOperation(
                'v',
                function (newAction) {
                    if (newAction.rawValue == LabaDefaultValueFinal) {
                        newAction.rawValue = newAction.elem.offsetHeight;
                    }
                    if(!newAction.inverse){
                        newAction.fromValue = newAction.elem.labaTransformY;
                        newAction.toValue = newAction.elem.labaTransformY + newAction.rawValue;
                    }else{
                        newAction.fromValue = newAction.elem.labaTransformY - newAction.rawValue;
                        newAction.toValue = newAction.elem.labaTransformY;
                    }

                    return newAction;
                },
                function (elem, v, action) {
                    elem.labaTransformY = v
                },
                function (sb, action) {
                    if(!action.inverse ) {
                        sb.append("move down {0} units, ".format(action.rawValue));
                    } else {
                        sb.append("move in from above {0} units, ".format(action.rawValue));
                    }
                    return undefined;
                }
        );

        this.registerOperation(
                's',
                function (newAction) {
                    if (newAction.rawValue == LabaDefaultValueFinal) {
                        newAction.rawValue = 1.0;
                    }
                    if(!newAction.inverse){
                        newAction.fromValue = newAction.elem.labaScale;
                        newAction.toValue = newAction.rawValue;
                    }else{
                        newAction.fromValue = (newAction.rawValue > 0.5 ? 0.0 : 1.0);
                        newAction.toValue = newAction.rawValue;
                    }
                    return newAction;
                },
                function (elem, v, action) {
                    elem.labaScale = v
                },
                function (sb, action) {
                    if(!action.inverse ) {
                        sb.append("scale to {0}%, ".format(action.rawValue * 100.0));
                    } else {
                        sb.append("scale in from {0}%, ".format(action.rawValue * 100.0));
                    }
                    return undefined;
                }
        );


        this.registerOperation(
                'r',
                function (newAction) {
                    if (newAction.rawValue == LabaDefaultValueFinal) {
                        newAction.rawValue = 0.0;
                    }
                    if(!newAction.inverse){
                        newAction.fromValue = newAction.elem.labaRotationZ;
                        newAction.toValue = newAction.elem.labaRotationZ - newAction.rawValue;
                    }else{
                        newAction.fromValue = newAction.elem.labaRotationZ + newAction.rawValue;
                        newAction.toValue = newAction.elem.labaRotationZ;
                    }
                    return newAction;
                },
                function (elem, v, action) {
                    elem.labaRotationZ = v;
                },
                function (sb, action) {
                    if(!action.inverse ) {
                        sb.append("rotate around z by {0}, ".format(action.rawValue));
                    } else {
                        sb.append("rotate in from around z by {0}, ".format(action.rawValue));
                    }
                    return undefined;
                }
        );

        this.registerOperation(
                'p',
                function (newAction) {
                    if (newAction.rawValue == LabaDefaultValueFinal) {
                        newAction.rawValue = 0.0;
                    }
                    if(!newAction.inverse){
                        newAction.fromValue = newAction.elem.labaRotationX;
                        newAction.toValue = newAction.elem.labaRotationX - newAction.rawValue;
                    }else{
                        newAction.fromValue = newAction.elem.labaRotationX + newAction.rawValue;
                        newAction.toValue = newAction.elem.labaRotationX;
                    }

                    return newAction;
                },
                function (elem, v, action) {
                    elem.labaRotationX = v;
                },
                function (sb, action) {
                    if(!action.inverse ) {
                        sb.append("rotate around x by {0}, ".format(action.rawValue));
                    } else {
                        sb.append("rotate in from around x by {0}, ".format(action.rawValue));
                    }
                    return undefined;
                }
        );

        this.registerOperation(
                'w',
                function (newAction) {
                    if (newAction.rawValue == LabaDefaultValueFinal) {
                        newAction.rawValue = 0.0;
                    }
                    if(!newAction.inverse){
                        newAction.fromValue = newAction.elem.labaRotationY;
                        newAction.toValue = newAction.elem.labaRotationY - newAction.rawValue;
                    }else{
                        newAction.fromValue = newAction.elem.labaRotationY + newAction.rawValue;
                        newAction.toValue = newAction.elem.labaRotationY;
                    }
                    return newAction;
                },
                function (elem, v, action) {
                    elem.labaRotationY = v;
                },
                function (sb, action) {
                    if(!action.inverse ) {
                        sb.append("rotate around y by {0}, ".format(action.rawValue));
                    } else {
                        sb.append("rotate in from around y by {0}, ".format(action.rawValue));
                    }
                    return undefined;
                }
        );

		
        this.registerOperation(
                'f',
                function (newAction) {
                    if (newAction.rawValue == LabaDefaultValueFinal) {
                        newAction.rawValue = 1.0;
                    }
                    if(!newAction.inverse){
                        newAction.fromValue = newAction.elem.labaAlpha;
                        newAction.toValue = newAction.rawValue;
                    }else{
                        newAction.fromValue = (newAction.rawValue > 0.5 ? 0.0 : 1.0);
                        newAction.toValue = newAction.rawValue;
                    }
                    return newAction;
                },
                function (elem, v, action) {
                    elem.labaAlpha = v;
                },
                function (sb, action) {
                    if(!action.inverse ) {
                        sb.append("fade to {0}%, ".format(action.rawValue * 100.0));
                    } else {
                        sb.append("fade from {0}% to {1}%, ".format(action.fromValue * 100.0,action.toValue * 100.0));
                    }
                    return undefined;
                }
        );
	}
}

var Laba = new _Laba();



class Matrix {    
    constructor(m00,m01,m02,m03,m10,m11,m12,m13,m20,m21,m22,m23,m30,m31,m32,m33) {
        this.m00 = m00; this.m01 = m01; this.m02 = m02; this.m03 = m03;
        this.m10 = m10; this.m11 = m11; this.m12 = m12; this.m13 = m13;
        this.m20 = m20; this.m21 = m21; this.m22 = m22; this.m23 = m23;
        this.m30 = m30; this.m31 = m31; this.m32 = m32; this.m33 = m33;
    }
    
	static identity() {
	    return new Matrix(
	        1.0,  0.0,  0.0,  0.0,
	        0.0,  1.0,  0.0,  0.0,
	        0.0,  0.0,  1.0,  0.0,
	        0.0,  0.0,  0.0,  1.0
	    )
	}
	
	static translate(x, y, z) {
	    return new Matrix(
	        1.0,  0.0,  0.0,  x,
	        0.0,  1.0,  0.0,  y,
	        0.0,  0.0,  1.0,  z,
	        0.0,  0.0,  0.0,  1.0
	    )
	}

	static scale(x, y, z) {
	    return new Matrix(
	        x,  0.0,  0.0,  0.0,
	        0.0,  y,  0.0,  0.0,
	        0.0,  0.0,  z,  0.0,
	        0.0,  0.0,  0.0,  1.0
	    )
	}

	static rotateX(angle_in_rad) {
	    let s = Math.sin(angle_in_rad), c = Math.cos(angle_in_rad)
	    return new Matrix(
	        1.0,  0.0,  0.0,  0.0,
	        0.0,  c, -s,  0.0,
	        0.0,  s,  c,  0.0,
	        0.0,  0.0,  0.0,  1.0
	    )
	}

	static rotateY(angle_in_rad) {
	    let s = Math.sin(angle_in_rad), c = Math.cos(angle_in_rad)
	    return new Matrix(
	        c,  0.0,  s,  0.0,
	        0.0,  1.0,  0.0,  0.0,
	        -s,  0.0,  c,  0.0,
	        0.0,  0.0,  0.0,  1.0
	    )
	}

	static rotateZ(angle_in_rad) {
	let s = Math.sin(angle_in_rad), c = Math.cos(angle_in_rad)
	    return new Matrix(
	        c, -s,  0.0,  0.0,
	        s,  c,  0.0,  0.0,
	        0.0,  0.0,  1.0,  0.0,
	        0.0,  0.0,  0.0,  1.0
	    )
	}
	
	

	static ortho(left, right, bottom, top, near, far) {
	    let l = left, r = right, b = bottom, t = top, n = near, f = far
	    let tx = -(r + l) / (r - l)
	    let ty = -(t + b) / (t - b)
	    let tz = -(f + n) / (f - n)
	    return new Matrix(
	        2.0 / (r - l),  0.0,            0.0,            tx,
	        0.0,            2.0 / (t - b),  0.0,            ty,
	        0.0,            0.0,            -2.0 / (f - n),  tz,
	        0.0,            0.0,            0.0,            1.0
	    )
	}

	static ortho2d(left, right, bottom, top) {
	    return new Matrix.ortho(left, right, bottom, top, -1, 1)
	}

	static frustrum(left, right, bottom, top, nearval, farval) {
    
	    let x = (2.0 * nearval) / (right - left)
	    let y = (2.0 * nearval) / (top - bottom)
	    let a = (right + left) / (right - left)
	    let b = (top + bottom) / (top - bottom)
	    let c = -(farval + nearval) / ( farval - nearval)
	    let d = -(2.0 * farval * nearval) / (farval - nearval)
    
	    return new Matrix(
	        x,              0.0,            a,            0,
	        0.0,            y,              b,            0,
	        0.0,            0.0,            c,            d,
	        0.0,            0.0,            -1.0,         0.0
	    )
	}

	static perspective(fovy, aspect, zNear, zFar) {
	    let ymax = zNear * tan(fovy * Float.pi / 360.0)
	    let ymin = -ymax
	    let xmin = ymin * aspect
	    let xmax = ymax * aspect
	    return m4_frustrum(xmin, xmax, ymin, ymax, zNear, zFar)
	}

	static multiply(a, b) {
	    var result = Matrix.identity()

	    result.m00  = a.m00 * b.m00  + a.m01 * b.m10  + a.m02 * b.m20   + a.m03 * b.m30
	    result.m10  = a.m10 * b.m00  + a.m11 * b.m10  + a.m12 * b.m20   + a.m13 * b.m30
	    result.m20  = a.m20 * b.m00  + a.m21 * b.m10  + a.m22 * b.m20  + a.m23 * b.m30
	    result.m30  = a.m30 * b.m00  + a.m31 * b.m10  + a.m32 * b.m20  + a.m33 * b.m30
    
	    result.m01  = a.m00 * b.m01  + a.m01 * b.m11  + a.m02 * b.m21   + a.m03 * b.m31
	    result.m11  = a.m10 * b.m01  + a.m11 * b.m11  + a.m12 * b.m21   + a.m13 * b.m31
	    result.m21  = a.m20 * b.m01  + a.m21 * b.m11  + a.m22 * b.m21  + a.m23 * b.m31
	    result.m31  = a.m30 * b.m01  + a.m31 * b.m11  + a.m32 * b.m21  + a.m33 * b.m31
    
	    result.m02  = a.m00 * b.m02  + a.m01 * b.m12  + a.m02 * b.m22  + a.m03 * b.m32
	    result.m12  = a.m10 * b.m02  + a.m11 * b.m12  + a.m12 * b.m22  + a.m13 * b.m32
	    result.m22 = a.m20 * b.m02  + a.m21 * b.m12  + a.m22 * b.m22 + a.m23 * b.m32
	    result.m32 = a.m30 * b.m02  + a.m31 * b.m12  + a.m32 * b.m22 + a.m33 * b.m32
    
	    result.m03 = a.m00 * b.m03 + a.m01 * b.m13 + a.m02 * b.m23  + a.m03 * b.m33
	    result.m13 = a.m10 * b.m03 + a.m11 * b.m13 + a.m12 * b.m23  + a.m13 * b.m33
	    result.m23 = a.m20 * b.m03 + a.m21 * b.m13 + a.m22 * b.m23 + a.m23 * b.m33
	    result.m33 = a.m30 * b.m03 + a.m31 * b.m13 + a.m32 * b.m23 + a.m33 * b.m33
    
	    return result;
	}
	
}

