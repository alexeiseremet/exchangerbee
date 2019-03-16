const host = 'http://localhost:8080'
const apiPath = '/v0'
const storagePath = '/storage'
const loginPath = '/login'

module.exports.host = host
module.exports.apiPath = apiPath
module.exports.apiBaseUrl = `${host}${apiPath}`
module.exports.storagePath = storagePath
module.exports.locale = 'ru_RU'

module.exports.authCallbackUrl = `${host}${loginPath}`
module.exports.pluginProviderIds = {
  // OneSignal
  one_signal_id: '45da10af-bc58-4747-9d1b-86304ac744e7',
  // Odnoklassniki
  ok_client_id: '1247587584',
  // Mailru
  mr_client_id: '760983',
  // Vkontakte
  vk_client_id: '4643947',
  // Facebook
  fb_client_id: '289808571394275',
  // Google: https://developers.google.com/identity/sign-in/web/sign-in
  gl_client_id: '280586580750-8v347tnul2vm0443fg8e6nbhnu2m96bo.apps.googleusercontent.com',
}

module.exports.googleSiteVerification = 'JgXn0HtmoA8W9G__AJHufPHSuXXOiiTw75cBWbYF35Y'
module.exports.yandexSiteVerification = '5fde910c665b5230'
