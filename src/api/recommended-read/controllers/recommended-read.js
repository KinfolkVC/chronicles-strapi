// @ts-nocheck
'use strict';
/**
 *  [collection-name] controller
 */
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::recommended-read.recommended-read', ({ strapi }) => ({
  async find(ctx) {
    // Calling the default core action
    const { data, meta } = await super.find(ctx);
    const query = strapi.query('api::recommended-read.recommended-read');
    await Promise.all(
      data.map(async (item, index) => {
        const foundItem = await query.findOne({
          where: {
            id: item.id,
          },
          populate: ['createdBy', 'updatedBy'],
        });
      })
    );
    return { data, meta };
  },
}));
