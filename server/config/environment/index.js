'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || 'localhost',

  // Should we populate the DB with sample data?
  seedDB: false,

  //ativa a task que zera o jogo de tempos em tempos
  rankingHistoryTask: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'jeco-board-game-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  //social authentication
  authentication: {
    strategySettings: {
      facebook: {
        clientID: process.env.FACEBOOK_CLIENT_ID || '',
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
        profileFields: ['displayName', 'emails']
      },
      github: {
        clientID: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        scope: ['user:email']
      },
      google: {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        scope: 'https://www.googleapis.com/auth/plus.login'
      },
      linkedin: {
        clientID: process.env.LINKEDIN_CLIENT_ID || '',
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
        scope: ['r_basicprofile', 'r_emailaddress']
      }
    }
  }

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});

console.info(
  '====================================================\n' +
  'ambiente ' + process.env.NODE_ENV + '\n' +
  '====================================================');