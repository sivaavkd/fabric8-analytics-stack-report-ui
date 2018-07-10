REGISTRY := quay.io
DEFAULT_TAG=latest
REPOSITORY_UI_TESTS?=fabric8-analytics-stack-report-ui-tests

ifeq ($(TARGET),rhel)
  DOCKERFILE := Dockerfile.rhel
  REPOSITORY := openshiftio/rhel-fabric8-analytics-stack-report-ui
else
  DOCKERFILE := Dockerfile
  REPOSITORY := openshiftio/fabric8-analytics-stack-report-ui
endif

.PHONY: all docker-build fast-docker-build test get-image-name get-image-repository

all: fast-docker-build

docker-build:
	docker build --no-cache --rm -t $(REGISTRY)/$(REPOSITORY):$(DEFAULT_TAG) -f $(DOCKERFILE) .

fast-docker-build:
	docker build --rm -t $(REGISTRY)/$(REPOSITORY):$(DEFAULT_TAG) -f $(DOCKERFILE) .

docker-run:
	docker run --detach=true --name=$(REPOSITORY) -it $(REGISTRY)/$(REPOSITORY):$(DEFAULT_TAG)

get-image-name:
	@echo $(REGISTRY)/$(REPOSITORY):$(DEFAULT_TAG)

get-image-repository:
	@echo $(REPOSITORY)

get-test-image-name:
	@echo $(REGISTRY)/$(REPOSITORY_UI_TESTS):$(DEFAULT_TAG)

get-push-registry:
	@echo $(REGISTRY)
