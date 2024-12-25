'use strict';

const { sanitize } = require('@strapi/utils');

module.exports = {
  async findRandomQuestions(ctx) {
    const { pageSize = 20, country, includedCategories, excludedCategories } = ctx.query;

    // Calculate the date 3 days ago
    const today = new Date();
    const threeDaysAgo = new Date(today.setDate(today.getDate() - 30));

    const filters = {
      createdAt: { $gte: threeDaysAgo.toISOString() }, // Created in the last 3 days
      newsPost: {
        country: { $eq: country }, // Filter by related newsPost's country
        type: { $eq: 'news' }, // Default type is 'news'
      },
    };

    try {
      // Fetch 1000 questions
      const questions = await strapi.entityService.findMany('api::question.question', {
        filters,
        populate: {
          newsPost: {
            fields: [
              'country',
              'title',
              'source',
              'summary',
              'publicationDate',
              'categories',
              'shortenedByPhotoURL',
              'shortenedBy',
              'smallPhotoURL',
              'link',
            ],
          },
        },
        sort: { createdAt: 'desc' }, // Sort by createdAt (descending)
        limit: 1000, // Fetch 1000 questions
      });

      // Apply category filters locally
      let filteredQuestions = questions;

      if (includedCategories) {
        const includedCategoryArray = includedCategories.split(',');
        filteredQuestions = filteredQuestions.filter((question) =>
          includedCategoryArray.some((category) =>
            question.newsPost.categories.split(',').includes(category.trim())
          )
        );
      }

      if (excludedCategories) {
        const excludedCategoryArray = excludedCategories.split(',');
        filteredQuestions = filteredQuestions.filter(
          (question) =>
            !excludedCategoryArray.some((category) =>
              question.newsPost.categories.split(',').includes(category.trim())
            )
        );
      }

      // If filtered questions are less than `pageSize`, fill with random recent questions
      if (filteredQuestions.length < pageSize) {
        const remainingQuestions = questions.filter(
          (q) => !filteredQuestions.includes(q)
        );
        const additionalQuestions = remainingQuestions
          .sort(() => 0.5 - Math.random())
          .slice(0, pageSize - filteredQuestions.length);
        filteredQuestions = [...filteredQuestions, ...additionalQuestions];
      }

      // Shuffle and pick `pageSize` questions
      const shuffledQuestions = filteredQuestions.sort(() => 0.5 - Math.random());
      const randomQuestions = shuffledQuestions.slice(0, pageSize);

      return ctx.send(randomQuestions);
    } catch (error) {
      ctx.throw(500, `An error occurred: ${error.message}`);
    }
  },
};
