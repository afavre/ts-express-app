AWS_ACCOUNT_ID = 
REGION = us-east-1
IMAGE_NAME = ts-express-server
ECR_REPO = $(AWS_ACCOUNT_ID).dkr.ecr.$(REGION).amazonaws.com/$(IMAGE_NAME)
TAG = 0.0.1

help: ## Show this help
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

local: ## Start the app locally
	npm run build && node ./dist/src/server.js

test: ## Run the tests
	npm test

build-push: ecr-login ## Build the Docker image locally
	npm run build
	docker buildx build --platform linux/amd64,linux/arm64 -t $(ECR_REPO):$(TAG) --push .

ecr-login: ## Authenticate Docker to ECR
	aws ecr get-login-password --region $(REGION) | docker login --username AWS --password-stdin $(ECR_REPO)

clean: ## Clean up local Docker images
	docker rmi $(IMAGE_NAME):$(TAG) $(ECR_REPO):$(TAG) || true

	