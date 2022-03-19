const bucket = process.env["AWS_BUCKET"]
const region = process.env["AWS_REGION"]

const url = `${bucket}.s3.${region}.amazonaws.com`

module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', url],
          'media-src': ["'self'", 'data:', 'blob:', url],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::favicon',
  'strapi::public',
];
