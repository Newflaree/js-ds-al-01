console.clear();
const { performance } = require( 'perf_hooks' );

const addUpTo = ( n ) => {
	return n * ( n + 1 ) / 2;
}

let t1 = performance.now();
addUpTo(10000000000)
let t2 = performance.now();
console.log(`Time Elapse: ${ (t2 - t1) / 1000 } seconds`);
