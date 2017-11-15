import * as axios from 'axios';
import * as request from 'request';
//import * as request from 'supertest';
import { Api } from '../src/api';

describe('hitting external api', () => {
  let api;
  let url;

  beforeEach(() => {
    api = new Api();

    url = 'https://api.leancafe.io/status';
    //console.log('axios', Axios);
    //api = axios.create({
      //baseURL: 'https://leancafe.io',
      //timeout: 1000,
      ////headers: {'X-Custom-Header': 'foobar'}
    //});

    //console.log('axios', Object.keys(axios));
  });

  it('uses api', done => {
    api.get(url).then((err, response) => {
      console.log('response', response.body);
      //console.log('err', err);
      //console.log('res', response);
      done();
    });
  });

  //it('hits api', done => {
    //console.log('hitting api');

    //request('http://www.google.com', (error, response, body) => {
      //console.log('error:', error); // Print the error if one occurred
      //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      //console.log('body:', body); // Print the HTML for the Google homepage.
      //done();
    //});
  //});

  //it('hits api', () => {
    //api.get('https://api.leancafe.io/status')
      //.then(response => {
        //console.log('response', response);
        ////done();
      //})
      //.catch(err => {
        //console.log('err', err);
      //});
  //});
});

//describe('GET /users', () => {
////let api;

//beforeEach(() => {
////api = request('https://leancafe.io');
//});

//it('respond with json', function() {
////return api
////.get('/api_status')
////.set('Accept', 'application/json')
////.expect(200)
////.then(response => {
////expect(response.body.email).toEqual('foo@bar.com');
////})
//});
//});
