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
addUpTo(100000000)
let t2 = performance.now();
console.log(`Time Elapse: ${ (t2 - t1) / 1000 } seconds`);
```
