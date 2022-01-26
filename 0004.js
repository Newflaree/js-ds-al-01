function printAllPairs( n ) {
  for ( var i = 0; i < n; i++ ) {
    for ( var j = 0; j < n; j++ ) {
      console.log( i, j );
    }
  }
}

let t1 = performance.now();
printAllPairs( 1000 );
let t2 = performance.now();
console.log(`Time Elapse: ${ (t2 - t1) / 1000 } seconds`);
