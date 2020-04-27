const MAYUS = 'MAYUS';
const MINUS = 'MINUS';
const NUMERO = 'NUMERO';
const SIMBOLO = 'SIMBOLO';
const ESPACIO = 'ESPACIO';
const BORRADO = 'BORRADO';

let password = '';
let datos = null;



function update(event){
    password = event.target.value;
    
    let cantAdiciones = calcularCantidades(password);
    let cantDeducciones = calcularDeducciones(password, cantAdiciones);
    let puntajesAdiciones = calcularPuntajesAdiciones(cantAdiciones);
    let puntajesDeduciones = calcularPuntajesDeducciones(cantAdiciones, cantDeducciones);

    datos = updateVista(cantAdiciones, cantDeducciones, puntajesAdiciones, puntajesDeduciones);
}

/*
    Calcula las cantidades de mayusculas, minusculas, numeros, simbolos,
    de numeros y simbolos en el medio de la password, los requerimientos 
    cumplidos y la cantidad total de caracteres en el password dado. Luego,
    retorna el objeto con las cantidades.
*/
function calcularCantidades(password) {
    const long = password.length;
    let cantidades = {
        cantChar: long,
        cantMayus: 0,
        cantMinus: 0,
        cantNum: 0,
        cantSimb: 0,
        cantMiddle: 0,
        cantReq: 0
    };

    if (long >= 8) {
        cantidades.cantReq++;
    }

    for(i=0; i<long; i++) {
        let tipo = getTipo(password[i]);
        switch(tipo) {
            case MAYUS:
                cantidades.cantMayus++;
                if (cantidades.cantMayus === 1) {
                    cantidades.cantReq++;
                }
                break;
            case MINUS:
                cantidades.cantMinus++;
                if (cantidades.cantMinus === 1) {
                    cantidades.cantReq++;
                }
                break;
            case NUMERO:
                cantidades.cantNum++;
                if (cantidades.cantNum === 1) {
                    cantidades.cantReq++;
                }
                if ((i!=0) && (i!=long-1)) {
                    cantidades.cantMiddle++;
                }
                break;
            case SIMBOLO:
                cantidades.cantSimb++;
                if (cantidades.cantSimb === 1) {
                    cantidades.cantReq++;
                }
                if ((i!=0) && (i!=long-1)) {
                    cantidades.cantMiddle++;
                }
                break;
        }
    }
    return cantidades;
}

/*
    Calcula los puntajes que agregan valor al password, 
    luego retorna el objeto conteniendo dichos puntajes.
*/
function calcularPuntajesAdiciones(cantidades) {
    let puntajes = {
        puntLong: cantidades.cantChar*4,
        puntMayus: (cantidades.cantMayus > 0 ? ((cantidades.cantChar-cantidades.cantMayus)*2) : 0),
        puntMinus: (cantidades.cantMinus > 0 ? ((cantidades.cantChar-cantidades.cantMinus)*2) : 0),
        puntNum: cantidades.cantNum*4,
        puntSimb: cantidades.cantSimb*6,
        puntMiddle: cantidades.cantMiddle*2,
        puntReq: (cantidades.cantReq === 5 ? cantidades.cantReq*2 : 0)
    };

    return puntajes;
}

