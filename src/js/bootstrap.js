import $ from 'jquery';
window.jQuery = window.jQuery || $;
window.$ = $;


const svgModules = require.context('../sprites', false, /\.svg$/);
svgModules.keys().forEach(svgModules);