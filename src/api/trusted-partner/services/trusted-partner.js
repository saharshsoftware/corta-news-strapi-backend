'use strict';

/**
 * trusted-partner service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::trusted-partner.trusted-partner');
