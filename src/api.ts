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
        console.log('err', err);
        return err;
      });
  }
}
