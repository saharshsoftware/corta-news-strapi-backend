'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/questions/random',
      handler: 'custom.findRandomQuestions',
      config: {
        policies: [], // Add authentication policies if needed
      },
    },
  ],
};
