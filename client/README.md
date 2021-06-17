# React Client Side

## Built with
* React & Redux
* Material-UI
* Firebase

## Tools
* Node Runtime
* Yarn *In contrast to npm, yarn installs packages in parallel, which optimizes the build process later - [read more here](https://www.section.io/engineering-education/npm-vs-yarn-which-one-to-choose/#:~:text=yarn%20installs%20packages%20in%20parallel.%20yarn%20is%20optimized%20to%20fetch%20and%20install%20multiple%20packages%20simultaneously.)*
* Webpack
  * Using `react-hot-loader` for hot reloading but it is not perfect. Waiting for the first stable version of [React Refresh](https://github.com/pmmmwh/react-refresh-webpack-plugin)
* Docker

## To run this project locally

* Start docker on your local machine
* Set your shell's current working directory is set to `client`, (eg `cd client`).
* Install dependencies with `yarn install`
* Create a firebase config file at `$(pwd)/firebase/config.ts` and expose your firebase project credentils as `const firebaseConfig = {/*...*/}` You can find the credentials from your [firebase project settings](./readme/firebase_project_settings.md)



To run on your MaxOS and Linux shell
* Start the project locally with `yarn start`


If you want to develop within a docker container:
  * Start docker desktop
  * Start your local development with `yarn run StartInDocker`
  * In the event if you need to peer into your local container: `yarn run dockerExec:local`
  * Local image name is `totallyawesome_local`

## Building for Prod environment

* Ensure you have docker installed and cloned this repo into your pipeline.
* Set your shell's current working directory is set to `client`, (eg `cd client`).
  * Run `yarn install`
  * Run `yarn run webpack:prod` to bundle the code
* To build a sample prod image
  * Run `yarn run dockerBuild:prodTest`
  * Then run `yarn run testRunProdImageLocally` and visit `localhost:8080`
* If all is good and you're to build for prod deployment
  * Run `docker build --rm -t <dockerhub_userid>/totallyawesome:<tagname> -f ./docker/Dockerfile.prod .`
  * Run `docker push pacopalo/totallyawesome:latest`
  * Production image name is `totallyawesome`
  * To test run the newly built production image, run `yarn run testRunProdImageLocally`

## Testing

### Unit Test

Testing tools: *Jest* and *React Testing Library*

* To trigger a single run test, `yarn test`
* To trigger a watched test, `yarn test --watch`
