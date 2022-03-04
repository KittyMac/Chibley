#!/bin/sh

set -e

# set the directory to the parent of the dir in which this script resides
newPath=`echo $0 | awk '{split($0, a, ";"); split(a[1], b, "/"); for(x = 2; x < length(b); x++){printf("/%s", b[x]);} print "";}'`
cd "./$newPath/../"

# Project name is the name of the parent folder
new=`basename "$PWD"`
new2="$(tr [A-Z] [a-z] <<< "$new")"

old="PICAROONTEMPLATE"
old2="$(tr [A-Z] [a-z] <<< "$old")"

echo "Changing $old to $new..."

shouldProcessPath () {
        
	# do not allow changing of this script
	if [[ "$1" == *SetupTemplateProject.sh* ]]
	then
		#echo "Ignoring $1"
	  	return 0
	fi
	
	# do not allow changing of anything in .build
	if [[ "$1" == *.build* ]]
	then
		#echo "Ignoring $1"
	  	return 0
	fi
    
	# do not allow changing of anything in .git
	if [[ "$1" == *.git* ]]
	then
		#echo "Ignoring $1"
	  	return 0
	fi
    
	# do not allow changing of anything that starts with .
	if [[ `basename "$1"` == .* ]]
	then
		#echo "Ignoring $1"
	  	return 0
	fi
    
    if [[ -d "$1" ]]
    then
        return 1
    fi
    
    # Only allow files with the following extensions
	# do not allow changing of anything that starts with .
	if [[ 
        `basename "$1"` == *.html || 
        `basename "$1"` == *.swift ||
        `basename "$1"` == *.js ||
        `basename "$1"` == *.json ||
        `basename "$1"` == *.md ||
        `basename "$1"` == *.resolved ||
        `basename "$1"` == *.sh
    ]]
	then
	  	return 1
	fi
    
	if [[ "$1" == *Makefile* ]]
	then
	  	return 1
	fi
    
    return 0
}

# run through all directories, change them first
# process the longest (deepest) directories first

find . -type d -print | awk '{print length($0), $0}' | sort -n -r | awk '{print $2}' 2>/dev/null | while read file
do
	if shouldProcessPath "$file"; then
        continue
    fi
    
	# Rename the directory itself
	if [[ `basename "$file"` == *$old* ]]
	then
		newName=`echo $file | sed "s/$old/$new/g"`
		echo "Renaming directory $file to $newName"
		mv "$file" "$newName"
	fi
done

find . -type f -print0 | xargs -0 file | cut -f1 -d: 2>/dev/null | while read file
do
	if shouldProcessPath "$file"; then
        continue
    fi
    
	newName=`echo $file | sed "s/$old/$new/g"`
	echo "Renaming $file to $newName"
	mv "$file" "$newName"
	sed -i "" -e "s/$old/$new/g" -e "s/$old2/$new2/g" "$newName"
done