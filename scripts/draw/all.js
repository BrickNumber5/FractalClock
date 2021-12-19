import { showClock, showDigital, h_speed } from "../options.js";
import { indirect, l_sec, hyperspeed, h_start } from "../globals.js";
import { fctx, bctx, width, height } from "../canvas.js";
import { drawClock } from "./clock.js";
import { drawDigitalDisplay } from "./digital.js";
import { drawFractalClock } from "./fractal.js";

export function draw( ) {
  const date = hyperspeed ? new Date( h_start + ( +( new Date( ) ) * h_speed ) % ( 1000 * 60 * 60 * 24 ) ) : new Date( );
  const n_sec = date.getSeconds( );
  if ( n_sec === l_sec ) {
    requestAnimationFrame( draw );
    return;
  }
  indirect.l_sec = n_sec;
  
  fctx.clearRect( 0, 0, width, height );
  
  const r = Math.min( width, height ) / 4;
  const s = Math.floor( r / 10 );
  
  const cx = width / 2;
  const cy = height / 2;
  
  const second_angle = 2 * Math.PI * date.getSeconds( ) / 60;
  const minute_angle = 2 * Math.PI * date.getMinutes( ) / 60 + second_angle / 60;
  const hour_angle   = 2 * Math.PI * ( date.getHours( ) % 12 ) / 12 + minute_angle / 12;
  
  if ( showClock ) drawClock( { cx, cy, r, s, second_angle, minute_angle, hour_angle } );
  
  if ( showDigital ) drawDigitalDisplay( { cx, cy, r, s, date } );
  
  // Draw Fractal
  bctx.clearRect( 0, 0, width, height );
  bctx.lineCap = "round";
  drawFractalClock( { hour_angle, minute_angle, r, s }, 0, cx, cy, 0 );
  
  document.querySelector( ":root" ).style.setProperty( "--bg-color-angle", `${ hour_angle + Math.PI }rad` );
  document.querySelector( ":root" ).style.setProperty( "--fg-color-angle", `${ hour_angle }rad` );
  
  requestAnimationFrame( draw );
}