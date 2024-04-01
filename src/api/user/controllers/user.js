module.exports = {
    async deleteAccount(ctx) {
      const { id } = ctx.state.user;
      console.log(`Deleting user with id: ${id}`);
      if (!id) {
        return ctx.badRequest('Invalid user.');
      }
      
      await strapi.entityService.delete('plugin::users-permissions.user', id);
  
      ctx.send({ message: 'Account successfully deleted.' });
    },
  };
  