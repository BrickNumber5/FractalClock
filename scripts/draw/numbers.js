import { ringThickness, showTickmarks, numberMode } from "../options.js";
import { fctx } from "../canvas.js";

export function drawNumbers( consts ) {
  const { cx, cy, r, s } = consts;
  let d = ( ringThickness === 0 ) ? showTickmarks ? 0.725 : 1 : showTickmarks ? 0.65 : 1 - ringThickness * 0.0005 - 0.15;
  if ( numberMode === 0 ) {
    drawRoman( { s, r, cx, cy, d } );
  } else {
    drawArabic( { s, cx, cy, d, r } );
  }
}

function drawArabic( consts ) {
  const { s, cx, cy, d, r } = consts;
  fctx.lineWidth = s >> 2;
  fctx.strokeStyle = "#fff";
  fctx.fillStyle = "#fff";
  fctx.font = `${ 2.5 * s }px 'Open Sans', sans-serif`;
  fctx.textAlign = "center";
  fctx.textBaseline = "middle";
  for ( let i = 0; i < 12; i++ ) {
    const x = cx + d * r * Math.cos( Math.PI * i / 6 ), y = cy + d * r * Math.sin( Math.PI * i / 6 ) + 0.25 * s;
    fctx.fillText( ( i + 2 ) % 12 + 1, x, y );
    fctx.strokeText( ( i + 2 ) % 12 + 1, x, y );
  }
}

