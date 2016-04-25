'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/jecoboardgame-dev'
  },

  seedDB: true,
  rankingHistoryTask: true
};
