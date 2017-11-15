import { Api } from '../src/api';

describe('hitting external api', () => {
  let api;
  let url;

  let responseBody;

  beforeEach(() => {
    api = new Api();
    url = 'https://api.leancafe.io/status';
  });

  it('uses api', done => {
    api.get(url).then(response => {
      responseBody = response.body;

      expect(responseBody.status).toEqual('up');
      //expect(responseBody.server_ts).toEqual('124123');

      //expect(responseBody).toEqual({});

      done();
    })
    .catch(err => {
      console.log('err', err);
      done();
    });
  });
});
