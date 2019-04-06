import { Router } from 'Root/routes'

export default (target, ctx = {}) => {
  // Redirect on the server.
  if (ctx.isServer) {
    ctx.res.writeHead(303, {Location: target})
    ctx.res.end()

    return undefined
  }

  // Redirect in the browser.
  Router.replaceRoute(target)
}
