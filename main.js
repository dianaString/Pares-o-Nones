
'use strict'

// VARIABLES

// Variables del html
const isSelected = document.querySelector('.js-isSelected');
const selectTeam = document.querySelector('.js-selectTeam');
const selectFingers = document.querySelector('.js-selectFingers');
const btn = document.querySelector('.js-btn');
const totalFingers = document.querySelector('.js-totalFingers');
const textResult = document.querySelector('.js-textResult');
const UserFingersResult = document.querySelector('.js-UserFingersResult');
const PCFingersResult = document.querySelector('.js-PCFingersResult');

// FUNCIONES

// CPU

// Esto genera un nº aleatorio
function getRandomNumber(max) { 
    return Math.ceil(Math.random() * max); 
    // ¿Qué hace Math.ceil? Explicación abajo del todo*
}

// Nº de dedos de la máquina
function PCNumber() {
    const random = getRandomNumber(5);
    return random;
}

// Comparación Nº dedos
function ComparingFingers() {
    const PCFingers = PCNumber(); // metemos el resultado de la función en una variable
    const total = PCFingers + parseInt(selectFingers.value); // parseInt para transformar de texto a número
    PCFingersResult.innerHTML = PCFingers; // Se pintan los dedos del PC en el html 
                                           // (los de la usuaria se pintan en la función handleCLickIsSelected())
    totalFingers.innerHTML = `total de dedos: ${total}`; 
    return total;
}

// Se pinta el resultado (en el html)
function RenderResult(total) { // ponemos total entre paréntesis para pasarle el valor 
    //  DECLARACIÓN ^          // (También debe hacerse en la LLAMADA de la función)

    // En lugar de ifs, un operador ternario es más corto:
    let winnerTeam = total % 2 === 0 ? 'pares' : 'nones';
    // winnerTeam es 'pares' si el total es par, si no, es 'nones'

    if(selectTeam.value === winnerTeam){
        textResult.innerHTML = `¡Ganan ${winnerTeam}, ganas!`;
    } else {
        textResult.innerHTML = `¡Ganan ${winnerTeam}, pierdes!`;
    }
}


// FUNCIONES HANDLE

btn.disabled = true; 
// el botón Jugar está desactivado por defecto (hasta que la usuaria escoja un valor válido)

// Cuando se selecciona el bando y el nº de dedos
function handleCLickIsSelected(){ 

    // Si la elección !== "seleccionar", se activa el botón jugar
    if(selectTeam.value && selectFingers.value !== "seleccionar"){
        btn.classList.remove('inactive');
        btn.disabled = false;
        UserFingersResult.innerHTML = selectFingers.value; // Se pintan los dedos de la usuaria
    }
    // si cambia de idea y vuelve a seleccionar "seleccionar",
    // el botón vuelve a estar inactivo (así se evitan errores)
    else {
        btn.classList.add('inactive');
        btn.disabled = true;
        UserFingersResult.innerHTML = "0";
    }
}

// Cuando se hace click en Jugar
function handleCLickPlay(event) {
    event.preventDefault();

    console.log(`Bando ${selectTeam.value}`);
    console.log(`Nº de dedos ${selectFingers.value}`);

    PCNumber();

    // ¿Otra vez ponemos total entre paréntesis? SÍ
    // Además tenemos que volver a crear la variable porque en esta función, total no existe,
    // pero se arregla facilmente diciendo que vale lo mismo que ComparingFingers() 
    const total = ComparingFingers();
    RenderResult(total); // Lo que pongas entre paréntesis SIEMPRE debe aparecer tanto en
    // LLAMADA ^            la declaración como en la llamada de la función
    btn.disabled = true; 
}

// EVENTS / LISTENERS

// este evento engloba ambas selecciones, la del bando y la del nº de dedos
isSelected.addEventListener('click', handleCLickIsSelected);

// este evento engloba al botón 'Jugar'
btn.addEventListener('click', handleCLickPlay);



// Menos mal que no me cobran por poner comentarios...



/* *¿Qué hace Math.ceil en la función random?

Math.ceil siempre rendondea un número a la alza, ya sea 2,1 o 2,8 siempre será 3.

Además de Math.ceil, tenemos Math.floor (redondea a la baja) y Math.round (redondea cuando es igual o superior a 5 -como hacemos todo el mundo-)

Entonces... Si hay 3 formas de redondear, ¿Por qué usamos Math.ceil?

Porque Math.floor(Math.random() * N) es mejor usarlo para obtener el índice de un array, ya que nunca se obtendría N, pero sí 0 (es decir, Si N es 13, sería del 0 al 12).

Con Math.round(Math.random() * N), se obtendría tanto 0 como N, pero con la desventaja de que los números en los extremos (0 y N) tienen la mitad de probabilidad de salir: el 4 puede aparecer al redondear entre 3,5 y 4,4 pero el 0 solo si es entre 0 y 0,4.

Por eso en este caso es mejor usar Math.ceil(Math.random() * N), porque con él se obtiene tanto 1 como N, sin ceros ni problemas de probabilidad. 
(Si N es 13, sería del 1 al 13)

*/