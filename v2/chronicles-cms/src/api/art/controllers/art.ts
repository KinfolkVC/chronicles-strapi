// @ts-nocheck
'use strict';
/**
 *  [collection-name] controller
 */
import { factories } from '@strapi/strapi';
export default factories.createCoreController('api::art.art', ({ strapi }) => ({
  async find(ctx) {
    // Calling the default core action
    const { data, meta } = await super.find(ctx);
    const query = strapi.query('api::art.art');
    await Promise.all(
      data.map(async (item, index) => {
        // map through the data in recommended-reads
        // use the individual item SLUGS to query the individual items
        // populate the response with `createdBy` and `updatedBy`
        const foundItem = await query.findOne({
          where: {
            slug: item.slug,
          },
          populate: [ 'coverImage', 'createdBy', 'updatedBy' ],
        });
      })
    );
    return { data, meta };
  },
  async findOne(ctx) {
    // Get the SLUG from the request
    // use it to fetch data that matches SLUG
    // Finally, populate response with `createdBy` and `updatedBy`
    const { slug } = ctx.params;
    const entity = await strapi.query('api::art.art').findOne({
      where: { slug },
      populate: [ 'coverImage', 'createdBy', 'updatedBy' ],
    });

    // Sanitize entity
    const sanitizedEntity = await this.sanitizeOutput(entity);

    return this.transformResponse(sanitizedEntity)
  }
}));
