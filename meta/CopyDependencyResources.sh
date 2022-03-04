#!/bin/bash

if [ "$(uname)" == "Darwin" ]; then
    
    # set the directory to the dir in which this script resides
    newPath=`echo $0 | awk '{split($0, a, ";"); split(a[1], b, "/"); for(x = 2; x < length(b); x++){printf("/%s", b[x]);} print "";}'`
    cd "./$newPath"
    
    set -e
        
    # Copy Endaevour resources
    #rsync -av --delete ../.build/checkouts/Endeavour/dist/private/endeavour ../Resources/private
    #rsync -av --delete ../.build/checkouts/Endeavour/dist/public/endeavour ../Resources/public
    
    rsync -av --delete ../.build/checkouts/Figurehead/dist/private/figurehead ../Resources/private
    #rsync -av --delete ../.build/checkouts/Figurehead/dist/public/figurehead ../Resources/public
    
    
fi