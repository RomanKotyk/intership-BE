You can find examples of variables which you would need to set to run this app in .env.sample

- Copy .env.sample to .env

  `copy .env.sample .env`

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker



```bash
# build image
$ docker build -t <imageName> .
```

```bash
# launch app within Docker
$ docker run -p <hostPort>:<containerPort> <imageName>

# run tests within Docker
$ docker run <imageName> npm run test
```