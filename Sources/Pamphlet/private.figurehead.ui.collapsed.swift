import Foundation

// swiftlint:disable all

public extension Pamphlet.Private.Figurehead.Ui {
    static func UiAlertHtml() -> String {
    #if DEBUG
        let fileOnDiskPath = "/Volumes/Development/Development/chimerasw3/PicaroonTemplate/Resources/private/figurehead/ui/ui.alert.html"
        if let contents = try? String(contentsOf:URL(fileURLWithPath: fileOnDiskPath)) {
            if contents.hasPrefix("#define PAMPHLET_PREPROCESSOR") {
                do {
                    let task = Process()
                    task.executableURL = URL(fileURLWithPath: "/usr/local/bin/pamphlet")
                    task.arguments = ["preprocess", fileOnDiskPath]
                    let outputPipe = Pipe()
                    task.standardOutput = outputPipe
                    try task.run()
                    let outputData = outputPipe.fileHandleForReading.readDataToEndOfFile()
                    let output = String(decoding: outputData, as: UTF8.self)
                    return output
                } catch {
                    return "Failed to use /usr/local/bin/pamphlet to preprocess the requested file"
                }
            }
            return contents
        }
        return String()
    #else
        return uncompressedUiAlertHtml
    #endif
    }
    static func UiAlertHtmlGzip() -> Data {
        return compressedUiAlertHtml
    }
}

private let uncompressedUiAlertHtml = ###"""

"""###
private let compressedUiAlertHtml = Data(base64Encoded:"H4sIAAAAAAACAwMAAAAAAAAAAAA=")!

public extension Pamphlet.Private.Figurehead.Ui {
    static func UiAlertJs() -> String {
    #if DEBUG
        let fileOnDiskPath = "/Volumes/Development/Development/chimerasw3/PicaroonTemplate/Resources/private/figurehead/ui/ui.alert.js"
        if let contents = try? String(contentsOf:URL(fileURLWithPath: fileOnDiskPath)) {
            if contents.hasPrefix("#define PAMPHLET_PREPROCESSOR") {
                do {
                    let task = Process()
                    task.executableURL = URL(fileURLWithPath: "/usr/local/bin/pamphlet")
                    task.arguments = ["preprocess", fileOnDiskPath]
                    let outputPipe = Pipe()
                    task.standardOutput = outputPipe
                    try task.run()
                    let outputData = outputPipe.fileHandleForReading.readDataToEndOfFile()
                    let output = String(decoding: outputData, as: UTF8.self)
                    return output
                } catch {
                    return "Failed to use /usr/local/bin/pamphlet to preprocess the requested file"
                }
            }
            return contents
        }
        return String()
    #else
        return uncompressedUiAlertJs
    #endif
    }
    static func UiAlertJsGzip() -> Data {
        return compressedUiAlertJs
    }
}

private let uncompressedUiAlertJs = ###"""
var alertsQueue=[];function handleAlertsQueue(){let e=function(e,n){e.style.height=n*e.actualHeight+"px",e.style.minHeight=e.style.height};var n=function(){1==alertsContainer.isOpen&&(alertsContainer.isOpen=!1,Laba.cancel(alertsContainer),Laba.animate(alertsContainer,"f0",void 0,(function(){alertsContainer.style.display="none"})))},t=function(t){var a=document.getElementById(t);null!=a&&""!==a&&"undefined"!==a&&(0==alertsQueue.length&&n(),Laba.animate(a,"!f0",(function(n,t){e(n,1-t)}),(function(){removeFromParent(a),handleAlertsQueue()})))};0!=alertsQueue.length?(0==alertsContainer.isOpen&&(alertsContainer.isOpen=!0,alertsContainer.style.display="flex",Laba.cancel(alertsContainer),Laba.animate(alertsContainer,"f1",void 0,(function(){}))),0==alertsContainer.children.length&&function(n){for(var a=n.value,l=n.ask,r=n.message,u=n.buttons,i=n.callbacks,s=UNIQUEID(),c="",o=!0,d=u.length-1;d>=0;d-=1){var f=u[d];o?(o=!1,c+=`ALERT_BUTTON_CONTROL_DEFAULT(${s}Btn${d},${f})`):c+=`ALERT_BUTTON_CONTROL(${s}Btn${d},${f})`}insertHtml(alertsContainer,l?`ASK(${s},${r},${c})`:`ALERT(${s},${r},${c})`);var b=document.getElementById(s+"Value");for(null!=b&&""!==b&&"undefined"!==b&&(b.callback=i[i.length-1],textFieldOnEnter(b,(function(){let e;null!=b&&""!==b&&"undefined"!==b&&(e=b.value),null!=b.callback&&""!==b.callback&&"undefined"!==b.callback&&b.callback(e),t(s)})),b.value=a,b.focus()),d=i.length-1;d>=0;d-=1){var g=document.getElementById(s+"Btn"+d);g.callback=i[d],g.addEventListener("mouseup",(function(e){let n;null!=b&&""!==b&&"undefined"!==b&&(n=b.value),null!=e.currentTarget.callback&&""!==e.currentTarget.callback&&"undefined"!==e.currentTarget.callback&&e.currentTarget.callback(n),t(s)}))}requestAnimationFrame((function(){var n=document.getElementById(s);n.actualHeight=n.offsetHeight,Laba.animate(n,"!f1",(function(n,t){e(n,t)}),(function(e){e.style.height=""}))}))}(alertsQueue.shift())):n()}function alert(e,n,t){null!=e&&""!==e&&(null!=alertsContainer.isOpen&&""!==alertsContainer.isOpen||(alertsContainer.isOpen=!1),null!=n&&""!==n||(n=["Ok"]),null!=t&&""!==t||(t=[void 0]),e=e.replaceAll("\n","<br>"),alertsQueue.push({message:e,buttons:n,callbacks:t}),handleAlertsQueue())}function ask(e,n,t,a){null!=e&&""!==e&&(null!=alertsContainer.isOpen&&""!==alertsContainer.isOpen||(alertsContainer.isOpen=!1),null!=t&&""!==t||(t=["Ok"]),null!=a&&""!==a||(a=[void 0]),e=e.replaceAll("\n","<br>"),alertsQueue.push({value:n,ask:!0,message:e,buttons:t,callbacks:a}),handleAlertsQueue())}

