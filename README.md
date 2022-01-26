# Big O Notation

## Introducción a Big O
### Objetivos de la sección
* Motivar la necesidad de cosas como la notación Big O.
* Describir qué es la notación Big O.
* Simplificar las expresiones Big O.
* Definiremos el 'time complexity' y el 'space complexity'.
* Evaluaremos la complejidad de tiempo y de espacio de diferentes algoritmos usando la notación Big O.
* Describiremos qué es un logaritmo matemático.

### ¿Cuál es la idea aquí?
Digamos que hay dos soluciones válidas para un problema.
Anbos funcionan y son diferentes, no solo en nombres o nombres de variables o algo, sino que son totalmente diferentes en los enfoques, uno usa un bucle y el otro usa una cadena.

¿Cómo sabemos cuál es el mejor?
Eso es realmente de lo que se trata la notación Big O.
Es un sistema, es una forma de generalizar el código y hablar sobre él y comparar el código y su rendimiento con otras piezas de código.

### Ejemplo: Escribe una función que acepte una entrada de string y devuelva una copia inversa.
Si te pidieran que hicieras esto, tal vez algunos estudiantes emprendedores lo hagan y propongan algunas soluciones creativas, puedo pensar en tres soluciones diferentes, enfoques diferentes y estoy seguro de que hay muchas más opciones.
```
const reverse = ( s ) => {
	let o = '';
	for ( let i = s.length - 1; i >= 0; i-- ) {
		o += s[i];
	}
	return o;
}
```
```
const reverse = ( s ) => {
	let o = [];
	for ( let i = s.length - 1, j = 0; i >= 0; i--, j++ ) {
		o[j] = s[i];
	}
	return o.join('');
}
```
```
const reverse = ( s ) => {
	return s.split('').reverse().join('');
}
```

Entonces, si se pide escribir una función que invierta una cadena, no solo importa que lo hagas funcionar.

### ¿Por qué es importante cuál es la mejor solución?
Dependiendo del proyecto y del contexto, puede que la mejor solución sea la que funcione. Pero cuando hablamos de desafíos de código para entrevistas o trabajar en una gran empresa donde trabajas con un gran conjunto de datos, digamos miles de millones de datos donde la implementación de un algoritmo podría ahorrar una hora en comparación a otra implementación. El rendimiento importa en ese punto y existe un algoritmo real o una mejor solución.
* Es importante tener un vocabulario preciso para hablar sobro cómo funciona nuestro código. Incluso si se está contento con su solución a algo, es útil poder comprender cómo se compara su desempeño en comparación a los demás.
* También es bueno para discutir las compensaciones sobre diferentes enfoques porque a menudo no es tan simple como que una solución siempre es excelente y otra siempre es pésima. A veces, una solución puede ser excelente para manejar conjuntos de datos realmente grandes.
* Es bueno también para depurar el código. Ayuda a comprender las cosas que lo están relentizando, no solo buscando errores. Digamos que el código está funcionando, pero por alguna razón está tardando más de lo que esperas.


## Cronometrar nuestro código
### Ejemplo
Ahora revisaremos un ejemplo más concreto, comparemos dos soluciones al mismo problema.

Suponga que desea escribir una función que calcule la suma de todos los números del uno a un número n que le entregaremos como argumento.
La primera solución es crear un acumulador de variable total y recorrer todos esos números de uno en uno a partir de 1
```
const addUpTo = ( n ) => {
	let total = 0;
	for ( let i = 1; i <= n; i++ ){
		total += i;
	}
	return total;
}
```
Ahora implementaremos otra solución, que es más como una formula matemática pero 
```
const addUpTo = ( n ) => {
	return n * ( n + 1 ) / 2;
}
```
Una vez establecidas nuestras dos soluciones de trabajo, determinaremos cuál es mejor.
¿Qué significa que sea mejor?
¿En más rápida en segundos o milisegundos?
¿Es mejor cargando archivos de diferentes tamaños?
¿Utiliza menos memoria al ejecutarse?
¿El código es más legible?

Todas estas son preocupaciones válidas y realmente se reduce a la situación.
Por ahora nos centraremos en evaluar la velocidad de cuánto tiempo tarda el código en ejecutar un objetivo. Lo más simple es usar funciones de temporización incorporadas.
```
const addUpTo = ( n ) => {
	let total = 0;
	for ( let i = 1; i <= n; i++ ){
		total += i;
	}
	return total;
}

let t1 = performance.now();
addUpTo(1000000000)
let t2 = performance.now();
console.log(`Time Elapse: ${ (t2 - t1) / 1000 } seconds`);
```

