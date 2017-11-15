import { Api } from './src/api';

const api = new Api();

api.get('https://api.leancafe.io/status')
  .then(response => {
    console.log('response', response);
  })
  .catch(err => {
    console.log('err', err);
  });

//{
  //"compileOnSave": false,
  //"compilerOptions": {
    //"outDir": "./dist/out-tsc",
    //"baseUrl": "src",
    //"sourceMap": true,
    //"declaration": false,
    //"moduleResolution": "node",
    //"emitDecoratorMetadata": true,
    //"experimentalDecorators": true,
    //"target": "es5",
    //"typeRoots": [
      //"node_modules/@types"
    //],
    //"lib": [
      //"es2016",
      //"dom"
    //]
  //}
//}