"""###
private let compressedUiAlertJs = Data(base64Encoded:"H4sIAAAAAAACA72VX2/bNhDA3/cpYiIwyIUR7FdrbOC0DhrMiNvO2YtnJJR4soXQlCdSRgNX331HyX9kx+66DRgQRDTveLz73fFuJfMLqSF39nMBBYjJNEwKE7s0MxdzaZSG/l5K2VqDuwCxVaHADVtDYN2rhmAO6WzuhPkZAhm7QuqP1cYVWX4lfKu0SE29LQ6PleEKXTF702zdFaJ27X1mnEwN5EFqR0sw7TY9LRCtLh/KSAaxNDHoYy1WC6VJF9LBsZSTpEP4KkvVRYfThh/Hd9Vuq9QutXwVxGQGSMkYK7nbu+/Y2gckhcriYgHGBTNwAw1+eft6r1AhNIXWLSHbbUJaovoWRkGCl6jNBu1sGVQJCDSYmZu32+jWUSyctLz7e78NRxcAP91rx0p2EFEOi2wFd3m2+CRzdIhKxk9kuwoq7LROuHCz9+wfZKfD/4ZlogFr5b+ksHsyhT4SfsLjeJ5qhQR2YPf42DrJclrn0AQrqQvgGlfSvvAcvwuwVs6AF7iOCucyY3mK61hqHcn4xXIrHh/uPz8O7j9gtmJBCM88AiWKzXXX3VC9E51QXYtuXS6JKCZqGmY3NPO1HF+J5/5w8GX8dPs4Ho8ent6PHsZfRsOnD4O7/uNwTC/Xtrx15nKtSn65Tkr2zHrnDp1QLlNjEchHt3gDmuub5/5vv1aHUDv3/2I80qttv9ln1fuNzpa7vSK/e4aEhZ5rXfrRpvSj49LHDRrtUIp0ku6QTbmDr+4uBa1GZmAc5DQ6yHXVosIfuABEVOeV8Y327sbtsebG4fmGZL+maMpR6x8O39gWElcJQrEUN5VIz+Z+9j12mDdypVg4a0JRUz4LpFKDFWoOU+sAE0fJIissFMtmM4Aai/kRLOYYCwRxkfs2MZY5enYM6TviA9vn9c5J8BFucZY5/FmAdf3q4WNId7lcAG3mvZ4fZxliuz0YS/hUsySx4Oqfh33F+HbaPdlOj5opvJl/xA8D/0ebbdPO08RhCbAe+lruZmyl4seoN7/BveXqc1FPiDN9th4bJ4Xfvp0fkdu8bi14ZSMmZPRCpluZ28gcypyY1C0VpYBpzAGbdYyjQlPyhyGc/BLl7wjjzXCXhZ3T9aZH9oBvOmTP8F1/7Lny5NRp0rEvNRsu/3c6RwQO6OxGtjf0r+lUjwyJYJQ9nAtvYbkGLHkO1k9/AYqHua7DCQAA")!

public extension Pamphlet.Private.Figurehead.Ui {
    static func UiAllHtml() -> String {
    #if DEBUG
        let fileOnDiskPath = "/Volumes/Development/Development/chimerasw3/PicaroonTemplate/Resources/private/figurehead/ui/ui.all.html"
        if let contents = try? String(contentsOf:URL(fileURLWithPath: fileOnDiskPath)) {
            if contents.hasPrefix("#define PAMPHLET_PREPROCESSOR") {
                do {
                    let task = Process()
                    task.executableURL = URL(fileURLWithPath: "/usr/local/bin/pamphlet")
                    task.arguments = ["preprocess", fileOnDiskPath]
                    let outputPipe = Pipe()
                    task.standardOutput = outputPipe
                    try task.run()
                    let outputData = outputPipe.fileHandleForReading.readDataToEndOfFile()
                    let output = String(decoding: outputData, as: UTF8.self)
                    return output
                } catch {
                    return "Failed to use /usr/local/bin/pamphlet to preprocess the requested file"
                }
            }
            return contents
        }
        return String()
    #else
        return uncompressedUiAllHtml
    #endif
    }
    static func UiAllHtmlGzip() -> Data {
        return compressedUiAllHtml
    }
}

private let uncompressedUiAllHtml = ###"""