/*
    Determina las malas practicas en el password dado. Estas son
    si contiene solo numeros, solo letras, cantidad de mayusculas,
    minusculas o numeros consecutivos, asi como letras y numeros
    secuenciales. Luego, retorna el objetos.
*/
function calcularDeducciones(password, cantidades) {
    let deducciones = {
        soloNumeros: 0,
        soloLetras: 0,
        mayusConsecutivas: 0,
        minusConsecutivas: 0,
        numConsecutivos: 0,
        letrasSecuenciales: 0,
        numSecuenciales: 0
    };

    if (cantidades.cantChar === (cantidades.cantMayus + cantidades.cantMinus)) {
        deducciones.soloLetras = cantidades.cantChar;
    } else {
        if (cantidades.cantChar === cantidades.cantNum) {
            deducciones.soloNumeros = cantidades.cantChar;
        }
    }

    for (i=1; i<cantidades.cantChar; i++) {

        let tipoPrev = getTipo(password[i-1]);
        let tipoActual = getTipo(password[i]);

        if (( tipoPrev === MAYUS ) && ( tipoActual === MAYUS )) {
            deducciones.mayusConsecutivas++;
        }
        if (( tipoPrev === MINUS ) && ( tipoActual === MINUS )) {
            deducciones.minusConsecutivas++;
        }
        if (( tipoPrev === NUMERO ) && ( tipoActual === NUMERO )) {
            deducciones.numConsecutivos++;
            if ( esSecuencial(password, i) ) {
                deducciones.numSecuenciales++;
            }
        }

        if ( ((tipoPrev === MAYUS) || (tipoPrev === MINUS)) && ((tipoActual === MAYUS) || (tipoActual === MINUS)) ) {
            if ( esSecuencial(password, i) ) {
                deducciones.letrasSecuenciales++;
            }
        }
        
    }

    return deducciones;

}

/*
    Calcula el puntaje para las malas practicas y luego 
    retorna el objeto.
*/
function calcularPuntajesDeducciones(adicciones, deducciones) {
    let puntajes = {
        puntSoloNumeros: ((deducciones.soloNumeros > 0) ? adicciones.cantChar : 0),
        puntSoloLetras: ((deducciones.soloLetras > 0) ? adicciones.cantChar : 0),
        puntMayusConse: deducciones.mayusConsecutivas*2,
        puntMinusConse: deducciones.minusConsecutivas*2,
        puntNumConse: deducciones.numConsecutivos*2,
        puntLetrasSec: deducciones.letrasSecuenciales*3,
        puntNumSec: deducciones.numSecuenciales*3
    };
    
    return puntajes;
}

/*
    Determina si dos valores en el password analizado
    son secuenciales haciendo uso de los valores ASCII
    para los caracteres. Retorna verdadero si lo son, 
    falso en caso contrario.
*/
function esSecuencial(password, i) {
    let asciiPrev = password.toLowerCase().charCodeAt(i-1);
    let asciiActual = password.toLowerCase().charCodeAt(i);
    if ( asciiPrev === asciiActual-1 ) {
       return true;
    } else {
        return false;
    }
}

/*
    Determina el tipo de cierto caracter a ser analizado.
    Retorna una constante significativa.
*/
function getTipo(char) {
    
    if (char === ' ') {
        return ESPACIO;
    }

    if (char.match(/[a-z]/i)) {
        if (char === char.toLowerCase()) {
            return MINUS;
        } else {
            return MAYUS;
        }
    }

    if (!isNaN(char)){
        return NUMERO;
    }

    if (char.match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/¿?]*$/)) {
        return SIMBOLO;
    }
    
}

/*
    Oculta o muestra el password en el input del medidor.
*/
function ocultarPass(event) {
    const iPass = document.getElementById('password');
    if (event.target.checked) {
        iPass.type = 'password';
    } else {
        iPass.type = 'text';
    }
    
}

/*
    Almacena la contraseña en el Almacenamiento local del navegador.
    Solo guarda las ultimas 5, por lo que se reemplazara la password
    mas antigua cuando ya no quede espacio.
*/
function savePass() {
    const passStorage = localStorage.getItem('PASSWORDS');
    
    if (passStorage == null){
        const passwords = [];
        const pass = {
            password,
            datos: {
                puntaje: datos[0],
                complejidad: datos[1]
            }
        };
        passwords.push(pass);
        localStorage.setItem('PASSWORDS', JSON.stringify(passwords));
    } else {
        const passwords = JSON.parse(passStorage);
        if (passwords.length === 5) {
            passwords.shift();
            
        } 
        const pass = {
            password,
            datos: {
                puntaje: datos[0],
                complejidad: datos[1]
            }
        };
        passwords.push(pass);
        localStorage.removeItem('PASSWORDS');
        localStorage.setItem('PASSWORDS', JSON.stringify(passwords));
    }

    window.location.href = '../index.html';
}