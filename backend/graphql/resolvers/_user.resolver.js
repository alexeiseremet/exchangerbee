const jwtAdmin = process.env.JWT_SECRET_ADMIN || 'admin';

module.exports = {
  Mutation: {
    login(_, { password }) {
      return new Promise((resolve, reject) => {
        password === jwt
          ? resolve({ token: jwtAdmin })
          : reject('You are wrong.');
      });
    },
  },
};
