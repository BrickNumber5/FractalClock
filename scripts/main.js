import { VERSION } from "./globals.js";
console.log( `Running Fractal Clock v${ VERSION }` );

import { draw } from "./draw/all.js";
draw( );

import { toggleHyperspeed } from "./hyperspeed.js";
window.toggleHyperspeed = toggleHyperspeed;