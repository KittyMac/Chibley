import Flynn
import Foundation
import Picaroon
import Pamphlet
import Hitch
import Sextant

struct QueryRequest: Codable {
    let json: String
    let path: String
}

public class WebUserSession: UserSession {
    
    public required init() {
        super.init()
        unsafePriority = 99
    }

    required init(cookieSessionUUID: Hitch?, javascriptSessionUUID: Hitch?) {
        super.init(cookieSessionUUID: cookieSessionUUID, javascriptSessionUUID: javascriptSessionUUID)
        unsafePriority = 99
    }

    public override func safeHandleRequest(connection: AnyConnection,
                                           httpRequest: HttpRequest) {

        let headers: [HalfHitch] = ["Set-Cookie: SESSION_UUID={0}" << [unsafeJavascriptSessionUUID]]

        let payload: Payloadable = httpRequest.supportsGzip ? Pamphlet.Private.ShellHtmlGzip() : Pamphlet.Private.ShellHtml()

        connection.beSend(httpResponse: HttpResponse(html: payload,
                                                     headers: headers))
    }
}
