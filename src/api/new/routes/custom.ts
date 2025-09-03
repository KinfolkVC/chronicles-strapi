export default {
  routes: [
    {
      method: 'GET',
      path: '/news/:slug',
      handler: 'new.findOne',
      config: {
        auth: false
      }
    }
  ]
}
