'use strict';

/**
 * join-team service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::join-team.join-team');
