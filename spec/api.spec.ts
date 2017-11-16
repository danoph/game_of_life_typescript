import { Api } from '../src/api';

describe('hitting external api', () => {
  let api;
  let url;

  beforeEach(() => {
    api = new Api();
    url = 'https://api.leancafe.io/status';
  });

  it('uses api', done => {
    api.get(url).then(response => {
      //console.log(response.body);
      //expect(response.body).toEqual({});

      expect(response.body.status).toEqual('up');
      //expect(responseBody.server_ts).toEqual('124123');

      done();
    })
    .catch(err => {
      console.log('err', err);
      done();
    });
  });
});
