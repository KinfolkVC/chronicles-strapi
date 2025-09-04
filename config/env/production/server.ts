export default ({ env }) => ({
  proxy: true,
  url: env('APP_URL', 'http://localhost:1337'), // Sets the public URL of the application.
  app: {
    keys: env.array('APP_KEYS')
  },
  emitErrors: false,
  logger: {
    updates: {
      enabled: false,
    },
    startup: {
      enabled: false,
    },
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
