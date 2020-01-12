import { Router } from '../routes';

const redirect = (target, ctx) => {
  const isServer = !!ctx.req;

  // Redirect on the server.
  if (isServer) {
    ctx.res.writeHead(303, { Location: target });
    ctx.res.end();
  } else {
    // Redirect in the browser.
    Router.replace(target);
  }

  return undefined;
};

export const cleanUrl = (ctx) => {
  if (ctx.req.path.endsWith('/') && ctx.req.path.length > 1) {
    const newUrl = ctx.req.path.substring('/');

    return redirect(newUrl, ctx);
  }

  return undefined;
};

export default redirect;