"""###
private let compressedUiAllHtml = Data(base64Encoded:"H4sIAAAAAAACAwMAAAAAAAAAAAA=")!

public extension Pamphlet.Private.Figurehead.Ui {
    static func UiAllJs() -> String {
    #if DEBUG
        let fileOnDiskPath = "/Volumes/Development/Development/chimerasw3/PicaroonTemplate/Resources/private/figurehead/ui/ui.all.js"
        if let contents = try? String(contentsOf:URL(fileURLWithPath: fileOnDiskPath)) {
            if contents.hasPrefix("#define PAMPHLET_PREPROCESSOR") {
                do {
                    let task = Process()
                    task.executableURL = URL(fileURLWithPath: "/usr/local/bin/pamphlet")
                    task.arguments = ["preprocess", fileOnDiskPath]
                    let outputPipe = Pipe()
                    task.standardOutput = outputPipe
                    try task.run()
                    let outputData = outputPipe.fileHandleForReading.readDataToEndOfFile()
                    let output = String(decoding: outputData, as: UTF8.self)
                    return output
                } catch {
                    return "Failed to use /usr/local/bin/pamphlet to preprocess the requested file"
                }
            }
            return contents
        }
        return String()
    #else
        return uncompressedUiAllJs
    #endif
    }
    static func UiAllJsGzip() -> Data {
        return compressedUiAllJs
    }
}

private let uncompressedUiAllJs = ###"""
function initFieldWithCount(t,e,n){t.updateCounter=function(){var u=t.value.length;e.innerText=`${u} of ${n}`,e.style.color=u<=n?"white":"ERRORRED()"},t.oninput=t.updateCounter,t.onchange=t.updateCounter,t.onkeyup=t.updateCounter,t.updateCounter()}

"""###
private let compressedUiAllJs = Data(base64Encoded:"H4sIAAAAAAACA23NwQrCMBAE0LtfEUoPCZR8gBo8aL0KQfDa0m5NMGxK3K2W0n8Xihelx5nHMB1jQz6i8Ojp7CG0N0/uGBlJUgEFqok0921NsJSQTPedSDUNdRJsSA91YNAB8E5uB9ojQrrCm0yVTzyL2Il8wrkqQD9pDKCbGGIyvDd4yF7OE2TbrLT2Ym15kiqbC9IRPfZM5u99kcbVeIdVesDI/Yr8ZKnmzQdzMqBS+QAAAA==")!

public extension Pamphlet.Private.Figurehead.Ui {
    static func UiButtonHtml() -> String {
    #if DEBUG
        let fileOnDiskPath = "/Volumes/Development/Development/chimerasw3/PicaroonTemplate/Resources/private/figurehead/ui/ui.button.html"
        if let contents = try? String(contentsOf:URL(fileURLWithPath: fileOnDiskPath)) {
            if contents.hasPrefix("#define PAMPHLET_PREPROCESSOR") {
                do {
                    let task = Process()
                    task.executableURL = URL(fileURLWithPath: "/usr/local/bin/pamphlet")
                    task.arguments = ["preprocess", fileOnDiskPath]
                    let outputPipe = Pipe()
                    task.standardOutput = outputPipe
                    try task.run()
                    let outputData = outputPipe.fileHandleForReading.readDataToEndOfFile()
                    let output = String(decoding: outputData, as: UTF8.self)
                    return output
                } catch {
                    return "Failed to use /usr/local/bin/pamphlet to preprocess the requested file"
                }
            }
            return contents
        }
        return String()
    #else
        return uncompressedUiButtonHtml
    #endif
    }
    static func UiButtonHtmlGzip() -> Data {
        return compressedUiButtonHtml
    }
}

private let uncompressedUiButtonHtml = ###"""

