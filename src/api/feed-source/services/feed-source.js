'use strict';

/**
 * feed-source service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::feed-source.feed-source');
