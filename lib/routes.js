'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    upload = require('./controllers/upload'),
    facebook = require('./controllers/facebook'),
    session = require('./controllers/session'),
    address = require('./controllers/address');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);
  
  app.post('/api/users', users.create);
  app.post('/api/upload', upload.upload);
  app.get('/api/upload', upload.get);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);
  app.put('/api/users/merge', users.merge);
  app.del('/api/users/merge', users.unmerge);

  app.put('/api/users/check', users.check);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  app.get('/api/address/manage', address.manage);


  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};