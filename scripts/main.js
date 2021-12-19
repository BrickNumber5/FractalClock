import { VERSION } from "./globals.js";

import { draw } from "./draw/all.js";
draw( );

import { toggleHyperspeed } from "./hyperspeed.js";
window.toggleHyperspeed = toggleHyperspeed;