import Flynn
import Foundation
import Picaroon
import Pamphlet
import Hitch
import Sextant
import Spanker

let allPokemon: JsonElement = Spanker.parse(halfhitch: HalfHitch(string: Pamphlet.Private.PokemonJson()))!

public class WebUserSession: UserServiceableSession {

    public required init() {
        super.init()
        unsafePriority = 99

        beAdd(service: PokemonService())
    }

    required init(cookieSessionUUID: Hitch?,
                  javascriptSessionUUID: Hitch?) {
        super.init(cookieSessionUUID: cookieSessionUUID, javascriptSessionUUID: javascriptSessionUUID)
        unsafePriority = 99

        beAdd(service: PokemonService())
    }

    public override func safeHandleRequest(connection: AnyConnection,
                                           httpRequest: HttpRequest) {

        let headers: [HalfHitch] = ["Set-Cookie: SESSION_UUID={0}" << [unsafeJavascriptSessionUUID]]

        let payload: Payloadable = httpRequest.supportsGzip ? Pamphlet.Private.ShellHtmlGzip() : Pamphlet.Private.ShellHtml()

        connection.beSend(httpResponse: HttpResponse(html: payload,
                                                     headers: headers))
    }
}
