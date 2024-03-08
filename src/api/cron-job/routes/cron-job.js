'use strict';

/**
 * cron-job router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::cron-job.cron-job');
