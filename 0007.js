console.clear();
const { performance } = require( 'perf_hooks' );

function double( arr ) {
  let newArr = [];
	for ( let i = 0; i < arr.length; i++ ) {
		newArr.push( 2 * arr[i] );
	}
	return newArr;
}

let t1 = performance.now();
double([
	1,
	2,
	3
]);
let t2 = performance.now();
console.log( double([
	1,
	2,
	3
]) )
console.log(`Time Elapse: ${ (t2 - t1) / 1000 } seconds`);

