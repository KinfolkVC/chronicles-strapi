'use strict';

/**
 * founder service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::founder.founder');
