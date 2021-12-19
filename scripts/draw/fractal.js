import { detail } from "../options.js";
import { bctx } from "../canvas.js";
import { map } from "../utils.js";

export function drawFractalClock( consts, scale, sx, sy, angle ) {
  const { hour_angle, minute_angle, r, s } = consts;
  const w = s * 1 / ( 1.3 ** scale );
  if ( w < 10 / detail ) return;
  
  const ha = angle + hour_angle;
  const [ hx, hy ] = [
    sx + r * 0.85 * Math.cos( ha - Math.PI / 2 ) / ( 1.5 ** scale ),
    sy + r * 0.85 * Math.sin( ha - Math.PI / 2 ) / ( 1.5 ** scale )
  ];
  
  const ma = angle + minute_angle;
  const [ mx, my ] = [
    sx + r * 0.85 * Math.cos( ma - Math.PI / 2 ) / ( 1.5 ** scale ),
    sy + r * 0.85 * Math.sin( ma - Math.PI / 2 ) / ( 1.5 ** scale )
  ];
  
  bctx.strokeStyle = `hsl(${ hour_angle }rad 100% ${ map( scale, 0, 15, 25, 100 ) }%)`;
  bctx.lineWidth = w;
  bctx.beginPath( );
  bctx.moveTo( sx, sy );
  bctx.lineTo( hx, hy );
  bctx.stroke( );
  
  bctx.beginPath( );
  bctx.moveTo( sx, sy );
  bctx.lineTo( mx, my );
  bctx.stroke( );
  
  drawFractalClock( consts, scale + 1, hx, hy, ha );
  drawFractalClock( consts, scale + 1, mx, my, ma );
}