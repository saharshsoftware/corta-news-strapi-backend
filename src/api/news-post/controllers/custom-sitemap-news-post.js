const CLIENT_URL = process.env.CLIENT_URL || 'https://corta.news'
module.exports = {

  // generate sitemap.xml for news posts collection for all data 
  /**
   * @param {{ type: string; body: string; }} ctx
   */
  async sitemap (ctx) {
    // @ts-ignore
    const languages = await strapi.entityService.findMany('api::language.language');
    // find news for past 2 days and generate sitemap
    const newsPosts = await strapi.entityService.findMany('api::news-post.news-post', {
      sort: 'updatedAt:desc',
      filters: {
        updatedAt: {
          $gte: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        }
      }
    });

    const urls = languages.map(language => {
      return newsPosts.map(newsPost => this.generateSitemapUrl(newsPost, language.code));
    }).flat();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls.join('')}
      </urlset>`;


    ctx.type = 'application/xml';
    ctx.body = sitemap;
  },

  /**
   * @param {import("@strapi/types/dist/types/core/attributes").GetValues<"api::news-post.news-post", import("@strapi/types/dist/types/core/attributes").GetNonPopulatableKeys<"api::news-post.news-post">>} newsPost
   * @param {string} [lang]
   */
  generateSitemapUrl (newsPost, lang) {
    return `<url>
      <loc>${CLIENT_URL}/news/${lang === 'es' ? newsPost.esSlug : newsPost.enSlug}</loc>
      <lastmod>${newsPost.updatedAt}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
      </url>`;
  }
}