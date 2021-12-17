const fcnv = document.querySelector( ".front" );
const fctx = fcnv.getContext( "2d" );

let width, height;

function draw( ) {
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
  
  const date = new Date( );
  
  
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
  
  requestAnimationFrame( draw );
}

requestAnimationFrame( draw );

function onresize( ) {
  width = fcnv.width = window.innerWidth;
  height = fcnv.height = window.innerHeight;
}
window.onresize = onresize;
onresize( );