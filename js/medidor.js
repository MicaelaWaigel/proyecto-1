const MAYUS = 'MAYUS';
const MINUS = 'MINUS';
const NUMERO = 'NUMERO';
const SIMBOLO = 'SIMBOLO';
const ESPACIO = 'ESPACIO';
const BORRADO = 'BORRADO';

let password = '';
let datos = {
    long: 0,
    puntaje: 0,
    complejidad: 'mala',
    cantMayus: 0,
    cantMinus: 0,
    cantNum: 0,
    cantSimb: 0,
    middle: 0,
    cantReq: 0,
    requerimientos: false,
    lastChar: ''
}


function update(event) {
    password = event.target.value;
    const newChar = event.data;

    const tipo = getTipo(newChar);

    if (tipo === BORRADO) {
        updatesCant(-1, getTipo(datos.lastChar));
        datos.lastChar = password[password.length - 1];
    } else {
        updatesCant(1, getTipo(newChar));
        datos.lastChar = newChar
    }
    updatePuntaje();
    console.log(datos);

    
}

function updatesCant(value, tipo) {
    datos.long += value;
    document.getElementById('cant1').innerHTML = datos.long;
    switch (tipo) {
        case MAYUS: 
            datos.cantMayus += value;
            document.getElementById('cant2').innerHTML = datos.cantMayus;
            break;
        case MINUS:
            datos.cantMinus += value;
            document.getElementById('cant3').innerHTML = datos.cantMinus;
            break;
        case NUMERO:
            datos.cantNum += value;
            document.getElementById('cant4').innerHTML = datos.cantNum;
            break;
        case SIMBOLO:
            datos.cantSimb += value;
            document.getElementById('cant5').innerHTML = datos.cantSimb;
            break;
        default:
            console.log("Con el espacio no deberia hacer nada");
    }
}

function getTipo(char) {
    
    if (char === null) {
        return BORRADO;
    }

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

    if (char.match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)) {
        return SIMBOLO;
    }
    
}

function updatePuntaje() {
    const punt = datos.long*4;
    document.getElementById('punt1').innerHTML = punt;
    
    let puntMayus = 0;
    if (datos.cantMayus > 0){
        puntMayus = (datos.long - datos.cantMayus)*2;
        document.getElementById('punt2').innerHTML = puntMayus;
    }
    
    let puntMinus = 0;
    if (datos.cantMinus > 0) {
        puntMinus = (datos.long - datos.cantMinus)*2;
        document.getElementById('punt3').innerHTML = puntMinus;
    }
    
    const puntNum = datos.cantNum*4;
    document.getElementById('punt4').innerHTML = puntNum;
    const puntSimb = datos.cantSimb*6;
    document.getElementById('punt5').innerHTML = puntSimb;
    const puntMiddle = datos.middle*2;
    document.getElementById('punt6').innerHTML = puntMiddle;

    let puntReq = 0;
    if (datos.requerimientos) {
        puntReq = datos.cantReq*2
        document.getElementById('punt2').innerHTML = puntReq;
    }
    datos.puntaje = punt + puntMayus + puntMinus + puntNum + puntSimb + puntMiddle + puntReq;  
    let barPuntaje =document.getElementById('barPuntaje');
    if (datos.puntaje > 44) {
        barPuntaje.classList.remove('bg-danger');
        barPuntaje.classList.add('bg-warning');
    }

    if (datos.puntaje > 75) {
        barPuntaje.classList.remove('bg-warning');
        barPuntaje.classList.add('bg-success');
    }

    barPuntaje.style.width = datos.puntaje + '%';
    barPuntaje.innerHTML = datos.puntaje + '%';
}

function ocultarPass(event) {
    const iPass = document.getElementById('password');
    if (event.target.checked) {
        iPass.type = 'password';
    } else {
        iPass.type = 'text';
    }
    
}