'use strict';

/**
 * cron-job controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::cron-job.cron-job');
