/**
 * Helper to create new global variable.
 *
 * @param {string} n Name of variable.
 * @param {Object} o Object to put into variable.
 */
export const addWindowVar = (n, o) => {
  window[n] = window[n] || [];
  window[n].push(o);
};

/**
 *  Load dynamically a JS file using Promise.
 *  Example: script('my-id', '//cdn.example.com/file.js') will add script file
 *  <script id="my-id" src="//cdn.example.com/file.js" async></script>
 *  in <head> of page.
 *
 * @param {string} id ID of DOM Element.
 * @param {string} src Script file source.
 * @returns {Promise}
 */
export default (id, src) => (
  new Promise((resolve, reject) => {
    const js = document.createElement('script');

    // If file is already added then resolve Promise
    // and exit from function.
    if (document.getElementById(id)) {
      resolve();
      return undefined;
    }

    js.id = id;
    js.src = src;
    js.async = true;
    js.onload = resolve;
    js.onerror = reject;

    document.head.appendChild(js);

    return undefined;
  })
);
