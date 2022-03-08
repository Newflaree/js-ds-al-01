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
Ambas funcionan y son diferentes, no solo en nombres o nombres de variables o algo, sino que son totalmente diferentes en los enfoques, uno usa un bucle y el otro usa una cadena.

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


## Simplificación de las expresiones Big O.
Ahora vamos a hablar sobre algunas reglas reales que podemos usar para ayudarnos a simplificar estas expresiones.

Por ejemplo, si tenemos una expresion O(n2 + 5n + 8), este sería sólo una O(n2). Esto se puede explicar basandonos en la definición principal del BigO, siempre evaluar lo más grande desde un punto de vista lo más lejano posible, sin ir a los detalles nunca. Ahora vamos a probar la expresión antrior. Si pasamos n = 100, el resultado a medio terminar sería: O( 10000 + 500 + 8 ). En este punto, pareciera que evaluar n2 junto a n sigue siendo difuso ya que se podría decir que n y n2 están en una razón de 1:20. Elevemos n a n = 10000. El resultado sería O( 100000000 + 50000 + 8 ). En este punto ya tienen una razón de 1:20000, n comienza a ser insignificante con respecto a n2 por lo que esta expresión será simplemente n2. Cuando hablamos de evaluar desde el punto de vista más amplio, habla del volumen cuantitativo en cuanto a las pruebas y evaluaciones del 

Por lo tanto, un par de cosas que puede tener en cuenta al analizar la complejidad con grades cosas se complican y puede analizar y estresarse por los detalles individuales. Pero hay algunas reglas generales que pueden ayudar y no siempre funcionan, pero es un buen punto de partida.

1. La primera es que las operaciones aritméticas son constantes. Entonces, para sumar algo o restar o dividir, y así será un tiempo constante, en realidad no importa el tamaña del número que su computadora toma aproximadamente la misma cantidad de tiempo para hacer dos más dos, ya que hace un millón más dos variables. 
2. La asignación también es constante. Entonces, la computadora tarda aproximadamente  la misma cantidad de tiempo en hacer que una variable que conoces X sea igual a 1000. 
3. Es aproximadamente el mismo elemento de acceso en una matriz que usa un índice.Entonces, si tengo una matriz y encuentro el primer elemento o el décimo elemento, siempre que use el índice o estoy trabajando con un objeto y tengo una clave que estoy usando para acceder a datos que también son de tiempo de ejecución constante.
4. La siguiente regla es que en un bucle la complejidad es la longitud del bucle multipicado por la complejidad de lo qu sucede dentro del bucle. Entonces, si estuviéramos trabajando con un ciclo qu se repite en una lista o que se repite como lo hicimos anteriormente, es el camino para terminar a medida que crece ese ciclo. Pero lo que sucede dentro de ese ciclo también es consecuencia porque si hemos anidado los bucles como hemos visto, entonces terminamos con un tiempo de ejecución potencialmente cuadrado.

De nuevo, no es necesario memorizar esto, pero es bueno hacerlo. Veamos un par de ejemplos.
``` 
function logAtLeast5( n ) {
  for ( var i = 1; i <= Math.max(5, n); i++ ) {
	  console.log( i );
  }
}
```

Entonces, todo lo que hace es imprimir números hasta N, pero como mínimo imprime 1 2 3 4 5. Entonces, si le doy tres, todavía obtenemos cinco, pero si le doy siete, obtenemos siete impresos.

Entonces, ¿cuál es el gran O aquí? ¿Cómo clasificamos esto?

Tenemos un bucle y este bucle va a ir de 1 a cinco o finalizará el que sea más grande. Por lo tanto, podríamos preocuparnos por los cinco, pero realmente solo debemos preocuparnos por eso, ya que es pequeño y lo que nos importa es lo que sucede y crece. Entonces es y continúa creciendo y creciendo hacia el infinito. 

¿Qué pasa con el tiempo de ejecución?
Bueno, si son 10 millonesm este ciclo se ejecutará 10 millones de veces. Los cinco primeros ya no importan. Entonces, podemos simplificar esto y decir que la gran O de esto ha terminado y debido a que esto crece, el número de operaciones crece en proporción a N. Entonces es un O(n).

En el siguiente registro, vamos a registrar un máximo de 5 pegados.
``` 
function logAtLeast5( n ) {
  for ( var i = 1; i <= Math.min(5, n); i++ ) {
	  console.log( i );
  }
}
```

Y si intento tener esperanzas, llegaremos a lo sumo a 5 si conecto 30, todavía solo me da 5. Por lo tanto, tomará lo que sea más pequeño si le doy un gran número, si es más grande que 5, solo registrará 5, si le doy algo menos de 5, entonces se registrará. Y eso es importante tener en cuenta porque a medida que n crece aquí, no importa porque vamos a tomar el mínimo que es 5. Entonces, si N se acerca a 1000, este ciclo se ejecutará cinco veces y se si se acerca a 1000000, el ciclo se ejecutará cinco veces, si es que lo hay, entonces el ciclo se ejecutará dos veces y tres veces.

