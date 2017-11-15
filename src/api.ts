//import * as axios from 'axios';
//var request = require('request');
//import * as request from 'request';
import * as request from 'superagent';

export class Api {
  get(url) {
    //console.log('getting url', url);

    return request
      .get(url)
      .then(response => {
        return response;
        //console.log('response', response);
      })
      .catch(err => {
        return err;
        console.log('err', err);
      });
      //.query({ action: 'edit', city: 'London' }) // query string
      //.use(prefix) // Prefixes *only* this request
      //.use(nocache) // Prevents caching of *only* this request
      //.end((err, res) => {
        //console.log('err', err);
        //console.log('res', res);
        //// Do something
      //});

    //return request(url, (error, response, body) => {
      //console.log('error:', error); // Print the error if one occurred
      //console.log(error);
      //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      //console.log('body:', body); // Print the HTML for the Google homepage.
    //});
    //return fetch(url);
    //return axios.get(url)
    //.then(response => {
    //console.log('response', response);
    ////done();
    //})
    //.catch(err => {
    //console.log('err', err);
    //});
  }
}
