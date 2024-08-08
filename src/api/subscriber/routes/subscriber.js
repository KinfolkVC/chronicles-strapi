'use strict';

/**
 * subscriber router
 */

// @ts-ignore
const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::subscriber.subscriber');