Entonces, el gráfico en realidad se vería como si una escala de 5 peldaños y luego una recta de distancia N, estático en 5 y podemos simplificar eso diciendo que es bruto final, que es lo que nos importa. Entonces es un O(1)

Entonces, si trazáramos ambos, lo que vemos es que la tendencia general es algo así, donde olvidé tener esas pequeñas transiciones. Si ponemos en un gráfico ambas funciones, tenemos que O(1) es prácticamente una linea de vuelo y eso es genial si podemos tener un tiempo de ejecución de uno. Es fantástico tener un tiempo de ejecución constante, es bastante rera cuando se trata de algoritmos más avanzados, como por ejemplo n, se podría ver la trajectoria general, es mucho mejor que algo como una ejecución cuadrática.

Algunos ejemplo:

- O(n + 10) = O(n)
- O(100 * n) = O(n)
- O(25) = O(1)
- O(n^2 + n^3) = O(n^2)
- O(n + n + n + n) = O(n)


## Complejidad espacial
Ahora cambiamos un poco y vamos a hablar sobre algo llamado complejidad espacial. 

De todo lo que hemos hablado hasta ahora nos hemos preocupado por el tiempo sobre la rapidez con la que se ejecutan los algoritmos con el tiempo de ejecución. Eso se llama complejidad del tiempo.

Hemos estado analizando el tiempo de ejecución de un algoritmo a medida que aumenta el tamaño de la entrada. Ahora hablamos de lo que sucede con el espacio que ocupa un algoritmo a medida que aumenta el tamaño de la entrada.

Todavía podemos usar la notación Big-O para lo mismo, usar la misma sintaxis formal para describir lo que sucedió. Pero ahora nos vamos a centrar en el espacio. La cantidad de memoria quw está ocupando, por lo que hay algunas cosas básicas que debemos eliminar.

Una es que, obviamente, a medida que crece si nos acercamos al infinito del tamaño de la entrada en si, que es va a crecer. Entonces vamos a ignorar esa parte.

Es posible que escuche el término conplejidad del espacio auxiliar si investiga un poco. Si lees Wikipedia o algo que se refiere al espacio requerido por el algoritmo no solo incluye el espacio ocupado por las entradas. De eso es de lo que vamos a hablar.

Nos importa el algoritmo en si porque nuestro fin está creciendo. Eso es el gran final o Big-O. Ese es el punto en el que vamos a decir que a medida que crecemos asumimos que es extremo de entrada va a crecer. Así que no nos preocupamos por ese espacio, cuidamos qué repercuciones tiene dentro del algoritmo.

Entonces, a menos que se indique lo contrario cuando hablamos de la complejidad del espacio técnicamente, estamos hablando de la complejidad del espacio auxiliar. Esperamos que no sea demasiado aterrador, pero básicamente solo significa que nos estamos centrando en lo que sucede dentro del algoritmo.

### Algunas reglas básicas.
- La primera es que las cosas más primitivas como los number, boolean, null, undefined en JS son espacios constantes, por lo que no importa cuál sea el tamaño de la entrada. Si el número es 1 o el número es 1000, podemos considerar que el espacio constante no importa porque un boolean es verdadero o falso y ocupa la misma cantidad de espacio. 
- Los string son un poco diferentes porque requieren 0 de espacio, por lo que es la longitud de la cadena. Si la cadena crece a 50 caracteres, la cadena ocupa 50 veces más espacio que una sola cadena de caracteres. Es un O(n)
- Lo mismo con los Arrays y Objetos. En general, estamos hablando del Big-O donde es la longitud del Array o el número de claves para un objeto. Técnicamente, no es una longitud, pero si la longitud de un Array es reenviadora en comparación con otra que es dos, ocupa el doble de espacio que la matriz más corta.

Vamos a ver un ejemplo
``` 
function sum( arr ) {
  let total = 0;
	for ( let i = 0; i < arr.length; i++ ) {
		total += arr[i];
	}
	return total;
}
```

Entonces, aquí nos estamos enfocando no en la complejidad del tiempo, nos estamos enfocando en la complejidad del espacio. Esta función llamada sum toma un Array y solo suma todos los elementos del Array. Tenemos un ciclo que va desde 0 hasta el final del Array y solo estamos agregando el valor de cada elemento de la matriz a la variable total, para luego devolverlo al final. Así que de nuevo, espacio no tiempo.

Entonces, ¿cuáles son las cosas que ocupan espacio?

