import Foundation
import ArgumentParser
import Picaroon
import Flynn
import Sextant
import Spanker
import Hitch

/// A very simple Pokemon service.

public class PokemonService: ServiceActor {

    private var myPokemon = JsonElement(unknown: [])

    public override func safeHandleRequest(userSession: UserServiceableSession,
                                           jsonElement: JsonElement,
                                           httpRequest: HttpRequest,
                                           _ returnCallback: @escaping (JsonElement?, HttpResponse?) -> Void) {
        guard let command = jsonElement[halfhitch: "command"] else {
            return returnCallback(nil, HttpStaticResponse.badRequest)
        }

        let sessionHeader: HalfHitch = "Session-Id:{0}" << [userSession.unsafeJavascriptSessionUUID]

        switch command {
        case "list":
            list(sessionHeader, jsonElement, returnCallback)
            break
        case "capture":
            capture(sessionHeader, jsonElement, returnCallback)
            break
        case "release":
            release(sessionHeader, jsonElement, returnCallback)
            break
        case "evolve":
            evolve(sessionHeader, jsonElement, returnCallback)
            break
        case "inventory":
            inventory(sessionHeader, jsonElement, returnCallback)
            break
        default:
            return returnCallback(nil, HttpStaticResponse.badRequest)
        }
    }

    private func list(_ sessionHeader: HalfHitch,
                      _ jsonElement: JsonElement,
                      _ returnCallback: @escaping (JsonElement?, HttpResponse?) -> Void) {
        guard let path = jsonElement[hitch: "path"],
              let results = allPokemon.query(values: path) else {
            return returnCallback(nil,
                                  HttpResponse(json: allPokemon,
                                               headers: [sessionHeader]))
        }
        returnCallback(nil, HttpResponse(json: JsonElement(unknown: results),
                                         headers: [sessionHeader]))
    }

    private func capture(_ sessionHeader: HalfHitch,
                         _ jsonElement: JsonElement,
                         _ returnCallback: @escaping (JsonElement?, HttpResponse?) -> Void) {
        guard let number = jsonElement[halfhitch: "number"],
              let pokemonResults: [JsonAny] = allPokemon.query(values: "$..[?(@.number == '\(number)')]"),
              let pokemon = pokemonResults.first else {
            return returnCallback(nil, HttpStaticResponse.badRequest)
        }

        let chosenPokemon = JsonElement(unknown: pokemon)
        myPokemon.append(value: chosenPokemon)

        guard let name = chosenPokemon[halfhitch: "name"] else {
            return returnCallback(nil, HttpStaticResponse.badRequest)
        }

        returnCallback(nil, HttpResponse(text: "I choose you, \(name)!",
                                         headers: [sessionHeader]))
    }

    private func release(_ sessionHeader: HalfHitch,
                         _ jsonElement: JsonElement,
                         _ returnCallback: @escaping (JsonElement?, HttpResponse?) -> Void) {
        guard let number = jsonElement[halfhitch: "number"],
              let pokemon = myPokemon.query(remove: "$..[?(@.number == '\(number)')]"),
              let name = pokemon[halfhitch: "name"] else {
            return returnCallback(nil, HttpStaticResponse.badRequest)
        }
        returnCallback(nil, HttpResponse(text: "See you later \(name)!",
                                         headers: [sessionHeader]))
    }

    private func evolve(_ sessionHeader: HalfHitch,
                        _ jsonElement: JsonElement,
                        _ returnCallback: @escaping (JsonElement?, HttpResponse?) -> Void) {
        guard let number = jsonElement[halfhitch: "number"],
              let pokemonResults: [JsonAny] = myPokemon.query(values: "$..[?(@.number == '\(number)')]"),
              let pokemon = pokemonResults.first else {
            return returnCallback(nil, HttpStaticResponse.badRequest)
        }
        let chosenPokemon = JsonElement(unknown: pokemon)
        guard let name = chosenPokemon[halfhitch: "name"] else {
            return returnCallback(nil, HttpStaticResponse.badRequest)
        }

        returnCallback(nil, HttpResponse(text: "Grow up \(name)!",
                                         headers: [sessionHeader]))
    }

    private func inventory(_ sessionHeader: HalfHitch,
                           _ jsonElement: JsonElement,
                           _ returnCallback: @escaping (JsonElement?, HttpResponse?) -> Void) {
        guard let path = jsonElement[hitch: "path"],
              let results = myPokemon.query(values: path) else {
            return returnCallback(nil, HttpResponse(json: myPokemon,
                                                    headers: [sessionHeader]))
        }
        return returnCallback(nil, HttpResponse(json: JsonElement(unknown: results),
                                                headers: [sessionHeader]))
    }
}
