const lerp = ( a, b, t ) => ( 1 - t ) * a + t * b;
const map = ( v, a, b, c, d ) => lerp( c, d, ( v - a ) / ( b - a ) );

const fcnv = document.querySelector( ".front" );
const fctx = fcnv.getContext( "2d" );

const bcnv = document.querySelector( ".back" );
const bctx = bcnv.getContext( "2d" );

let width, height;

let hyperspeed = false, h_start = 0;

let l_sec;
function draw( ) {
  const date = hyperspeed ? new Date( h_start + ( +( new Date( ) ) * 1000 ) % ( 1000 * 60 * 60 * 24 ) ) : new Date( );
  const n_sec = date.getSeconds( );
  if ( n_sec === l_sec ) {
    requestAnimationFrame( draw );
    return;
  }
  l_sec = n_sec;
  
  fctx.clearRect( 0, 0, width, height );
  
  const r = Math.min( width, height ) / 4;
  const s = Math.floor( r / 10 );
  
  const cx = width / 2;
  const cy = height / 2;
  
  // Draw the Circle
  fctx.strokeStyle = "#fff";
  fctx.lineWidth = s;
  fctx.lineCap = "round";
  fctx.lineJoin = "round";
  
  fctx.beginPath( );
  fctx.arc( cx, cy, r, 0, 2 * Math.PI );
  fctx.stroke( );
  
  const second_angle = 2 * Math.PI * date.getSeconds( ) / 60;
  const minute_angle = 2 * Math.PI * date.getMinutes( ) / 60 + second_angle / 60;
  const hour_angle   = 2 * Math.PI * ( date.getHours( ) % 12 ) / 12 + minute_angle / 12;
  
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
  
  // Second Hand
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
  
  // Draw Fractal
  bctx.clearRect( 0, 0, width, height );
  bctx.lineCap = "round";
  drawFractalClock( { hour_angle, minute_angle, r, s }, 0, cx, cy, 0 );
  
  document.querySelector( ":root" ).style.setProperty( "--bg-color-angle", `${ hour_angle + Math.PI }rad` );
  
  requestAnimationFrame( draw );
}

requestAnimationFrame( draw );

function drawFractalClock( consts, scale, sx, sy, angle ) {
  const { hour_angle, minute_angle, r, s } = consts;
  const w = s * 1 / ( 1.3 ** scale );
  if ( w < 1 ) return;
  
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
  
  drawFractalClock( consts, scale + 1, hx, hy, ha );
  drawFractalClock( consts, scale + 1, mx, my, ma );
  
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
}

function onresize( ) {
  width = bcnv.width = fcnv.width = window.innerWidth;
  height = bcnv.height = fcnv.height = window.innerHeight;
  l_sec = null; // To force the image to update
}
window.onresize = onresize;
onresize( );

window.hyperspeed = ( ) => {
  if ( hyperspeed ) {
    hyperspeed = false;
  } else {
    hyperspeed = true;
    h_start = +( new Date( ) ) - ( +( new Date( ) ) * 1000 ) % ( 1000 * 60 * 60 * 24 );
  }
};