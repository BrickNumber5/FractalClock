export const lerp = ( a, b, t ) => ( 1 - t ) * a + t * b;
export const map = ( v, a, b, c, d ) => lerp( c, d, ( v - a ) / ( b - a ) );