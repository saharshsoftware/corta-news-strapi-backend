'use strict';

/**
 * staff-augmentation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::staff-augmentation.staff-augmentation');
