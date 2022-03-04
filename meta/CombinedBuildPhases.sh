#!/bin/bash

if [ "$(uname)" == "Darwin" ]; then
    
    # set the directory to the dir in which this script resides
    newPath=`echo $0 | awk '{split($0, a, ";"); split(a[1], b, "/"); for(x = 2; x < length(b); x++){printf("/%s", b[x]);} print "";}'`
    cd "./$newPath"
    
    set -e
    
    killall PICAROONTEMPLATE || true
    
    ./CopyDependencyResources.sh
    
    time ./pamphlet --collapse ../Resources/ ../Sources/Pamphlet/
    
    # FlynnLint - Confirms all Flynn code is concurrently safe
    FLYNNLINTSWIFTPM=../.build/checkouts/flynn/meta/FlynnLint
    FLYNNLINTLOCAL=../../../flynn/meta/FlynnLint

    if [ -f "${FLYNNLINTSWIFTPM}" ]; then
        time ${FLYNNLINTSWIFTPM} ../.build/checkouts/Picaroon ../
    elif [ -f "${FLYNNLINTLOCAL}" ]; then
        time ${FLYNNLINTLOCAL} ../.build/checkouts/Picaroon ../
    else
        echo "warning: Unable to find FlynnLint, aborting..."
    fi
        
    # SwiftLint - Confirms all swift code meets basic formatting standards
    if which swiftlint >/dev/null; then
        swiftlint --fix --path ../Sources/
        swiftlint --fix --path ../Tests/
    else
      echo "warning: SwiftLint not installed, download from https://github.com/realm/SwiftLint"
    fi
    
fi