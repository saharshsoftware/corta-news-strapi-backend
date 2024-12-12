module.exports = {
    async fetchNews(ctx) {
      const { country, categories, types, page = 1, pageSize = 40 } = ctx.query;
  
      // Calculate 48-hour filter for publicationDate
      const now = new Date();
      const past48Hours = new Date(now.getTime() - 48 * 60 * 60 * 1000);
  
      // Filters
      const filters = {
        country: { $eq: country },
        publicationDate: { $gte: past48Hours },
      };
  
      // Add optional category filter
      if (categories) {
        const categoryArray = categories.split(',');
        filters.$or = categoryArray.map((category) => ({
          categories: { $contains: category }, // Ensures at least one category matches
        }));
      }
  
      // Add optional types filter
      if (types) {
        filters.type = { $in: types.split(',') }; // Assumes types are passed as a comma-separated list
      } else {
        filters.type = { $eq: 'news' }; // Default to 'news' if not provided
      }
  
      try {
        const start = (parseInt(page, 10) - 1) * parseInt(pageSize, 10);
        const limit = parseInt(pageSize, 10);
  
        // Fetch paginated results directly from the database
        const news = await strapi.entityService.findMany('api::news-post.news-post', {
          filters,
          sort: [
            { importanceScore: 'desc' },
            { publicationDate: 'desc' },
          ],
          start, // Start index for pagination
          limit, // Limit for pagination
        });
  
        return news;
      } catch (err) {
        ctx.throw(500, err.message);
      }
    },
  };
  