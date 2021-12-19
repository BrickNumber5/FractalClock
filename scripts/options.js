import { indirect } from "./globals.js";

export let h_speed = 1000;
export let showClock = true;
export let showSecondHand = true;
export let detail = 10;
export let clockOpacity = 25;
export let fractalOpacity = 35;
export let showTickmarks = false;
export let showNumbers = false;
export let numberMode = 0;
export let showDigital = false;
export let digitalMode = 0;
export let showDigitalSeconds = true;
export let ringThickness = 60;
export let backgroundMode = 0;
export let glows = false;

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
  indirect.h_start = indirect.h_start + ( +( new Date( ) ) * h_speed ) % ( 1000 * 60 * 60 * 24 ) - ( +( new Date( ) ) * n ) % ( 1000 * 60 * 60 * 24 );
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

window.toggleDigitalSeconds = e => {
  showDigitalSeconds = !showDigitalSeconds;
  store_options( );
};

window.toggleSecondHand = e => {
  showSecondHand = !showSecondHand;
  store_options( );
};

window.toggleGlow = e => {
  glows = !glows;
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
  showDigitalSeconds = opts.showDigitalSeconds ?? true;
  showSecondHand = opts.showSecondHand ?? true;
  glows = opts.glows ?? false;
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
    backgroundMode,
    showDigitalSeconds,
    showSecondHand,
    glows
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
  document.querySelector( ".bToggleDigitalSeconds > span" ).innerText = showDigitalSeconds ? "hide" : "show";
  document.querySelector( ".bToggleSecondHand > span" ).innerText = showSecondHand ? "hide" : "show";
  document.querySelector( ".bToggleGlow > span" ).innerText = glows ? "disable" : "enable";
  document.querySelector( ".back" ).style.setProperty( "filter", glows ? "drop-shadow(0 0 var(--t-s) hsl(var(--fg-color-angle) 100% 75%))" : "" );
  indirect.l_sec = null; // To force the image to update
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
  showDigitalSeconds = true;
  showSecondHand = true;
  glows = false;
  store_options( );
};