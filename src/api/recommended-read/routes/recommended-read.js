'use strict';

/**
 * recommended-read router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::recommended-read.recommended-read');
