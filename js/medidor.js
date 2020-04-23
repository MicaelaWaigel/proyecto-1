const MAYUS = 'MAYUS';
const MINUS = 'MINUS';
const NUMERO = 'NUMERO';
const SIMBOLO = 'SIMBOLO';
const ESPACIO = 'ESPACIO';
const BORRADO = 'BORRADO';
const COMP_MALA = 'Mala';
const COMP_MEDIA = 'Media';
const COMP_BUENA = 'Buena';
const COMP_EXELENTE = 'Exelente';

let password = '';
let datos = {
    long: 0,
    complejidad: COMP_MALA,
    cantMayus: 0,
    cantMinus: 0,
    cantNum: 0,
    cantSimb: 0,
    middle: 0,
    cantReq: 0,
    requerimientos: false,
    lastChar: ''
};
let puntaje = {
    total: 0,
    puntLong: 0,
    puntMayus: 0,
    puntMinus: 0,
    puntNum: 0,
    puntSimb: 0,
    puntMiddle: 0,
    puntReq: 0
}


function update(event) {
    password = event.target.value;
    const newChar = event.data;

    const tipo = getTipo(newChar);

    if (tipo === BORRADO) {
        if(password == '') {
            resetAll();
        } else {
            updatesCant(-1, getTipo(datos.lastChar));
            datos.lastChar = password[password.length - 1];
        }
        
    } else {
        updatesCant(1, getTipo(newChar));
        datos.lastChar = newChar;
    }
    updatePuntaje();
    
}

function resetAll() {
    datos = {
        long: 0,
        complejidad: COMP_MALA,
        cantMayus: 0,
        cantMinus: 0,
        cantNum: 0,
        cantSimb: 0,
        middle: 0,
        cantReq: 0,
        requerimientos: false,
        lastChar: ''
    };
    puntaje = {
        total: 0,
        puntLong: 0,
        puntMayus: 0,
        puntMinus: 0,
        puntNum: 0,
        puntSimb: 0,
        puntMiddle: 0,
        puntReq: 0
    }

    resetAllVista()
}




function updatesCant(value, tipo) {
    datos.long += value;
    switch (tipo) {
        case MAYUS: 
            datos.cantMayus += value;
            break;
        case MINUS:
            datos.cantMinus += value;
            break;
        case NUMERO:
            datos.cantNum += value;
            break;
        case SIMBOLO:
            datos.cantSimb += value;
            break;
        default:
            console.log("Con el espacio no deberia hacer nada");
    }
    checkMiddle();
    checkRequerimientos(value, tipo);
    updateVistaCant();
}

function checkMiddle() {

    passMiddle = password.slice(1,-1);
    const cNum = getNum(passMiddle);
    const cSimb = getSimb(passMiddle);
    datos.middle = cNum + cSimb;
    
}

function getNum(pass) {
    let cant = 0;
    for(i=0; i<pass.length; i++) {
        if(getTipo(pass[i]) === NUMERO) {
            cant++;
        }
    }
    return cant;
}

function getSimb(pass) {
    let cant = 0;
    for(i=0; i<pass.length; i++) {
        if(getTipo(pass[i]) === SIMBOLO) {
            cant++;
        }
    }
    return cant;
}


function checkRequerimientos(esBorrado, tipo) {
    if (esBorrado === -1) {
        if ((tipo === MAYUS) && (datos.cantMayus === 0)) {
            datos.cantReq--;
        }
        if ((tipo === MINUS) && (datos.cantMinus === 0)) {
            datos.cantReq--;
        }
        if ((tipo === NUMERO) && (datos.cantNum === 0)) {
            datos.cantReq--;
        }
        if ((tipo === SIMBOLO) && (datos.cantSimb === 0)) {
            datos.cantReq--;
        }
        if (datos.long === 7) {
            datos.cantReq--;
        }
        if (datos.cantReq === 4) {
            datos.requerimientos = false;
        }
    } else {
        if ((tipo === MAYUS) && (datos.cantMayus === 1)) {
            datos.cantReq++;
        }
        if ((tipo === MINUS) && (datos.cantMinus === 1)) {
            datos.cantReq++;
        }
        if ((tipo === NUMERO) && (datos.cantNum === 1)) {
            datos.cantReq++;
        }
        if ((tipo === SIMBOLO) && (datos.cantSimb === 1)) {
            datos.cantReq++;
        }
        if (datos.long === 8) {
            datos.cantReq++;
        }
        if (datos.cantReq === 5) {
            datos.requerimientos = true;
        }

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
    puntaje.puntLong = datos.long*4;
    puntaje.puntMayus = 0;
    if(datos.cantMayus > 0) {
        puntaje.puntMayus = (datos.long - datos.cantMayus)*2;
    }
    puntaje.puntMinus = 0;
    if(datos.cantMinus > 0) {
        puntaje.puntMinus = (datos.long - datos.cantMinus)*2;
    }
    puntaje.puntNum = datos.cantNum*4;
    puntaje.puntSimb = datos.cantSimb*6;
    puntaje.puntMiddle = datos.middle*2;
    if((datos.requerimientos)){
        puntaje.puntReq = datos.cantReq*2;
    }
    
    puntaje.total = puntaje.puntLong + puntaje.puntMayus + puntaje.puntMinus + puntaje.puntNum + puntaje.puntSimb + puntaje.puntMiddle + puntaje.puntReq;
    
    if ((puntaje.total > 44) && (puntaje.total <= 70)) {
        datos.complejidad = COMP_MEDIA;
    } else {
        if ((puntaje.total > 70) && (puntaje.total <= 90)) {
            datos.complejidad = COMP_BUENA;
        } else {
            if ((puntaje.total > 90)) {
                datos.complejidad = COMP_EXELENTE;
            }
        }
    }


    updateVistaPuntajes();
    updatesIconos();
    
}



function ocultarPass(event) {
    const iPass = document.getElementById('password');
    if (event.target.checked) {
        iPass.type = 'password';
    } else {
        iPass.type = 'text';
    }
    
}

function savePass() {
   
    const passStorage = localStorage.getItem('PASSWORDS');
    
    if (passStorage == null){
        const passwords = [];
        const pass = {
            password,
            datos: {
                puntaje: puntaje.total,
                complejidad: datos.complejidad
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
                puntaje: puntaje.total,
                complejidad: datos.complejidad
            }
        };
        passwords.push(pass);
        localStorage.removeItem('PASSWORDS');
        localStorage.setItem('PASSWORDS', JSON.stringify(passwords));
    }

    window.location.href = '../index.html'
}