"""###
private let compressedUiButtonHtml = Data(base64Encoded:"H4sIAAAAAAACAwMAAAAAAAAAAAA=")!

public extension Pamphlet.Private.Figurehead.Ui {
    static func UiButtonJs() -> String {
    #if DEBUG
        let fileOnDiskPath = "/Volumes/Development/Development/chimerasw3/PicaroonTemplate/Resources/private/figurehead/ui/ui.button.js"
        if let contents = try? String(contentsOf:URL(fileURLWithPath: fileOnDiskPath)) {
            if contents.hasPrefix("#define PAMPHLET_PREPROCESSOR") {
                do {
                    let task = Process()
                    task.executableURL = URL(fileURLWithPath: "/usr/local/bin/pamphlet")
                    task.arguments = ["preprocess", fileOnDiskPath]
                    let outputPipe = Pipe()
                    task.standardOutput = outputPipe
                    try task.run()
                    let outputData = outputPipe.fileHandleForReading.readDataToEndOfFile()
                    let output = String(decoding: outputData, as: UTF8.self)
                    return output
                } catch {
                    return "Failed to use /usr/local/bin/pamphlet to preprocess the requested file"
                }
            }
            return contents
        }
        return String()
    #else
        return uncompressedUiButtonJs
    #endif
    }
    static func UiButtonJsGzip() -> Data {
        return compressedUiButtonJs
    }
}

private let uncompressedUiButtonJs = ###"""
function initButton(n,t,e){if(null!=n.length)for(let t,l=null!=n?n:[],u=0;t=l[u],u<l.length;u++)t.addEventListener("mouseup",(function(n){null!=e&&e(this)}));else n.addEventListener("mouseup",(function(n){null!=e&&e(this)}))}

"""###
private let compressedUiButtonJs = Data(base64Encoded:"H4sIAAAAAAACA6WNQQrCQAxF956idlESOhTX1kEQ3HmD4kJsxg7EjHQSN6V3V3Bu4O7De7wfTO4ak1RRop5MNQmIU0e4xABizFsvHZM8dMKQZmDSSh37go6yH67O/K5Xz4N954GL3lvbona3cTy/SfQSs5LQDPUzWSZ71Q5CeQfB5RekpiHQKWZcEXviTJX8k1g3HzfEdyLiAAAA")!

public extension Pamphlet.Private.Figurehead.Ui {
    static func UiGridHtml() -> String {
    #if DEBUG
        let fileOnDiskPath = "/Volumes/Development/Development/chimerasw3/PicaroonTemplate/Resources/private/figurehead/ui/ui.grid.html"
        if let contents = try? String(contentsOf:URL(fileURLWithPath: fileOnDiskPath)) {
            if contents.hasPrefix("#define PAMPHLET_PREPROCESSOR") {
                do {
                    let task = Process()
                    task.executableURL = URL(fileURLWithPath: "/usr/local/bin/pamphlet")
                    task.arguments = ["preprocess", fileOnDiskPath]
                    let outputPipe = Pipe()
                    task.standardOutput = outputPipe
                    try task.run()
                    let outputData = outputPipe.fileHandleForReading.readDataToEndOfFile()
                    let output = String(decoding: outputData, as: UTF8.self)
                    return output
                } catch {
                    return "Failed to use /usr/local/bin/pamphlet to preprocess the requested file"
                }
            }
            return contents
        }
        return String()
    #else
        return uncompressedUiGridHtml
    #endif
    }
    static func UiGridHtmlGzip() -> Data {
        return compressedUiGridHtml
    }
}

private let uncompressedUiGridHtml = ###"""

"""###
private let compressedUiGridHtml = Data(base64Encoded:"H4sIAAAAAAACAwMAAAAAAAAAAAA=")!

