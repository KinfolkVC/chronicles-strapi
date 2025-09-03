export default {
  routes: [
    {
      method: "POST",
      path: "/subscribers",
      handler: "subscriber.create",
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
    {
      method: "DELETE",
      path: "/subscribers/unsubscribe/:id",
      handler: "subscriber.delete",
      config: {
        auth: false,
      },
    },
  ],
};
