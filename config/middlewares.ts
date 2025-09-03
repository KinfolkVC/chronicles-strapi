export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'script-src': [ "'self'", 'https://cdn.ckeditor.com' ],
          'connect-src': [ "'self'", 'http:', 'https:' ],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'dl.airtable.com',
            `https://${ env('AWS_BUCKET') }.s3.${ env('AWS_REGION') }.amazonaws.com/`
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'dl.airtable.com',
            `https://${ env('AWS_BUCKET') }.s3.${ env('AWS_REGION') }.amazonaws.com/`
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
