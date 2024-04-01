module.exports = {
    routes: [
      {
        method: 'DELETE',
        path: '/users/me',
        handler: 'user.deleteAccount',
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  