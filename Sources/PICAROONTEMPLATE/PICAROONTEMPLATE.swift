import Foundation
import ArgumentParser
import Picaroon
import Flynn
import Pamphlet

#if DEBUG
let cacheMaxAge = 5
#else
let cacheMaxAge = 3600
#endif

func handleStaticRequest(_ httpRequest: HttpRequest) -> HttpResponse? {
    if let url = httpRequest.url {

        if url.contains("private/") {
            return HttpStaticResponse.internalServerError
        } else {

            // Request for HTML are never satisfied by the static resources
            if url.ends(with: ".htm") {
                return HttpStaticResponse.internalServerError
            }

            // We only ever allow script.combined.js to be downloaded, and it is a combination of scripts.
            if url.ends(with: "script.combined.js") {
                let payload: Payloadable = httpRequest.supportsGzip ? Pamphlet.Private.ScriptCombinedJsGzip() : Pamphlet.Private.ScriptCombinedJs()
                return HttpResponse(javascript: payload)
            }

            let urlString = url.description
            if let content = Pamphlet.get(gzip: urlString), httpRequest.supportsGzip {
                return HttpResponse(status: .ok,
                                    type: HttpContentType.fromPath(url),
                                    payload: content,
                                    encoding: HttpEncoding.gzip.rawValue,
                                    cacheMaxAge: cacheMaxAge)
            } else if let content = Pamphlet.get(data: urlString) {
                return HttpResponse(status: .ok,
                                    type: HttpContentType.fromPath(url),
                                    payload: content,
                                    cacheMaxAge: cacheMaxAge)
            } else if let content = Pamphlet.get(string: urlString) {
                return HttpResponse(status: .ok,
                                    type: HttpContentType.fromPath(url),
                                    payload: content,
                                    cacheMaxAge: cacheMaxAge)
            }
        }
    }
    return nil
}

public enum PICAROONTEMPLATE {

    public static func http(_ address: String,
                            _ httpPort: Int32) {

        Flynn.startup()

        let config = ServerConfig(address: address,
                                  port: Int(httpPort),
                                  requestTimeout: 30.0,
                                  maxRequestInBytes: 65536)

        Server<WebUserSession>(config: config,
                               staticStorageHandler: handleStaticRequest).run()
    }

}
