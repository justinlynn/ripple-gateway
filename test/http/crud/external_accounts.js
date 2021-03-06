var request = require('supertest');
var app = require(__dirname+'/../../../lib/app.js');
var gatewayd = require(__dirname+'/../../../');
var assert = require('assert');
var crypto = require('crypto');

var random = function(){ return crypto.randomBytes(16).toString('hex'); };

var auth = {
  name: 'admin@'+gatewayd.config.get('DOMAIN'),
  key: gatewayd.config.get('KEY')
}

var externalAccountCreatedId;

describe('CRUD ExternalAccounts', function(){

  it('should list externalAccounts', function(done){
    request(app)
      .get('/v1/external_accounts')
      .auth(auth.name, auth.key)
      .expect(200)
      .end(function(error, response){
        assert(response.body.success);
        assert(response.body.external_accounts);
        console.log(response.body.external_accounts);
        done();
      });
  });

  it('should create a externalAccount', function(done){
    request(app)
      .post('/v1/external_accounts')
      .send()
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response){
        assert(response.body.success); 
        assert(response.body.external_account.id);
        externalAccountCreatedId = response.body.external_account.id;
        done();
      });
  });

  it.skip('should update a externalAccount', function(done) {
    request(app)
      .put('/v1/external_accounts/'+externalAccountCreated.id)
      .send()
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response) {
        done();
      });
  });

  it.skip('should show a single externalAccount', function(done) {
    request(app)
      .get('/v1/external_accounts/'+externalAccountCreated.id)
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response) {
        done();
      });
  });

  it.skip('should delete a externalAccount', function(done) {
    request(app)
      .delete('/v1/external_accounts/'+externalAccountCreated.id)
      .auth(auth.user, auth.key)
      .expect(200)
      .end(function(error, response) {
        done();
      });
  });

});

