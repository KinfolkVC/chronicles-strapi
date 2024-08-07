'use strict';

/**
 * subscriber service
 */

// @ts-ignore
const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::subscriber.subscriber');