Bueno, no importa cuál sea la longitud de la matriz, tenemos una variable llamada total (un number) y luego estamos recorriendo un ciclo que en realidad no nos interesa en si, pero dentro tenemos una varible i, así que ese es otro número y eso es todo por espacio. Una vez dentro del ciclo, volvemos a la variable total que estamos agregando, pero eso no importa. Eso lleva tiempo, pero el espacio ya está allí. No importa cuál sea el tamaño del Array O, en este caso, el tamaño de arr puede ser 1000 elementos, puede ser 1000000 de elementos. No tiene impacto en el espacio que ocupa porque solo tenemos estas dos variables y existen sin importa qué.

No estamos agregando nuevas variables basadas en la longitud que estamos agregando a la variable total. No estamos haciendo una nueva variable. Eso realmente significa que tenemos un espacio constante en el espacio. O(1) space!

Veamos otro ejemplo.
``` 
function double( arr ) {
  let newArr = [];
	for ( let i = 0; i < arr.length; i++ ) {
		newArr.push( 2 * arr[i] );
	}
	return newArr;
}
```

Esta función se llama double. Se necesita un Array. Si por ejemplo le pasamos un Array de tres elementos (double([1,2,3]){}), Pero cada uno se multiplica, Y lo que es importante a tener en cuenta es que está haciendo un nuevo Array. 
Comienza con hacer un nuevo Array, luego recorre la longitud del primer Array que le enviamos por parámtro y luego multiplica cada elemento y lo empuja a un nuevo Array, para luego devolver ese nuevo Array.

### ¿qué significa eso para la complejidad espacial de esto a medida que la longitud del Array crece a medida que la entrada se acerque al infinito?

Vamos a crear un nuevo Array cada vez, pase lo que pase.
Pero eso no es tan significante cuando consideramos lo que sucede dentro del ciclo for. Tenemos un nuevo Array que se está volviendo más y más grande, directamente proporcional a la longitud de la entrada. Entonces, si el Array tiene 10 elementos, almacenaremos 10 elementos en un nuevo Array. Si se trata de 50 elementos, se almacenan los 50 en un nuevo Array y se devuelve eso, el espacio ocupado es directamente proporcional a N en el Array de entrada. Entonces es O(n) space.


## Logaritmos
Si aprendes sobre logaritmos en un punto o aprendes sobre los logaritmos en un punto y olvidaste todo o nunca lo aprendiste, en esta sección vamos a tratar de revisarlo bastante simple y también rápido porque en realidad no importa que seamos maestros en logaritmos. La razón es porque algunos algoritmos que estamos revisando tienen un Big-O, esto no es simple, no es O(1), O(n), O(n^2). 

Estas son complejidades muy comunes y las hemos visto, además de ser más fáciles de comprender. Pero hay algunas expresiones big-O que involucran algunas matemáticas más dificiles o expresiones menos comunes. Y algo que surge más de lo que personalmente quisira, nuestros logaritmos.

Revisaremos algunos algoritmos donde su complejidad de tiempo en lugar de ser O(n) podría ser O(log n).

Matemáticamente, un logaritmo es el inverso de la exponencioación. Al igual que la división y la multiplicación son un par de logaritmos donde su exponenciación es un par.
- Por ejemplo, log2(8) = 3
Lo que realmente estamos preguntando aquí es ¿a qué potencia de 2 equivale 8?
- Entonces el resultado sería 2^3 = 8.

Ahora, los logaritmos no siempre funcionan con la base 2. Sim embargo, los más comunes son os logaritmos binarios que son en base 2. Luego también está la base 10.

Generalmente, la información que se encuentra sobre la notación Big-O, La taquigrafia es solo registrar se trata de una tendencia general calculada aproximadamente, en este caso el logaritno binario de un número mide aproximadamente el número de veces que puede dividir ese número entre dos. Hasta obtener un valor menor o igual a 1. No importan los detalles dentro del logaritmo, sino su tendencia general. Por ejemplo, se vería mucho más claro en un gráfico. Por lo tanto, la complejidad del tiempo logaritmico es excelente si tiene un algoritmo con complejidad de tiempo de registro. 

Ciertos algoritmos de búsqueda tienen una complejidad de tiempo logaritmica y los veremos a medida que avanzamos en el progreso del curso, también los algoritmos de clasificación eficientes inluyen logaritmos. No todos los algoritmos de sorting, pero algunos de los más eficientes si lo hacen, así que veremos eso también. Y finalmente, la recursión a veces tiene una complejidad espacial logaritmica.

### Recapitulando
- La notación big-O tiene que ver son la tendencia de la imagen general de alto nivel como el tamaño de la entrada bruto- Queremos saber cómo cambia el tiempo de ejecución o cómo cambia la complejidad del espacio.
- No nos importa la precisión, solo las tendencias generales.
- La complejidad de espacio-tiempo medida por la notación big-O depende solo del algoritmo, no del hardware. Entonces, si, el tiempo real que podría llevar ejecutar un algoritmo en mi pc en comparación con una supercompuradora definitivamente será diferente. Pero la tendencia general no cambia.
- La notación Big-O está en todas partes, así que vamos a practicar mucho.
