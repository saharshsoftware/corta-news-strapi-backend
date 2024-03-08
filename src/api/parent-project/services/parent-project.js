'use strict';

/**
 * parent-project service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::parent-project.parent-project');
