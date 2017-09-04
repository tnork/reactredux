// We do want to commit this for Heroku

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mLabMongoURI: process.env.MLABMONGO_URI,
  cookieKeys: process.env.COOKIE_KEYS
};
