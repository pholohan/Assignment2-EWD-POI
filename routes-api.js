const Stadiums = require('./app/api/stadiums');
const Users = require('./app/api/users');
const Admins = require('./app/api/admins');

module.exports = [
  { method: 'GET', path: '/api/stadiums', config: Stadiums.find },
  { method: 'GET', path: '/api/stadiums/{id}', config: Stadiums.findOne },
  { method: 'POST', path: '/api/stadiums', config: Stadiums.create },
  { method: 'DELETE', path: '/api/stadiums/{id}', config: Stadiums.deleteOne },
  { method: 'DELETE', path: '/api/stadiums', config: Stadiums.deleteAll },

  { method: 'GET', path: '/api/users', config: Users.find },
  { method: 'GET', path: '/api/users/{id}', config: Users.findOne },
  { method: 'POST', path: '/api/users', config: Users.create },
  { method: 'DELETE', path: '/api/users/{id}', config: Users.deleteOne },
  { method: 'DELETE', path: '/api/users', config: Users.deleteAll },

  { method: 'GET', path: '/api/admins', config: Admins.find },
  { method: 'GET', path: '/api/admins/{id}', config: Admins.findOne },
  { method: 'POST', path: '/api/admins', config: Admins.create },
  { method: 'DELETE', path: '/api/admins/{id}', config: Admins.deleteOne },
  { method: 'DELETE', path: '/api/admins', config: Admins.deleteAll },
];