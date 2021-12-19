import { showClock, showDigital, digitalMode, showDigitalSeconds } from "../options.js";
import { fctx } from "../canvas.js";

export function drawDigitalDisplay( consts ) {
  const { cx, cy, r, s, date } = consts;
  const x = cx, y = showClock ? cy + r * 1.2 : cy;
  fctx.lineWidth = s >> 2;
  fctx.strokeStyle = "#fff";
  fctx.fillStyle = "#fff";
  fctx.font = `${ 2.5 * s }px 'Open Sans', sans-serif`;
  fctx.textAlign = "center";
  fctx.textBaseline = "middle";
  const t = digitalMode ?
      `${
        date.getHours( ).toString( ).padStart( 2, 0 )
      }:${
        date.getMinutes( ).toString( ).padStart( 2, 0 )
      }${
        showDigitalSeconds ? ":" + date.getSeconds( ).toString( ).padStart( 2, 0 ) : ""
      }`
    : `${
        ( date.getHours( ) + 11 ) % 12 + 1
      }:${
        date.getMinutes( ).toString( ).padStart( 2, 0 )
      }${
        showDigitalSeconds ? ":" + date.getSeconds( ).toString( ).padStart( 2, 0 ) : ""
      } ${ date.getHours( ) >= 12 ? "PM" : "AM" }`;
  fctx.fillText( t, x, y );
  fctx.strokeText( t, x, y );
}