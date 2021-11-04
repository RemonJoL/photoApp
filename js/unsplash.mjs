

// --------------------------------------------------------------------------------------
// Adding polyfills
// --------------------------------------------------------------------------------------

import fetch from '/node_modules/node-fetch/src/index.js';

if (!globalThis.fetch) {
	globalThis.fetch = fetch;
};

import '/node_modules/whatwg-fetch/fetch.js'

window.fetch(...)

// --------------------------------------------------------------------------------------
// URL
// --------------------------------------------------------------------------------------

URL = require('url').URL;

// --------------------------------------------------------------------------------------
// Creating an instance
// --------------------------------------------------------------------------------------

import { createApi } from '/node_modules/unsplash-js/dist/index.js';

// on your node server
const serverApi = createApi({
  accessKey: 'Eixsm88TabftaZDIofWlQslifc0D_FoHW_lwUw5ERkk',
  //...other fetch options
});

// in the browser
const browserApi = createApi({
  apiUrl: 'https://mywebsite.com/unsplash-proxy',
  //...other fetch options
});

// --------------------------------------------------------------------------------------
// Making a request
// --------------------------------------------------------------------------------------



// --------------------------------------------------------------------------------------
// Response
// --------------------------------------------------------------------------------------
