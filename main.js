const VERSION = "1.0.2";

const lerp = ( a, b, t ) => ( 1 - t ) * a + t * b;
const map = ( v, a, b, c, d ) => lerp( c, d, ( v - a ) / ( b - a ) );

const fcnv = document.querySelector( ".front" );
const fctx = fcnv.getContext( "2d" );

const bcnv = document.querySelector( ".back" );
const bctx = bcnv.getContext( "2d" );

let width, height;

let hyperspeed = false, h_speed = 1000, h_start = 0;

let showClock = true;

let detail = 10;

let clockOpacity = 25, fractalOpacity = 35;

let showTickmarks = false;

let showNumbers = false, numberMode = 0;

let showDigital = false, digitalMode = 0;

let ringThickness = 60;

let backgroundMode = 0;

let l_sec;
function draw( ) {
  const date = hyperspeed ? new Date( h_start + ( +( new Date( ) ) * h_speed ) % ( 1000 * 60 * 60 * 24 ) ) : new Date( );
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
  
  const second_angle = 2 * Math.PI * date.getSeconds( ) / 60;
  const minute_angle = 2 * Math.PI * date.getMinutes( ) / 60 + second_angle / 60;
  const hour_angle   = 2 * Math.PI * ( date.getHours( ) % 12 ) / 12 + minute_angle / 12;
  
  if ( showClock ) {
    fctx.strokeStyle = "#fff";
    fctx.lineJoin = "round";
    fctx.lineCap = "round";
    
    // Draw the Circle
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
  
  if ( showDigital ) drawDigitalDisplay( { cx, cy, r, s, date } );
  
  // Draw Fractal
  bctx.clearRect( 0, 0, width, height );
  bctx.lineCap = "round";
  drawFractalClock( { hour_angle, minute_angle, r, s }, 0, cx, cy, 0 );
  
  document.querySelector( ":root" ).style.setProperty( "--bg-color-angle", `${ hour_angle + Math.PI }rad` );
  
  requestAnimationFrame( draw );
}

requestAnimationFrame( draw );

function drawTickmarks( consts ) {
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

function drawNumbers( consts ) {
  const { cx, cy, r, s } = consts;
  let d = ( ringThickness === 0 ) ? showTickmarks ? 0.725 : 1 : showTickmarks ? 0.65 : 1 - ringThickness * 0.001 - 0.1;
  if ( numberMode === 0 ) {
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
  } else {
    fctx.lineWidth = s >> 2;
    fctx.strokeStyle = "#fff";
    fctx.fillStyle = "#fff";
    fctx.font = `${ 2.5 * s }px 'Open Sans', sans-serif`;
    fctx.textAlign = "center";
    fctx.textBaseline = "middle";
    for ( let i = 0; i < 12; i++ ) {
      const x = cx + d * r * Math.cos( Math.PI * i / 6 ), y = cy + d * r * Math.sin( Math.PI * i / 6 );
      fctx.fillText( ( i + 2 ) % 12 + 1, x, y );
      fctx.strokeText( ( i + 2 ) % 12 + 1, x, y );
    }
  }
}

function drawDigitalDisplay( consts ) {
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
      }:${
        date.getSeconds( ).toString( ).padStart( 2, 0 )
      }`
    : `${
        ( date.getHours( ) + 11 ) % 12 + 1
      }:${
        date.getMinutes( ).toString( ).padStart( 2, 0 )
      }:${
        date.getSeconds( ).toString( ).padStart( 2, 0 )
      } ${ date.getHours( ) >= 12 ? "PM" : "AM" }`;
  fctx.fillText( t, x, y );
  fctx.strokeText( t, x, y );
}

function drawFractalClock( consts, scale, sx, sy, angle ) {
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
    document.querySelector( ".hyperspeedButton" ).innerText = "Hyperspeed";
  } else {
    hyperspeed = true;
    document.querySelector( ".hyperspeedButton" ).innerText = "\xA0\xA0\xA0\xA0\xA0\xA0> > >\xA0\xA0\xA0\xA0\xA0\xA0";
    h_start = +( new Date( ) ) - ( +( new Date( ) ) * h_speed ) % ( 1000 * 60 * 60 * 24 );
  }
};

window.toggleOptionsMenu = ( ) => {
  const e = document.querySelector( ".optionsPane" );
  if ( e.style.display === "none" ) {
    e.style.display = "";
  } else {
    e.style.display = "none";
  }
};

window.toggleClock = e => {
  showClock = !showClock;
  store_options( );
};

window.setHyperspeedSpeed = e => {
  let n = +e.value;
  if ( n !== n ) n = 1000;
  if ( n < 1 ) n = 1;
  if ( n > 10000 ) n = 10000;
  h_start = h_start + ( +( new Date( ) ) * h_speed ) % ( 1000 * 60 * 60 * 24 ) - ( +( new Date( ) ) * n ) % ( 1000 * 60 * 60 * 24 );
  h_speed = n;
  store_options( );
};

window.setDetail = e => {
  let n = +e.value;
  if ( n !== n ) n = 10;
  if ( n < 1 ) n = 1;
  if ( n > 50 ) n = 50;
  detail = n;
  store_options( );
};

window.setClockOpacity = e => {
  let n = +e.value;
  if ( n !== n ) n = 25;
  if ( n < 0 ) n = 0;
  if ( n > 100 ) n = 100;
  clockOpacity = n;
  store_options( );
};

window.setFractalOpacity = e => {
  let n = +e.value;
  if ( n !== n ) n = 25;
  if ( n < 0 ) n = 0;
  if ( n > 100 ) n = 100;
  fractalOpacity = n;
  store_options( );
};

window.toggleTickmarks = e => {
  showTickmarks = !showTickmarks;
  store_options( );
};

window.toggleNumbers = e => {
  showNumbers = !showNumbers;
  store_options( );
};

window.toggleNumberMode = e => {
  numberMode = 1 - numberMode;
  store_options( );
};

window.toggleDigital = e => {
  showDigital = !showDigital;
  store_options( );
};

window.toggleDigitalMode = e => {
  digitalMode = 1 - digitalMode;
  store_options( );
};

window.setRingThickness = e => {
  let n = +e.value;
  if ( n !== n ) n = 60;
  if ( n < 0 ) n = 0;
  if ( n > 0 && n < 20 ) n = ( ringThickness === 0 ) ? 20 : 0;
  if ( n > 100 ) n = 100;
  ringThickness = n;
  store_options( );
};

window.toggleBackgroundMode = e => {
  backgroundMode = 1 - backgroundMode;
  store_options( );
};

function load_options( ) {
  const opts = JSON.parse( localStorage.getItem( "FractalClock" ) ?? "{}" );
  h_speed = opts.h_speed ?? 1000;
  detail = opts.detail ?? 10;
  showClock = opts.showClock ?? true;
  showTickmarks = opts.showTickmarks ?? false;
  showNumbers = opts.showNumbers ?? false;
  showDigital = opts.showDigital ?? false;
  clockOpacity = opts.clockOpacity ?? 25;
  fractalOpacity = opts.fractalOpacity ?? 35;
  numberMode = opts.numberMode ?? 0;
  digitalMode = opts.digitalMode ?? 0;
  ringThickness = opts.ringThickness ?? 60;
  backgroundMode = opts.backgroundMode ?? 0;
  store_options( );
}

load_options( );

function store_options( ) {
  const opts = {
    h_speed,
    detail,
    showClock,
    clockOpacity,
    fractalOpacity,
    showTickmarks,
    showNumbers,
    numberMode,
    showDigital,
    digitalMode,
    ringThickness,
    backgroundMode
  };
  localStorage.setItem( "FractalClock", JSON.stringify( opts ) );
  document.querySelector( ".iH_speed" ).value = h_speed;
  document.querySelector( ".iDetail" ).value = detail;
  document.querySelector( ".bToggleClock > span" ).innerText = showClock ? "hide" : "show";
  document.querySelector( ".clockOptions" ).style.display = showClock ? "" : "none";
  document.querySelector( ".iClockOpacity" ).value = clockOpacity;
  document.querySelector( ":root" ).style.setProperty( "--clockOpacity", clockOpacity + "%" );
  document.querySelector( ".iFractalOpacity" ).value = fractalOpacity;
  document.querySelector( ":root" ).style.setProperty( "--fractalOpacity", fractalOpacity + "%" );
  document.querySelector( ".bToggleTickmarks > span" ).innerText = showTickmarks ? "hide" : "show";
  document.querySelector( ".bToggleNumbers > span" ).innerText = showNumbers ? "hide" : "show";
  document.querySelector( ".dNumberMode" ).style.display = showNumbers ? "" : "none";
  document.querySelector( ".bToggleNumberMode > span" ).innerText = numberMode ? "roman" : "arabic";
  document.querySelector( ".bToggleDigital > span" ).innerText = showDigital ? "hide" : "show";
  document.querySelector( ".dDigitalMode" ).style.display = showDigital ? "" : "none";
  document.querySelector( ".bToggleDigitalMode > span" ).innerText = digitalMode ? "AM/PM" : "24 Hour";
  document.querySelector( ".iRingThickness" ).value = ringThickness;
  document.querySelector( ".bToggleBackgroundMode > span" ).innerText = backgroundMode ? "colorful" : "grey";
  document.body.style.setProperty( "background", backgroundMode ? "linear-gradient(24deg, hsl(0 0% 5%) 0%, hsl(0 0% 15%) 100%)" : "" );
  l_sec = null; // To force the image to update
}

window.resetOptions = ( ) => {
  h_speed = 1000;
  detail = 10;
  showClock = true;
  clockOpacity = 25;
  fractalOpacity = 35;
  showTickmarks = false;
  showNumbers = false;
  numberMode = 0;
  showDigital = false;
  digitalMode = 0;
  ringThickness = 60;
  backgroundMode = 0;
  store_options( );
};

{
  const [ x, y, z ] = VERSION.split( "." );
  document.querySelector( ".versionNumber" ).innerHTML = `<span>Fractal Clock v</span><span class="notransparent">${ x }</span><span>.</span><span class="notransparent">${ y }</span><span>.</span><span class="notransparent">${ z }</span>`;
}