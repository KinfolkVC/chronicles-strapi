export default ({ env }) => [
  'strapi::errors',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::session',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'script-src': [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            'https://cdn.ckeditor.com',
            'https://proxy-event.ckeditor.com'
          ],
          'connect-src': [ "'self'", 'http:', 'https:', 'https://proxy-event.ckeditor.com' ],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'dl.airtable.com',
            `https://${ env('AWS_BUCKET') }.s3.${ env('AWS_REGION') }.amazonaws.com/`,
            'https://cdn.ckeditor.com',
            'https://strapi.io',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'dl.airtable.com',
            `https://${ env('AWS_BUCKET') }.s3.${ env('AWS_REGION') }.amazonaws.com/`,
            'https://cdn.ckeditor.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::body',
  'strapi::favicon',
  'strapi::public',
];
