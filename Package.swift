// swift-tools-version:5.2
import PackageDescription

let package = Package(
    name: "PICAROONTEMPLATE",
    platforms: [
        .macOS(.v10_15), .iOS(.v9)
    ],
    products: [
        .executable(name: "PICAROONTEMPLATE", targets: ["PICAROONTEMPLATE"]),
    ],
    dependencies: [
        .package(url: "https://github.com/KittyMac/Figurehead.git", .branch("main")),
		.package(url: "https://github.com/KittyMac/Flynn.git", .upToNextMinor(from: "0.2.0")),
		.package(url: "https://github.com/KittyMac/Picaroon.git", .upToNextMinor(from: "0.3.0")),
        .package(url: "https://github.com/KittyMac/Sextant.git", .upToNextMinor(from: "0.4.0")),
        .package(url: "https://github.com/KittyMac/Hitch.git", .upToNextMinor(from: "0.4.0")),
        //.package(url: "https://github.com/KittyMac/Rover.git", .upToNextMinor(from: "0.1.0")),
        .package(url: "https://github.com/apple/swift-argument-parser", from: "1.0.0"),
        .package(name: "Gzip", url: "https://github.com/1024jp/GzipSwift.git", .branch("develop")),
        
    ],
    targets: [
        .target(
            name: "PICAROONTEMPLATE",
            dependencies: [
                "Flynn",
                "Sextant",
                "Hitch",
                "Pamphlet",
                "Gzip",
                "Picaroon",
                .product(name: "ArgumentParser", package: "swift-argument-parser"),
            ]
        ),
        .target(
            name: "Pamphlet"
        ),
        .testTarget(
            name: "PICAROONTEMPLATETests",
            dependencies: [
                "PICAROONTEMPLATE"
            ],
            exclude: [
                "Resources"
            ]
        )
    ]
)
