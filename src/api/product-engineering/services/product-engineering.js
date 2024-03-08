'use strict';

/**
 * product-engineering service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::product-engineering.product-engineering');
