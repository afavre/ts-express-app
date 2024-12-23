# ts-express-app

Simple TypeScript and Express demo app with an HTTP Server with 2 endpoints:

- /health : for deploying behind a load balancer and checking the health of the service
- /long-task : simulating a long task that will be triggered

## Getting started

### Local Development

#### Local Run

```
npm install
make local
```

Check it works:

```
curl -vv http://localhost:8080/health

200 - OK

{"status":"ok"}%

```

#### Test

```

make test

```

### Deploy a new image

Pre-requisite:

- Configured AWS CLI with a user with admin permission
- Create an ECR Repo for the new image https://github.com/afavre/pulumi-aws-fargate
- Update the Makefile with your AWS_ACCOUNT_ID

Steps:

```
make build-push -e TAG=0.0.2 # the tag you want to give to the image
TODO Add CI part to deploy
For now, follow steps https://github.com/afavre/pulumi-aws-fargate (section long-task)
```
