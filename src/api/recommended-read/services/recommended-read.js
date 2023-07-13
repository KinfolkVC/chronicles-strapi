'use strict';

/**
 * recommended-read service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::recommended-read.recommended-read');
