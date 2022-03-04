SWIFT_BUILD_FLAGS=--configuration release
PROJECTNAME := $(shell basename `pwd`)

build: preprocess
	swift build -v $(SWIFT_BUILD_FLAGS)

setup: clean setup-internal update xcode

setup-internal: 
	./meta/SetupTemplateProject.sh
	rm -f ./meta/SetupTemplateProject.sh

preprocess:
	./meta/CombinedBuildPhases.sh

update:
	mkdir -p ./Sources/Pamphlet
	swift package update
	rm -rf ./Sources/Pamphlet
	./meta/CombinedBuildPhases.sh

clean:
	rm -rf .build

test:
	swift test -v

pamphlet:
	rm -rf ./Sources/Pamphlet
	./meta/CombinedBuildPhases.sh

xcode: pamphlet preprocess
	swift package generate-xcodeproj
	meta/addBuildPhase ${PROJECTNAME}.xcodeproj/project.pbxproj "${PROJECTNAME}::${PROJECTNAME}" 'export PATH=/opt/homebrew/bin:/opt/homebrew/sbin:$$PATH; cd $${SRCROOT}; ./meta/CombinedBuildPhases.sh'
	sleep 2
	open ${PROJECTNAME}.xcodeproj

docker:
	-DOCKER_HOST=tcp://192.168.1.209:2376 docker buildx create --name cluster --platform linux/arm64/v8 --append
	-DOCKER_HOST=tcp://192.168.1.198:2376 docker buildx create --name cluster --platform linux/amd64 --append
	-docker buildx use cluster
	-docker buildx inspect --bootstrap
	-docker login
	docker buildx build --platform linux/amd64,linux/arm64/v8 --push -t kittymac/picaroontemplate .

docker-service-log:
	-ssh rjbowli@192.168.1.200 "docker service logs --follow picaroontemplate-http"

docker-service-start:
	-ssh rjbowli@192.168.1.200 "docker service create --name picaroontemplate-http --constraint 'node.hostname==cluster200' --publish published=9080,target=8080,mode=host --with-registry-auth --mode global kittymac/picaroontemplate ./picaroontemplate http"
	
docker-service-stop:
	-ssh rjbowli@192.168.1.200 "docker service rm picaroontemplate-http"
	
docker-service-deploy: docker-service-stop docker-service-start
	echo "deployed"