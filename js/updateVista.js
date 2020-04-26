const COMP_MALA = 'Mala';
const COMP_MEDIA = 'Media';
const COMP_BUENA = 'Buena';
const COMP_EXELENTE = 'Exelente';

let complejidad = COMP_MALA;

function updateVista(cantAdd, cantDed, puntAdd, puntDed) {

    let totalAdd = vistaAdiciones(cantAdd, puntAdd);
    let totalDed = vistaDeducciones(cantDed, puntDed);

    const puntTotal = totalAdd - totalDed;

    vistaProgressBar(puntTotal);

    return [puntTotal, complejidad];
}

function vistaAdiciones(cantAdd, puntAdd) {
    let total = 0;
    let cantValues = Object.values(cantAdd);
    let puntValues = Object.values(puntAdd);
    for (i=1; i<8; i++){
        let idCant = 'cant' + i;
        let idPunt = 'punt' + i;
        document.getElementById(idCant).innerHTML = cantValues[i-1];
        document.getElementById(idPunt).innerHTML = puntValues[i-1];
        total += puntValues[i-1];
        updateIconosAdiciones(cantValues[i-1], i);
    }
    
    return total;
}

function updateIconosAdiciones(cantValue, i) {

    const id = 'status' + i;
    const icono = document.getElementById(id);

    if(i === 1) {
        if ( cantValue >= 8 ) {
            changeIconAdd(icono, true);
        } else {
            changeIconAdd(icono, false);
        }
    } else {
        if( (i > 1) && (i < 7) ) {
            if ( cantValue > 0 ){
                changeIconAdd(icono, true);
            } else {
                changeIconAdd(icono, false)
            }
        } else { // i === 7
            if ( cantValue === 5 ) {
                changeIconAdd(icono, true);
            } else {
                changeIconAdd(icono, false);
            }
        }
    }
}

function changeIconAdd(icon, ok) {
    if (ok) {
        if (icon.classList.contains('mal')) {
            icon.classList.remove('mal');
            icon.classList.remove('fa-times-circle');
            icon.classList.add('ok');
            icon.classList.add('fa-check-circle');
        }
    } else {
        if (icon.classList.contains('ok')) {
            icon.classList.remove('ok');
            icon.classList.remove('fa-check-circle');
            icon.classList.add('mal');
            icon.classList.add('fa-times-circle');
        }
    }
    
}


function vistaDeducciones(cantDed, puntDed){
    let total = 0;
    let cantValues = Object.values(cantDed);
    let puntValues = Object.values(puntDed);
    for (i=8; i<15; i++){
        let idCant = 'cant' + i;
        let idPunt = 'punt' + i;
        document.getElementById(idCant).innerHTML = cantValues[i-8];
        puntValues[i-8] === 0 ? 
            document.getElementById(idPunt).innerHTML = puntValues[i-8] : 
            document.getElementById(idPunt).innerHTML = '-' + puntValues[i-8];
        
        total += puntValues[i-8];
        updateIconosDeducciones(cantValues[i-8], i);

    }

    return total;
}


function updateIconosDeducciones(cantValue, i) {
    const id = 'status' + i;
    const icono = document.getElementById(id);
    if (cantValue > 0) {
        changeIconDed(icono, false);
    } else {
        changeIconDed(icono, true);
    }
}

function changeIconDed(icon, neutral) {

    if (neutral) {
        if (icon.classList.contains('warning')) {
            icon.classList.remove('warning');
            icon.classList.remove('fa-exclamation-circle');
            icon.classList.add('neutral');
            icon.classList.add('fa-minus-circle');
        }
    } else {
        if (icon.classList.contains('neutral')) {
            icon.classList.remove('neutral');
            icon.classList.remove('fa-minus-circle');
            icon.classList.add('warning');
            icon.classList.add('fa-exclamation-circle');
        }
        
        
    }
}

function vistaProgressBar (puntTotal) {
    let barPuntaje = document.getElementById('barPuntaje');
    let badgeComp = document.getElementById('complejidad');

    if (puntTotal < 44) {
        if(barPuntaje.classList.contains('bg-warging')){
            barPuntaje.classList.remove('bg-warning');
            badgeComp.classList.remove('badge-warning');
        }
        if(!barPuntaje.classList.contains('bg-danger')) {
            barPuntaje.classList.add('bg-danger');
            badgeComp.classList.add('badge-danger');
        }
        complejidad = COMP_MALA;
    }

    if (puntTotal > 44) {
        if(barPuntaje.classList.contains('bg-danger')){
            barPuntaje.classList.remove('bg-danger');
            badgeComp.classList.remove('badge-danger');
        } else {
            if(barPuntaje.classList.contains('bg-success')) {
                barPuntaje.classList.remove('bg-success');
                badgeComp.classList.remove('badge-success');
            }
        }
        if(!barPuntaje.classList.contains('bg-warning')){
            barPuntaje.classList.add('bg-warning');
            badgeComp.classList.add('badge-warning');
        }
        complejidad = COMP_MEDIA;
    }

    if (puntTotal > 75) {
        if (barPuntaje.classList.contains('bg-warning')){
            barPuntaje.classList.remove('bg-warning');
            badgeComp.classList.remove('badge-warning');
        }
        if (!barPuntaje.classList.contains('bg-success')) {
            barPuntaje.classList.add('bg-success');
            badgeComp.classList.add('badge-success');
        }
        complejidad = COMP_BUENA;
    }
    
    if(puntTotal > 100) {
        barPuntaje.style.width = '100%';
        barPuntaje.innerHTML = '100%';
        complejidad = COMP_EXELENTE;
    } else {
        if (puntTotal < 0) {
            barPuntaje.style.width = '0%';
            barPuntaje.innerHTML = '0%';
        } else {
            barPuntaje.style.width = puntTotal + '%';
            barPuntaje.innerHTML = puntTotal + '%';
        }
        
    }

    document.getElementById('complejidad').innerHTML = complejidad;
}