'use strict';

const { sanitize } = require('@strapi/utils');

module.exports = {
  async findRandomQuestions(ctx) {
    const { pageSize = 20, country } = ctx.query; // Default to 20 random questions if not specified

    // Calculate the date 3 days ago
    const today = new Date();
    const threeDaysAgo = new Date(today.setDate(today.getDate() - 3));

    try {
      // Query to filter by country and createdAt (last 3 days)
      const questions = await strapi.entityService.findMany('api::question.question', {
        filters: {
          createdAt: { $gte: threeDaysAgo.toISOString() }, // Created in the last 3 days
          newsPost: { country: country, type: 'news' }, // Filter by related newsPost's country
        },
        populate: {
          newsPost: {
            fields: ['country', 'title', 'source', 'summary', 'publicationDate', 'categories', 'shortenedByPhotoURL', 'shortenedBy', 'smallPhotoURL', 'link'],
          },
        },
        sort: { createdAt: 'desc' }, // Sort by createdAt (descending)
        limit: 200, // Limit to 200 questions
      });

      // Shuffle and pick random `x` questions
      const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
      const randomQuestions = shuffledQuestions.slice(0, pageSize);

      return ctx.send(randomQuestions);
    } catch (error) {
      ctx.throw(500, `An error occurred: ${error.message}`);
    }
  },
};
