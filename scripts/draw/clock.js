import { showTickmarks, showNumbers, showSecondHand, ringThickness } from "../options.js";
import { fctx } from "../canvas.js";
import { drawTickmarks } from "./tickmarks.js";
import { drawNumbers } from "./numbers.js";

export function drawClock( consts ) {
  const { cx, cy, r, s, second_angle, minute_angle, hour_angle } = consts;
  fctx.strokeStyle = "#fff";
  fctx.lineJoin = "round";
  fctx.lineCap = "round";
  
  // Ring
  if ( ringThickness > 0 ) {
    fctx.lineWidth = ringThickness * s / 100;
    fctx.beginPath( );
    fctx.arc( cx, cy, r, 0, 2 * Math.PI );
    fctx.stroke( );
  }
  
  fctx.lineWidth = s;
  
  // Minute Hand
  fctx.beginPath( );
  fctx.moveTo( cx + r * -0.15 * Math.cos( minute_angle - Math.PI / 2 ), cy + r * -0.15 * Math.sin( minute_angle - Math.PI / 2 ) );
  fctx.lineTo( cx + r * 0.85 * Math.cos( minute_angle - Math.PI / 2 ), cy + r * 0.85 * Math.sin( minute_angle - Math.PI / 2 ) );
  fctx.stroke( );
  
  // Hour Hand
  fctx.beginPath( );
  fctx.moveTo( cx + r * -0.15 * Math.cos( hour_angle - Math.PI / 2 ), cy + r * -0.15 * Math.sin( hour_angle - Math.PI / 2 ) );
  fctx.lineTo( cx + r * 0.65 * Math.cos( hour_angle - Math.PI / 2 ), cy + r * 0.65 * Math.sin( hour_angle - Math.PI / 2 ) );
  fctx.stroke( );
  
  // Pivot Circle
  fctx.lineWidth = s << 1;
  fctx.beginPath( );
  fctx.moveTo( cx, cy );
  fctx.lineTo( cx, cy );
  fctx.stroke( );
  
  if ( showTickmarks ) drawTickmarks( { cx, cy, r, s } );
  
  if ( showNumbers ) drawNumbers( { cx, cy, r, s } );
  
  // Second Hand
  if ( showSecondHand ) {
    fctx.strokeStyle = "#f88";
    fctx.lineWidth = s >> 1;
    fctx.beginPath( );
    fctx.moveTo( cx + r * -0.3 * Math.cos( second_angle - Math.PI / 2 ), cy + r * -0.3 * Math.sin( second_angle - Math.PI / 2 ) );
    fctx.lineTo( cx + r * 0.9 * Math.cos( second_angle - Math.PI / 2 ), cy + r * 0.9 * Math.sin( second_angle - Math.PI / 2 ) );
    fctx.stroke( );
    
    fctx.lineWidth = s;
    fctx.beginPath( );
    fctx.moveTo( cx + r * -0.35 * Math.cos( second_angle - Math.PI / 2 ), cy + r * -0.35 * Math.sin( second_angle - Math.PI / 2 ) );
    fctx.lineTo( cx + r * -0.15 * Math.cos( second_angle - Math.PI / 2 ), cy + r * -0.15 * Math.sin( second_angle - Math.PI / 2 ) );
    fctx.stroke( );
    
    fctx.lineWidth = s;
    fctx.beginPath( );
    fctx.moveTo( cx, cy );
    fctx.lineTo( cx, cy );
    fctx.stroke( );
  }
}