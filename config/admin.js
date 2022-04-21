module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '0913985501596d3c0d861d51675eec14'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
});
