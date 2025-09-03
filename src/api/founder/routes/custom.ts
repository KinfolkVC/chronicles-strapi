module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/founders/:slug',
      handler: 'founder.findOne',
      config: {
        auth: false
      }
    }
  ]
}
