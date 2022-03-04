import Foundation

// swiftlint:disable all



public enum Pamphlet {
    #if DEBUG
    public static func get(string member: String) -> String? {
        switch member {
        case "/private/figurehead/utility/defines.js": return Pamphlet.Private.Figurehead.Utility.DefinesJs()
        case "/public/endeavour/editor.bundle.js": return Pamphlet.Public.Endeavour.EditorBundleJs()
        case "/private/endeavour/editor.fonts.html": return Pamphlet.Private.Endeavour.EditorFontsHtml()
        case "/private/endeavour/endeavour.html": return Pamphlet.Private.Endeavour.EndeavourHtml()
        case "/private/endeavour/endeavour.js": return Pamphlet.Private.Endeavour.EndeavourJs()
        case "/private/figurehead/figurehead.html": return Pamphlet.Private.Figurehead.FigureheadHtml()
        case "/private/figurehead/figurehead.js": return Pamphlet.Private.Figurehead.FigureheadJs()
        case "/private/figurehead/figurehead.style": return Pamphlet.Private.Figurehead.FigureheadStyle()
        case "/private/figurehead/utility/laba.js": return Pamphlet.Private.Figurehead.Utility.LabaJs()
        case "/public/manifest.json": return Pamphlet.Public.ManifestJson()
        case "/private/figurehead/utility/navigation.js": return Pamphlet.Private.Figurehead.Utility.NavigationJs()
        case "/private/pokemon.json": return Pamphlet.Private.PokemonJson()
        case "/private/script.combined.js": return Pamphlet.Private.ScriptCombinedJs()
        case "/private/shell.fonts.html": return Pamphlet.Private.ShellFontsHtml()
        case "/private/shell.html": return Pamphlet.Private.ShellHtml()
        case "/private/figurehead/utility/timer.js": return Pamphlet.Private.Figurehead.Utility.TimerJs()
        case "/private/figurehead/ui/ui.alert.html": return Pamphlet.Private.Figurehead.Ui.UiAlertHtml()
        case "/private/figurehead/ui/ui.alert.js": return Pamphlet.Private.Figurehead.Ui.UiAlertJs()
        case "/private/figurehead/ui/ui.all.html": return Pamphlet.Private.Figurehead.Ui.UiAllHtml()
        case "/private/figurehead/ui/ui.all.js": return Pamphlet.Private.Figurehead.Ui.UiAllJs()
        case "/private/figurehead/ui/ui.button.html": return Pamphlet.Private.Figurehead.Ui.UiButtonHtml()
        case "/private/figurehead/ui/ui.button.js": return Pamphlet.Private.Figurehead.Ui.UiButtonJs()
        case "/private/figurehead/ui/ui.grid.html": return Pamphlet.Private.Figurehead.Ui.UiGridHtml()
        case "/private/figurehead/utility/utility.js": return Pamphlet.Private.Figurehead.Utility.UtilityJs()
        default: break
        }
        return nil
    }
    #else
    public static func get(string member: String) -> StaticString? {
        switch member {
        case "/private/figurehead/utility/defines.js": return Pamphlet.Private.Figurehead.Utility.DefinesJs()
        case "/public/endeavour/editor.bundle.js": return Pamphlet.Public.Endeavour.EditorBundleJs()
        case "/private/endeavour/editor.fonts.html": return Pamphlet.Private.Endeavour.EditorFontsHtml()
        case "/private/endeavour/endeavour.html": return Pamphlet.Private.Endeavour.EndeavourHtml()
        case "/private/endeavour/endeavour.js": return Pamphlet.Private.Endeavour.EndeavourJs()
        case "/private/figurehead/figurehead.html": return Pamphlet.Private.Figurehead.FigureheadHtml()
        case "/private/figurehead/figurehead.js": return Pamphlet.Private.Figurehead.FigureheadJs()
        case "/private/figurehead/figurehead.style": return Pamphlet.Private.Figurehead.FigureheadStyle()
        case "/private/figurehead/utility/laba.js": return Pamphlet.Private.Figurehead.Utility.LabaJs()
        case "/public/manifest.json": return Pamphlet.Public.ManifestJson()
        case "/private/figurehead/utility/navigation.js": return Pamphlet.Private.Figurehead.Utility.NavigationJs()
        case "/private/pokemon.json": return Pamphlet.Private.PokemonJson()
        case "/private/script.combined.js": return Pamphlet.Private.ScriptCombinedJs()
        case "/private/shell.fonts.html": return Pamphlet.Private.ShellFontsHtml()
        case "/private/shell.html": return Pamphlet.Private.ShellHtml()
        case "/private/figurehead/utility/timer.js": return Pamphlet.Private.Figurehead.Utility.TimerJs()
        case "/private/figurehead/ui/ui.alert.html": return Pamphlet.Private.Figurehead.Ui.UiAlertHtml()
        case "/private/figurehead/ui/ui.alert.js": return Pamphlet.Private.Figurehead.Ui.UiAlertJs()
        case "/private/figurehead/ui/ui.all.html": return Pamphlet.Private.Figurehead.Ui.UiAllHtml()
        case "/private/figurehead/ui/ui.all.js": return Pamphlet.Private.Figurehead.Ui.UiAllJs()
        case "/private/figurehead/ui/ui.button.html": return Pamphlet.Private.Figurehead.Ui.UiButtonHtml()
        case "/private/figurehead/ui/ui.button.js": return Pamphlet.Private.Figurehead.Ui.UiButtonJs()
        case "/private/figurehead/ui/ui.grid.html": return Pamphlet.Private.Figurehead.Ui.UiGridHtml()
        case "/private/figurehead/utility/utility.js": return Pamphlet.Private.Figurehead.Utility.UtilityJs()
        default: break
        }
        return nil
    }
    #endif
    public static func get(gzip member: String) -> Data? {
        #if DEBUG
            return nil
        #else
            switch member {
        case "/private/figurehead/utility/defines.js": return Pamphlet.Private.Figurehead.Utility.DefinesJsGzip()
        case "/public/endeavour/editor.bundle.js": return Pamphlet.Public.Endeavour.EditorBundleJsGzip()
        case "/private/endeavour/editor.fonts.html": return Pamphlet.Private.Endeavour.EditorFontsHtmlGzip()
        case "/private/endeavour/endeavour.html": return Pamphlet.Private.Endeavour.EndeavourHtmlGzip()
        case "/private/endeavour/endeavour.js": return Pamphlet.Private.Endeavour.EndeavourJsGzip()
        case "/private/figurehead/figurehead.html": return Pamphlet.Private.Figurehead.FigureheadHtmlGzip()
        case "/private/figurehead/figurehead.js": return Pamphlet.Private.Figurehead.FigureheadJsGzip()
        case "/private/figurehead/figurehead.style": return Pamphlet.Private.Figurehead.FigureheadStyleGzip()
        case "/private/figurehead/utility/laba.js": return Pamphlet.Private.Figurehead.Utility.LabaJsGzip()
        case "/public/manifest.json": return Pamphlet.Public.ManifestJsonGzip()
        case "/private/figurehead/utility/navigation.js": return Pamphlet.Private.Figurehead.Utility.NavigationJsGzip()
        case "/private/pokemon.json": return Pamphlet.Private.PokemonJsonGzip()
        case "/private/script.combined.js": return Pamphlet.Private.ScriptCombinedJsGzip()
        case "/private/shell.fonts.html": return Pamphlet.Private.ShellFontsHtmlGzip()
        case "/private/shell.html": return Pamphlet.Private.ShellHtmlGzip()
        case "/private/figurehead/utility/timer.js": return Pamphlet.Private.Figurehead.Utility.TimerJsGzip()
        case "/private/figurehead/ui/ui.alert.html": return Pamphlet.Private.Figurehead.Ui.UiAlertHtmlGzip()
        case "/private/figurehead/ui/ui.alert.js": return Pamphlet.Private.Figurehead.Ui.UiAlertJsGzip()
        case "/private/figurehead/ui/ui.all.html": return Pamphlet.Private.Figurehead.Ui.UiAllHtmlGzip()
        case "/private/figurehead/ui/ui.all.js": return Pamphlet.Private.Figurehead.Ui.UiAllJsGzip()
        case "/private/figurehead/ui/ui.button.html": return Pamphlet.Private.Figurehead.Ui.UiButtonHtmlGzip()
        case "/private/figurehead/ui/ui.button.js": return Pamphlet.Private.Figurehead.Ui.UiButtonJsGzip()
        case "/private/figurehead/ui/ui.grid.html": return Pamphlet.Private.Figurehead.Ui.UiGridHtmlGzip()
        case "/private/figurehead/utility/utility.js": return Pamphlet.Private.Figurehead.Utility.UtilityJsGzip()
            default: break
            }
            return nil
        #endif
    }
    public static func get(data member: String) -> Data? {
        switch member {
        case "/public/icon192.png": return Pamphlet.Public.Icon192Png()
        case "/public/icon512.png": return Pamphlet.Public.Icon512Png()
        case "/public/fonts/lato.woff2": return Pamphlet.Public.Fonts.LatoWoff2()
        case "/public/fonts/roboto.woff2": return Pamphlet.Public.Fonts.RobotoWoff2()
        case "/public/fonts/robotomono.woff": return Pamphlet.Public.Fonts.RobotomonoWoff()
        case "/public/endeavour/robotomono_400.woff": return Pamphlet.Public.Endeavour.Robotomono400Woff()
        case "/public/endeavour/robotomono_500.woff": return Pamphlet.Public.Endeavour.Robotomono500Woff()
        default: break
        }
        return nil
    }
}
public extension Pamphlet.Private.Figurehead { enum Utility { } }
public extension Pamphlet.Public { enum Endeavour { } }
public extension Pamphlet.Private { enum Endeavour { } }
public extension Pamphlet.Private { enum Figurehead { } }
public extension Pamphlet { enum Public { } }
public extension Pamphlet { enum Private { } }
public extension Pamphlet.Private.Figurehead { enum Ui { } }
public extension Pamphlet.Public { enum Fonts { } }
