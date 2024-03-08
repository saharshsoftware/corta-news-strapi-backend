'use strict';

/**
 * cron-job service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cron-job.cron-job');
