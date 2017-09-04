// Determines dev or prod credentials

if (process.env.NODE_ENV === 'production') {
  //We are in production
  module.exports = require('./prod');
} else {
  // We are in dev
  module.exports = require('./dev');
}
