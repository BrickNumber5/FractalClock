export const VERSION = "1.1.0";

export let hyperspeed = false;
export let h_start = 0;

export let l_sec;

export const indirect = {
  get l_sec( ) { return l_sec; },
  set l_sec( v ) { return l_sec = v },
  get hyperspeed( ) { return hyperspeed; },
  set hyperspeed( v ) { return hyperspeed = v },
  get h_start( ) { return h_start; },
  set h_start( v ) { return h_start = v }
};

const [ x, y, z ] = VERSION.split( "." );
document.querySelector( ".versionNumber" ).innerHTML = `<span>Fractal Clock v</span><span class="notransparent">${ x }</span><span>.</span><span class="notransparent">${ y }</span><span>.</span><span class="notransparent">${ z }</span>`;