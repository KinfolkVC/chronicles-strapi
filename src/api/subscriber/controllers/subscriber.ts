"use strict";

/**
 * Subscribers router.
 */

// @ts-ignore
import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  "api::subscriber.subscriber",
  ({ strapi }) => ({
    async find(ctx) {
      // Calling the default core action
      const { data, meta } = await super.find(ctx);
      const query = strapi.query("api::subscriber.subscriber");
      // Query all the data in subscriber
      await Promise.all(
        data.map(async (item, index) => {
          // map through the data in subscriber
          // use the individual item EMAILS to query the individual items
          const foundItem = await query.findOne({
            where: {
              email: item.email,
            },
          });
        })
      );
      return { data, meta };
    },
    async findOne(ctx) {
      // Get the ID from the request
      // use it to fetch data that matches subscriber ID
      const { id } = ctx.params;
      const data = await strapi.query('api::subscriber.subscriber').findOne({
        where: { id },
      });

      return { ...data }
    },
    async create(ctx) {
      const { email } = ctx.request.body;
      // let subscriber;

      // Check if the email already exists
      const existingSubscriber = await strapi
        .query("api::subscriber.subscriber")
        .findOne({ where: { email } });
      if (existingSubscriber) {
        return ctx.badRequest("Email already subscribed");
      }

      // Create new subscriber
      const subscriber = await strapi
        .query("api::subscriber.subscriber")
        .create({
          data: { email },
        });

      return subscriber;
    },
    async delete(ctx) {
      const { id } = ctx.params;

      try {
        // Delete the subscriber with the given ID
        await strapi.entityService.delete("api::subscriber.subscriber", id);

        // Return a success message
        ctx.send({ message: "You have been unsubscribed successfully." });
      } catch (error) {
        strapi.log.error("Failed to unsubscribe:", error);
        ctx.send(
          { error: "Failed to unsubscribe. Please try again later." },
          500
        );
      }
    },
  })
);
