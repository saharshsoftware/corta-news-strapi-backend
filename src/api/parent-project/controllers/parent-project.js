'use strict';

/**
 * parent-project controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::parent-project.parent-project');
