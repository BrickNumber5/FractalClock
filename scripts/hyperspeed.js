import { h_speed } from "./options.js";
import { indirect } from "./globals.js";

export function toggleHyperspeed( ) {
  if ( indirect.hyperspeed ) {
    indirect.hyperspeed = false;
    document.querySelector( ".hyperspeedButton" ).innerText = "Hyperspeed";
  } else {
    indirect.hyperspeed = true;
    document.querySelector( ".hyperspeedButton" ).innerText = "\xA0\xA0\xA0\xA0\xA0\xA0> > >\xA0\xA0\xA0\xA0\xA0\xA0";
    indirect.h_start = +( new Date( ) ) - ( +( new Date( ) ) * h_speed ) % ( 1000 * 60 * 60 * 24 );
  }
}