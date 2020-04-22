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
    for(i=0; i<7; i++) {
        let idCant='cant'+(i+1);
        let idPuntaje = 'punt' + (i+1);
        let idStatus = 'status' + (i+1);
        document.getElementById(idCant).innerHTML = 0; 
        document.getElementById(idPuntaje).innerHTML = 0;
        updateIcon(idStatus, true);
    }
   
    const barProgress = document.getElementById('barPuntaje');
    barProgress.style.width = '0%';
    barProgress.innerHTML = null;
    if(barPuntaje.classList.contains('bg-warging')){
        barPuntaje.classList.remove('bg-warning');
    }
    if(barPuntaje.classList.contains('bg-success')){
        barPuntaje.classList.remove('bg-success');
    }
    if(!barPuntaje.classList.contains('bg-danger')) {
        barPuntaje.classList.add('bg-danger');
    }

    datos = {
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
    if (datos.middle === 0) {
        if ((cNum + cSimb) > 0) {
            updateIcon('status6', false);
        }
    } else {
        console.log(datos.middle);
        if ((cNum + cSimb) === 0) {
            updateIcon('status6', true);
        }
    }
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
            updateIcon('status2', true);
        }
        if ((tipo === MINUS) && (datos.cantMinus === 0)) {
            datos.cantReq--;
            updateIcon('status3', true);
        }
        if ((tipo === NUMERO) && (datos.cantNum === 0)) {
            datos.cantReq--;
            updateIcon('status4', true);
        }
        if ((tipo === SIMBOLO) && (datos.cantSimb === 0)) {
            datos.cantReq--;
            updateIcon('status5', true);
        }
        if (datos.long === 7) {
            datos.cantReq--;
            updateIcon('status1', true);
        }
        if (datos.cantReq === 4) {
            datos.requerimientos = false;
            updateIcon('status7', true);
        }
    } else {
        if ((tipo === MAYUS) && (datos.cantMayus === 1)) {
            datos.cantReq++;
            updateIcon('status2', false);
        }
        if ((tipo === MINUS) && (datos.cantMinus === 1)) {
            datos.cantReq++;
            updateIcon('status3', false);
        }
        if ((tipo === NUMERO) && (datos.cantNum === 1)) {
            datos.cantReq++;
            updateIcon('status4', false);
        }
        if ((tipo === SIMBOLO) && (datos.cantSimb === 1)) {
            datos.cantReq++;
            updateIcon('status5', false);
        }
        if (datos.long === 8) {
            datos.cantReq++;
            updateIcon('status1', false);
        }
        if (datos.cantReq === 5) {
            datos.requerimientos = true;
            updateIcon('status7', false);
        }

    }
   
}

function updateVistaCant() {
    const cantidades = [datos.long,
                        datos.cantMayus,
                        datos.cantMinus,
                        datos.cantNum,
                        datos.cantSimb,
                        datos.middle,
                        datos.cantReq];
    for(i=0; i<7; i++) {
        let idCant='cant'+(i+1);
        document.getElementById(idCant).innerHTML = cantidades[i]; 
    }
}

function updateIcon(id, esBorrado) {
    if (id != '') {
        const icono = document.getElementById(id);
        if (esBorrado) {
            icono.classList.remove('ok');
            icono.classList.remove('fa-check-circle');
            icono.classList.add('fa-times-circle');
            icono.classList.add('mal');
        } else {
            icono.classList.remove('mal');
            icono.classList.remove('fa-times-circle');
            icono.classList.add('ok');
            icono.classList.add('fa-check-circle');
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
        puntReq = datos.cantReq*2;
    }
    document.getElementById('punt7').innerHTML = puntReq;

    datos.puntaje = punt + puntMayus + puntMinus + puntNum + puntSimb + puntMiddle + puntReq;  
    
    //Cambio de color la barra de progreso de acuerdo al puntaje
    let barPuntaje =document.getElementById('barPuntaje');

    if (datos.puntaje > 44) {
        if(barPuntaje.classList.contains('bg-warging')){
            barPuntaje.classList.remove('bg-warning');
        }
        if(!barPuntaje.classList.contains('bg-danger')) {
            barPuntaje.classList.add('bg-danger');
        }
    }

    if (datos.puntaje > 44) {
        if(barPuntaje.classList.contains('bg-danger')){
            barPuntaje.classList.remove('bg-danger');
        } else {
            if(barPuntaje.classList.contains('bg-success')) {
                barPuntaje.classList.remove('bg-success');
            }
        }
        if(!barPuntaje.classList.contains('bg-warning')){
            barPuntaje.classList.add('bg-warning');
        }
        
    }

    if (datos.puntaje > 75) {
        if (barPuntaje.classList.contains('bg-warning')){
            barPuntaje.classList.remove('bg-warning');
        }
        if (!barPuntaje.classList.contains('bg-success')) {
            barPuntaje.classList.add('bg-success');
        }
        
    }
    
    if(datos.puntaje > 100) {
        barPuntaje.style.width = '100%';
        barPuntaje.innerHTML = '100%';
    } else {
        barPuntaje.style.width = datos.puntaje + '%';
        barPuntaje.innerHTML = datos.puntaje + '%';
    }
    
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
            datos
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
            datos
        };
        passwords.push(pass);
        localStorage.removeItem('PASSWORDS');
        localStorage.setItem('PASSWORDS', JSON.stringify(passwords));
    }

    window.location.href = '../index.html'
}