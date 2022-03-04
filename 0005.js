console.clear();
const { performance } = require( 'perf_hooks' );

function logAtLeast5( n ) {
  for ( var i = 1; i <= Math.max(5, n); i++ ) {
	  console.log( i );
  }
}

let t1 = performance.now();
logAtLeast5(100)
let t2 = performance.now();
console.log(`Time Elapse: ${ (t2 - t1) / 1000 } seconds`);