Si sumamos los primeros 1000000000 números, cada vez que lo ejecutemos, obtendremos una pequeña variación en los resultados incluso en la misma máquina, sin cambiar el código y solo ejecutandolo una y otra vez.

Por otro lado, si utilizamos la segunda solución, nos encontramos con otro panorama. Pasando el valor que queramos, siempre va a demorar al rededor de lo mismo, pero sigue variando el valor en cada iteración.
```
const addUpTo = ( n ) => {
	return n * ( n + 1 ) / 2;
}

let t1 = performance.now();
addUpTo(1000000000)
let t2 = performance.now();
console.log(`Time Elapse: ${ (t2 - t1) / 1000 } seconds`);
```

### Problemas con el tiempo.
* Diferentes máquinas registran diferentes tiempos. Esto no significa que la primera solución es de repente más rápida que la segunda. pero significa que los margenes pueden cambiar, las medidas de referencia pueden cambiar y casi es un hecho de que así será.
* Esta misma máquina registrará tiempos diferentes. Se podría decir que la variación es insignificante pero nos basta con saber que no es preciso y no podemos confiarnos de ese factor.
* Para algoritmos rápidos, las cosas que están sucediendo en una escala realmente muy velóz podrían no ser lo suficientemente precisas. Podemos tener cualtro algoritmos muy rápidos y entre estos puede haber uno que sea particularmente más rápido que es resto, pero si nuestras funciones de temporizador no pueden resolverlo porque se sabe que el intervalo de tiempo más pequeño que se puede medir no es lo suficientemente bueno, entonces realmente no nos ayuda.

Entonces, ¿Cómo recorremos nuestro código y realmente hablamos en terminos generales sobre qué código es mejor sin tener que ir y cronometrarlo?

- No es malo cronometrar el código, se puede rescatar mucha información al respecto, pero no quiero comparar una solución que demore una hora vs una que antes demoraba cuatro horas y ejecutarlas para saber cuál es más rápido.

#### En terminos generales, se trata de cómo el código se compara con otro código sin tener que pasar por todo esto. Ahí es donde entra la notación Big O.

## Introducción oficial a Big O.
* Big O es una forma formal de contar borrosamente.
* Nos permite hablar de una manera muy formal sobre cómo crece el tiempo de ejecución de un algoritmo a medida que crecen las entradas. Es una forma de decribir la relación entre la entrada a una función o a medida que crece y cómo eso cambia el tiempo de ejecución de esa función. La relación entre el tamaño de entrada y luego el tiempo relativo a esa entrada. Por lo tanto, no nos interesan losa otros detalles, solo la tendencias generales.

Decimos que un algoritmo de o es Big O de f, entonces si el número de operaciones simples que la computadora tiene que hacer es eventualmente menor que un evento de tiempo constante f y aumenta e.

* Cuando hablamos de Big O, estamos hablando del peor de los casos.

#### Primer Ejemplo:
En nuestra segunda implementación, siempre son tres operaciones. Gracias a esto, su tiempo tienda a ser constante ya que la tendencia es que sea defectuoso. O(1)
```
function addUpTo( n ) {
  return n * ( n + 1 ) / 2;
}
```
A medida que crece la entrada a esta función en este caso no tiene cambios, no se refleja en el tiempo de ejecución.

En nuestra primera implementación, crece y crece, el tiempo de ejecución crece básicamente en una proporción 1 a 1, el número de operaciones finalmente está limitado por un múltiplo de. O(n)
```
function addUpTo( n ) {
  let total = 0;
  for ( let i = 1; i <= n; i++ ) {
    total += i;
  }
  return total;
}
```

#### Segundo Ejemplo:
```
function countUpAndDown( n ) {
  console.log( 'Going up!' );
  for ( let i = 0; i < n; i++ ) {
    console.log( i );
  }
  console.log( 'At the top!\nGoing down...' );
  for ( let j = n - 1; j >= 0; j-- ) {
    console.log( j );
  }
  console.log( 'Back down. Bye!' );
}
```
Así que si estamos tratando de descubrir el Big O para esta función. A medida que n crece, tenemos aproximadamente una operación para tener un bucle. Al ver el código, nos damos cuenta de que cada for es un O(n), como en nuestra implementación anterior. No importa los for que haya, lo que importa es el panorama general. Entonces es un O(n).

#### Tercer Ejemplo:
```
function printAllPairs( n ) {
  for ( var i = 0; i < n; i++ ) {
    for ( var j = 0; j < n; j++ ) {
      console.log( i, j );
    }
  }
}
```
En esta oportunidad tenemos un bucle anidado. Al igual que en el ejemplo anterior, tenermos dos for y cada uno es un O(n). La diferencia es que al estar anidados es como decir O(n x n). Entonces es un O(n2).

