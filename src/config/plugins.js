/**
 * # plugins.js
 *
 * Plugins are like middleware, they get used 'automagically'
 *
 */
'use strict';


var internals = {};
const Sequelize = require('sequelize');
const sequelize = new Sequelize('AMSCM_XG_TEST', 'sa', '$lx%zh!2010#', {
  host: '10.10.10.203',
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  //storage: 'path/to/database.sqlite',
  define: {
    timestamps: false // true by default
  },
  freezeTableName: true
});
/**
* ## plugins
*
* when a route is config'd with auth, the hapi-auth-jwt will be invoked
*
* the good module prints out messages
*/
internals.plugins = function () {
  return [
    {
      register: require('hapi-auth-jwt'),
      options: {}
    },
    {

      register: require('good'),
      options: {
        opsInterval: 1000,
        reporters: [{
          reporter: require('good-console'),
          events: { log: '*', response: '*', request: '*' }
        }]
      }
    },
    {
      register: require('hapi-sequelize'),
      options: {
          name: 'CloudEasyShop', // identifier
          models: ['./src/models/**/*.js'],  // paths/globs to model files
          sequelize: sequelize// sequelize instance
          //sync: true, // sync models - default false
          //forceSync: false
      }
    }
  ];
};

module.exports.get = internals.plugins;
