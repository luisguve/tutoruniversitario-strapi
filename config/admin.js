module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '84026a530a0312ae48427cdb06dfa8d1'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
});
