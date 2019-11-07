const jwtAdmin = process.env.JWT_SECRET_ADMIN || 'admin';

module.exports = {
  auth: (next, src, args, ctx) => {
    const { authorization } = ctx.req.headers;
    const isAdmin = (
      authorization === `Bearer ${jwtAdmin}`
      && args.requires === 'ADMIN'
    );

    if (!isAdmin) {
      throw new Error('You are not authorized.');
    }

    return next();
  },
};
