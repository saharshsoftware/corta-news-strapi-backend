'use strict';

/**
 * parent-project router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::parent-project.parent-project');
