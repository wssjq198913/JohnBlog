import {JSDOM} from 'jsdom';

const dom = new JSDOM(`<!doctype html><html><head></head><body></body></html>`);
const { window } = dom;
global.window = dom.window;
global.document = dom.window.document;
global.navigator = window.navigator;
global.HTMLElement = window.HTMLElement;


const $ = require('jquery');
global.jQuery = $;
const bootstrap = require ('bootstrap/dist/js/bootstrap');

function noop() {
return null;
}

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.md'] = noop;
require.extensions['.png'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.gif'] = noop;