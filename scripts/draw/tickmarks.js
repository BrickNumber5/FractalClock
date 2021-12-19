import { ringThickness } from "../options.js";
import { fctx } from "../canvas.js";

export function drawTickmarks( consts ) {
  const { cx, cy, r, s } = consts;
  fctx.strokeStyle = "#fff";
  if ( ringThickness > 0 ) {
    fctx.lineCap = "butt";
    fctx.lineWidth = s * 0.75;
    for ( let i = 0; i < 12; i++ ) {
      fctx.beginPath( );
      fctx.moveTo( cx + r * Math.cos( Math.PI * i / 6 ), cy + r * Math.sin( Math.PI * i / 6 ) );
      fctx.lineTo( cx + 0.85 * r * Math.cos( Math.PI * i / 6 ), cy + 0.85 * r * Math.sin( Math.PI * i / 6 ) );
      fctx.stroke( );
    }
    
    fctx.lineWidth = s >> 1;
    for ( let i = 0; i < 60; i++ ) {
      if ( i % 5 === 0 ) continue;
      fctx.beginPath( );
      fctx.moveTo( cx + r * Math.cos( Math.PI * i / 30 ), cy + r * Math.sin( Math.PI * i / 30 ) );
      fctx.lineTo( cx + 0.9 * r * Math.cos( Math.PI * i / 30 ), cy + 0.9 * r * Math.sin( Math.PI * i / 30 ) );
      fctx.stroke( );
    }
    fctx.lineCap = "round";
    fctx.lineWidth = s * 0.75;
    for ( let i = 0; i < 12; i++ ) {
      fctx.beginPath( );
      fctx.moveTo( cx + 0.85 * r * Math.cos( Math.PI * i / 6 ), cy + 0.85 * r * Math.sin( Math.PI * i / 6 ) );
      fctx.lineTo( cx + 0.85 * r * Math.cos( Math.PI * i / 6 ), cy + 0.85 * r * Math.sin( Math.PI * i / 6 ) );
      fctx.stroke( );
    }
    
    fctx.lineWidth = s >> 1;
    for ( let i = 0; i < 60; i++ ) {
      if ( i % 5 === 0 ) continue;
      fctx.beginPath( );
      fctx.moveTo( cx + 0.9 * r * Math.cos( Math.PI * i / 30 ), cy + 0.9 * r * Math.sin( Math.PI * i / 30 ) );
      fctx.lineTo( cx + 0.9 * r * Math.cos( Math.PI * i / 30 ), cy + 0.9 * r * Math.sin( Math.PI * i / 30 ) );
      fctx.stroke( );
    }
  } else {
    fctx.lineWidth = s * 0.75;
    for ( let i = 0; i < 12; i++ ) {
      fctx.beginPath( );
      fctx.moveTo( cx + 1.075 * r * Math.cos( Math.PI * i / 6 ), cy + 1.075 * r * Math.sin( Math.PI * i / 6 ) );
      fctx.lineTo( cx + 0.925 * r * Math.cos( Math.PI * i / 6 ), cy + 0.925 * r * Math.sin( Math.PI * i / 6 ) );
      fctx.stroke( );
    }
    
    fctx.lineWidth = s >> 1;
    for ( let i = 0; i < 60; i++ ) {
      if ( i % 5 === 0 ) continue;
      fctx.beginPath( );
      fctx.moveTo( cx + 1.05 * r * Math.cos( Math.PI * i / 30 ), cy + 1.05 * r * Math.sin( Math.PI * i / 30 ) );
      fctx.lineTo( cx + 0.95 * r * Math.cos( Math.PI * i / 30 ), cy + 0.95 * r * Math.sin( Math.PI * i / 30 ) );
      fctx.stroke( );
    }
  }
}