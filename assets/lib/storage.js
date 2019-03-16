import { storagePath } from 'Root/server.config'

export default {
  postBig: image => `${storagePath}/posts/big/${image}`,
  postThumbs: image => `${storagePath}/posts/thumbs/${image}`,
}
