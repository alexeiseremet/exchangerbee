const jwtAdmin = process.env.JWT_SECRET_ADMIN || 'admin';

module.exports = {
  Mutation: {
    login(_, { password }) {
      return new Promise((resolve, reject) => {
        password === jwtAdmin
          ? resolve({ token: jwtAdmin })
          : reject(new Error('You are wrong.'));
      });
    },
  },
};
