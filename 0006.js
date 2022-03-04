console.clear();
const { performance } = require( 'perf_hooks' );

function logAtMost5( n ) {
  for ( var i = 1; i <= Math.min(5, n); i++ ) {
	  console.log( i );
  }
}

let t1 = performance.now();
logAtMost5(100)
let t2 = performance.now();
console.log(`Time Elapse: ${ (t2 - t1) / 1000 } seconds`);
