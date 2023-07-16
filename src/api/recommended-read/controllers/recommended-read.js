// @ts-nocheck
'use strict';

/**
 * recommended-read controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::recommended-read.recommended-read');

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

        data[index].attributes.createdBy = {
          id: foundItem.createdBy.id,
          firstname: foundItem.createdBy.firstname,
          lastname: foundItem.createdBy.lastname,
        };
        data[index].attributes.updatedBy = {
          id: foundItem.updatedBy.id,
          firstname: foundItem.updatedBy.firstname,
          lastname: foundItem.updatedBy.lastname,
        };
      })
    );
    return { data, meta };
  },
}));
