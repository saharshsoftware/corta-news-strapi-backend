module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/news/sitemap.xml',
      handler: 'custom-sitemap-news-post.sitemap',
      config: {
        policies: []
      }
    },
    {
      method: 'GET',
      path: '/custom/news',
      handler: 'custom-news-post.fetchNews',
      config: {
        policies: [
        ],
        auth: false,
      }
    }
  ]
};