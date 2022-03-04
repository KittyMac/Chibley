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

        switch command {
        case "list":
            list(jsonElement, returnCallback)
            break
        case "capture":
            capture(jsonElement, returnCallback)
            break
        case "release":
            release(jsonElement, returnCallback)
            break
        case "evolve":
            evolve(jsonElement, returnCallback)
            break
        case "inventory":
            inventory(jsonElement, returnCallback)
            break
        default:
            return returnCallback(nil, HttpStaticResponse.badRequest)
        }
    }

    private func list(_ jsonElement: JsonElement,
                      _ returnCallback: @escaping (JsonElement?, HttpResponse?) -> Void) {
        guard let path = jsonElement[hitch: "path"],
              let results = allPokemon.query(values: path) else {
            return returnCallback(nil,
                                  HttpResponse(json: allPokemon))
        }
        returnCallback(nil, HttpResponse(json: JsonElement(unknown: results)))
    }

    private func capture(_ jsonElement: JsonElement,
                         _ returnCallback: @escaping (JsonElement?, HttpResponse?) -> Void) {
        guard let number = jsonElement[halfhitch: "number"],
              let pokemonResults: [JsonAny] = allPokemon.query(values: "$..[?(@.number == '\(number)')]"),
              let pokemon = pokemonResults.first else {
            return returnCallback(nil, HttpStaticResponse.badRequest)
        }

        let chosenPokemon = JsonElement(unknown: pokemon)
        guard let name = chosenPokemon[halfhitch: "name"] else {
            return returnCallback(nil, HttpStaticResponse.badRequest)
        }

        // do not allow someone to have multiple of the same type of pokemon
        for pokemon in myPokemon.iterValues where pokemon[halfhitch: "number"] == number {
            return returnCallback(nil, HttpResponse(text: "Sorry trainer, but you already have a \(name)!"))
        }

        myPokemon.append(value: chosenPokemon)

        returnCallback(nil, HttpResponse(text: "I choose you, \(name)!"))
    }

    private func release(_ jsonElement: JsonElement,
                         _ returnCallback: @escaping (JsonElement?, HttpResponse?) -> Void) {
        guard let number = jsonElement[halfhitch: "number"] else {
            return returnCallback(nil, HttpStaticResponse.badRequest)
        }
        myPokemon.query(remove: "$..[?(@.number == '\(number)')]")
        myPokemon.clean()
        returnCallback(nil, HttpResponse(text: "Be free!"))
    }

    private func evolve(_ jsonElement: JsonElement,
                        _ returnCallback: @escaping (JsonElement?, HttpResponse?) -> Void) {
        guard let number = jsonElement[halfhitch: "number"],
              let pokemonResults: [JsonAny] = myPokemon.query(values: "$..[?(@.number == '\(number)')]"),
              let pokemon = pokemonResults.first else {
            return returnCallback(nil, HttpStaticResponse.badRequest)
        }
        let chosenPokemon = JsonElement(unknown: pokemon)
        guard let name = chosenPokemon[halfhitch: "name"],
              let nextEvolutionIdx = chosenPokemon[int: "evolution"],
              let evolutions = chosenPokemon[element: "evolutions"],
              let nextEvolutionName: HalfHitch = evolutions[nextEvolutionIdx] else {
            return returnCallback(nil, HttpStaticResponse.badRequest)
        }

        // Find the evolution using the name of the evolved form
        for evolution in allPokemon.iterValues where evolution[halfhitch: "name"] == nextEvolutionName {
            guard let evolutionNumber = evolution[halfhitch: "number"] else {
                return returnCallback(nil, HttpStaticResponse.internalServerError)
            }

            // do not allow someone to have multiple of the same type of pokemon
            for pokemon in myPokemon.iterValues where pokemon[halfhitch: "number"] == evolutionNumber {
                return returnCallback(nil, HttpResponse(text: "Sorry trainer, but you already have a \(nextEvolutionName)!"))
            }

            // release the unevolved form
            guard let _ = myPokemon.query(remove: "$..[?(@.number == '\(number)')]") else {
                return returnCallback(nil, HttpStaticResponse.internalServerError)
            }

            myPokemon.clean()

            // capture the evolved form
            myPokemon.append(value: evolution)

            return returnCallback(nil, HttpResponse(text: "\(name) has evolved into \(nextEvolutionName)!"))
        }

        return returnCallback(nil, HttpStaticResponse.badRequest)
    }

    private func inventory(_ jsonElement: JsonElement,
                           _ returnCallback: @escaping (JsonElement?, HttpResponse?) -> Void) {
        guard let path = jsonElement[hitch: "path"],
              let results = myPokemon.query(values: path) else {
            return returnCallback(nil, HttpResponse(json: myPokemon))
        }
        return returnCallback(nil, HttpResponse(json: JsonElement(unknown: results)))
    }
}