function drawRoman( consts ) {
  const { s, r, cx, cy, d } = consts;
  fctx.lineWidth = s >> 1;
  fctx.strokeStyle = "#fff";
  for ( let i = 0; i < 12; i++ ) {
    const a = Math.PI * i / 6;
    const vx = Math.cos( a ), vy = Math.sin( a );
    const sx = r * 0.075 * vx, sy = r * 0.075 * vy;
    const x = cx + d * r * vx, y = cy + d * r * vy;
    const j = ( i + 2 ) % 12 + 1;
    switch ( j ) {
      case 1:
        fctx.beginPath( );
        fctx.moveTo( x + sx, y + sy );
        fctx.lineTo( x - sx, y - sy );
        fctx.stroke( );
        break;
      case 2:
        fctx.beginPath( );
        fctx.moveTo( x + sx + 0.5 * sy, y + sy - 0.5 * sx );
        fctx.lineTo( x - sx + 0.5 * sy, y - sy - 0.5 * sx );
        fctx.stroke( );
        fctx.beginPath( );
        fctx.moveTo( x + sx - 0.5 * sy, y + sy + 0.5 * sx );
        fctx.lineTo( x - sx - 0.5 * sy, y - sy + 0.5 * sx );
        fctx.stroke( );
        break;
      case 3:
        fctx.beginPath( );
        fctx.moveTo( x + sx + sy, y + sy - sx );
        fctx.lineTo( x - sx + sy, y - sy - sx );
        fctx.stroke( );
        fctx.beginPath( );
        fctx.moveTo( x + sx, y + sy );
        fctx.lineTo( x - sx, y - sy );
        fctx.stroke( );
        fctx.beginPath( );
        fctx.moveTo( x + sx - sy, y + sy + sx );
        fctx.lineTo( x - sx - sy, y - sy + sx );
        fctx.stroke( );
        break;
      case 4:
        fctx.beginPath( );
        fctx.moveTo( x + sx + sy, y + sy - sx );
        fctx.lineTo( x - sx + sy, y - sy - sx );
        fctx.stroke( );
        fctx.beginPath( );
        fctx.moveTo( x + sx, y + sy );
        fctx.lineTo( x - sx - 0.5 * sy, y - sy + 0.5 * sx );
        fctx.lineTo( x + sx - sy, y + sy + sx );
        fctx.stroke( );
        break;
      case 5:
        fctx.beginPath( );
        fctx.moveTo( x + sx + 0.5 * sy, y + sy - 0.5 * sx );
        fctx.lineTo( x - sx, y - sy );
        fctx.lineTo( x + sx - 0.5 * sy, y + sy + 0.5 * sx );
        fctx.stroke( );
        break;
      case 6:
        fctx.beginPath( );
        fctx.moveTo( x + sx + sy, y + sy - sx );
        fctx.lineTo( x - sx + 0.5 * sy, y - sy - 0.5 * sx );
        fctx.lineTo( x + sx, y + sy );
        fctx.stroke( );
        fctx.beginPath( );
        fctx.moveTo( x + sx - sy, y + sy + sx );
        fctx.lineTo( x - sx - sy, y - sy + sx );
        fctx.stroke( );
        break;
      case 7:
        fctx.beginPath( );
        fctx.moveTo( x + sx + 1.5 * sy, y + sy - 1.5 * sx );
        fctx.lineTo( x - sx + sy, y - sy - sx );
        fctx.lineTo( x + sx + 0.5 * sy, y + sy - 0.5 * sx );
        fctx.stroke( );
        fctx.beginPath( );
        fctx.moveTo( x + sx - 0.5 * sy, y + sy + 0.5 * sx );
        fctx.lineTo( x - sx - 0.5 * sy, y - sy + 0.5 * sx );
        fctx.stroke( );
        fctx.beginPath( );
        fctx.moveTo( x + sx - 1.5 * sy, y + sy + 1.5 * sx );
        fctx.lineTo( x - sx - 1.5 * sy, y - sy + 1.5 * sx );
        fctx.stroke( );
        break;
      case 8:
        fctx.beginPath( );
        fctx.moveTo( x + sx + 2 * sy, y + sy - 2 * sx );
        fctx.lineTo( x - sx + 1.5 * sy, y - sy - 1.5 * sx );
        fctx.lineTo( x + sx + sy, y + sy - sx );
        fctx.stroke( );
        fctx.beginPath( );
        fctx.moveTo( x + sx, y + sy );
        fctx.lineTo( x - sx, y - sy );
        fctx.stroke( );
        fctx.beginPath( );
        fctx.moveTo( x + sx - sy, y + sy + sx );
        fctx.lineTo( x - sx - sy, y - sy + sx );
        fctx.stroke( );
        fctx.beginPath( );
        fctx.moveTo( x + sx - 2 * sy, y + sy + 2 * sx );
        fctx.lineTo( x - sx - 2 * sy, y - sy + 2 * sx );
        fctx.stroke( );
        break;
      case 9:
        fctx.beginPath( );
        fctx.moveTo( x + sx + sy, y + sy - sx );
        fctx.lineTo( x - sx + sy, y - sy - sx );
        fctx.stroke( );
        fctx.beginPath( );
        fctx.moveTo( x + sx, y + sy );
        fctx.lineTo( x - sx - sy, y - sy + sx );
        fctx.stroke( );
        fctx.beginPath( );
        fctx.moveTo( x + sx - sy, y + sy + sx );
        fctx.lineTo( x - sx, y - sy );
        fctx.stroke( );
        break;
      case 10:
        fctx.beginPath( );
        fctx.moveTo( x + sx + 0.5 * sy, y + sy - 0.5 * sx );
        fctx.lineTo( x - sx - 0.5 * sy, y - sy + 0.5 * sx );
        fctx.stroke( );
        fctx.beginPath( );
        fctx.moveTo( x + sx - 0.5 * sy, y + sy + 0.5 * sx );
        fctx.lineTo( x - sx + 0.5 * sy, y - sy - 0.5 * sx );
        fctx.stroke( );
        break;
      case 11:
        fctx.beginPath( );
        fctx.moveTo( x + sx + sy, y + sy - sx );
        fctx.lineTo( x - sx, y - sy );
        fctx.stroke( );
        fctx.beginPath( );
        fctx.moveTo( x + sx, y + sy );
        fctx.lineTo( x - sx + sy, y - sy - sx );
        fctx.stroke( );
        fctx.beginPath( );
        fctx.moveTo( x + sx - sy, y + sy + sx );
        fctx.lineTo( x - sx - sy, y - sy + sx );
        fctx.stroke( );
        break;
      case 12:
        fctx.beginPath( );
        fctx.moveTo( x + sx + 1.5 * sy, y + sy - 1.5 * sx );
        fctx.lineTo( x - sx + 0.5 * sy, y - sy - 0.5 * sx );
        fctx.stroke( );
        fctx.beginPath( );
        fctx.moveTo( x + sx + 0.5 * sy, y + sy - 0.5 * sx );
        fctx.lineTo( x - sx + 1.5 * sy, y - sy - 1.5 * sx );
        fctx.stroke( );
        fctx.beginPath( );
        fctx.moveTo( x + sx - 0.5 * sy, y + sy + 0.5 * sx );
        fctx.lineTo( x - sx - 0.5 * sy, y - sy + 0.5 * sx );
        fctx.stroke( );
        fctx.beginPath( );
        fctx.moveTo( x + sx - 1.5 * sy, y + sy + 1.5 * sx );
        fctx.lineTo( x - sx - 1.5 * sy, y - sy + 1.5 * sx );
        fctx.stroke( );
        break;
    }
  }
}