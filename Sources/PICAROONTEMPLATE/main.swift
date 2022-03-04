import Foundation
import ArgumentParser

let httpPort: Int32 = 8080

struct PICAROONTEMPLATECLI: ParsableCommand {
    static var configuration = CommandConfiguration(
        abstract: "PICAROONTEMPLATE",
        subcommands: [Http.self],
        defaultSubcommand: Http.self)

    struct Http: ParsableCommand {
        static var configuration = CommandConfiguration(abstract: "Http server")

        @Argument(help: "IP address to listen on")
        var address: String = "0.0.0.0"

        mutating func run() throws {
            PICAROONTEMPLATE.http(address, httpPort)
        }
    }

}

PICAROONTEMPLATECLI.main()
