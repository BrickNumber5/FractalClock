import { indirect } from "./globals.js";

export const fcnv = document.querySelector( ".front" );
export const fctx = fcnv.getContext( "2d" );

export const bcnv = document.querySelector( ".back" );
export const bctx = bcnv.getContext( "2d" );

export let width;
export let height;

function onresize( ) {
  width = bcnv.width = fcnv.width = window.innerWidth;
  height = bcnv.height = fcnv.height = window.innerHeight;
  indirect.l_sec = null; // To force the image to update
}
window.onresize = onresize;
onresize( );