module.exports = {
  async fetchNews(ctx) {
    const { country, categories, types, excludeNewsIds } = ctx.query;
    let { page = 1, pageSize = 40 } = ctx.query;
    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);

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

    // Exclude specific news IDs if provided
    if (excludeNewsIds) {
      const excludeIdsArray = excludeNewsIds.split(',').map((id) => parseInt(id, 10));
      filters.id = { $notIn: excludeIdsArray };
    }

    try {
      const start = (page - 1) * pageSize;
      const limit = pageSize;

      // Fetch paginated results directly from the database
      const [news, total] = await Promise.all([
        strapi.entityService.findMany('api::news-post.news-post', {
          filters,
          sort: [
            { importanceScore: 'desc' },
            { publicationDate: 'desc' },
          ],
          start,
          limit,
        }),
        strapi.entityService.count('api::news-post.news-post', { filters }), // Get total count
      ]);

      // Limit the news categories up to 2 only
      news.forEach((newsPost) => {
        const categories = newsPost.categories.split(',');
        if (categories.length > 2) {
          newsPost.categories = categories.slice(0, 2).join(',');
        }
      });

      // Prepare metadata
      const meta = {
        pagination: {
          total,
          page,
          pageSize,
          pageCount: Math.ceil(total / pageSize),
        },
      };

      return { data: news, meta };
    } catch (err) {
      ctx.throw(500, err.message);
    }
  },
};
