IMAGE ?= website
REPOSITORY ?= ghcr.io/ombratteng/
docker ?= nerdctl

docker:
	$(docker) build \
        --build-arg NPM_TOKEN=${NPM_TOKEN} \
        --build-arg FONTAWESOME_TOKEN=${FONTAWESOME_TOKEN} \
        --tag $(REPOSITORY)$(IMAGE):latest .

push:
	$(docker) push $(REPOSITORY)$(IMAGE):latest

run:
	$(docker) run --rm -it -p 3000:3000 $(REPOSITORY)$(IMAGE):latest
