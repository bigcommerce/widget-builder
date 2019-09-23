# widget-builder
Widget builder is a developer tool that can be used to build widgets

## Development mode
In the development mode, we will have 2 servers running. The front end code will be served by the webpack dev server which helps with hot and live reloading. The server side Express code will be served by a node server using nodemon which helps in automatically restarting the server whenever server side code changes.

## Production mode
In the production mode, we will have only 1 server running. All the client side code will be bundled into static files using webpack and it will be served by the Node.js/Express application.

## Setup
#### Install dependencies
```
npm install
```
#### Start development server
```
npm run dev
```
#### Build for production
```
npm run build
```
#### Start production server
```
npm run start
```
