module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/recommended-reads/:slug',
      handler: 'recommended-read.findOne',
      config: {
        auth: false
      }
    }
  ]
}
