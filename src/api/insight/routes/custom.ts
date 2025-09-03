module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/insights/:slug',
      handler: 'insight.findOne',
      config: {
        auth: false
      }
    }
  ]
}
