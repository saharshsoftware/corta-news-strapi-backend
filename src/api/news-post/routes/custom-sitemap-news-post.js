module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/news/sitemap.xml',
      handler: 'custom-sitemap-news-post.sitemap',
      config: {
        policies: []
      }
    }
  ]
};