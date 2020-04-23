function updateVistaPuntajes() {
    
    for(i=1; i<8; i++) {
        let id = 'punt' + i;
        switch(i) {
            case 1:
                document.getElementById(id).innerHTML = puntaje.puntLong;
                break;
            case 2:
                document.getElementById(id).innerHTML = puntaje.puntMayus;
                break;
            case 3:
                document.getElementById(id).innerHTML = puntaje.puntMinus;
                break;
            case 4:
                document.getElementById(id).innerHTML = puntaje.puntNum;
                break;
            case 5:
                document.getElementById(id).innerHTML = puntaje.puntSimb;
                break;
            case 6:
                document.getElementById(id).innerHTML = puntaje.puntMiddle;
                break;
            case 7:
                document.getElementById(id).innerHTML = puntaje.puntReq;
                break;
        }
    }

    updateVistaBarProgress();
}

function updateVistaBarProgress() {
    let barPuntaje =document.getElementById('barPuntaje');

    if (puntaje.total > 44) {
        if(barPuntaje.classList.contains('bg-warging')){
            barPuntaje.classList.remove('bg-warning');
        }
        if(!barPuntaje.classList.contains('bg-danger')) {
            barPuntaje.classList.add('bg-danger');
        }
    }

    if (puntaje.total > 44) {
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

    if (puntaje.total > 75) {
        if (barPuntaje.classList.contains('bg-warning')){
            barPuntaje.classList.remove('bg-warning');
        }
        if (!barPuntaje.classList.contains('bg-success')) {
            barPuntaje.classList.add('bg-success');
        }
        
    }
    
    if(puntaje.total > 100) {
        barPuntaje.style.width = '100%';
        barPuntaje.innerHTML = '100%';
    } else {
        barPuntaje.style.width = puntaje.total + '%';
        barPuntaje.innerHTML = puntaje.total + '%';
    }
}

function updatesIconos() {
    for(i=1; i<8; i++) {
        let id = 'status' + i;
        switch(i) {
            case 1:
                if (datos.long === 8) {
                    updateIcon(id, false);
                }
                if (datos.long < 8) {
                    updateIcon(id, true);
                }
                break;
            case 2:
                if (datos.cantMayus > 0) {
                    updateIcon(id, false);
                } else {
                    updateIcon(id, true);
                }
                break;
            case 3:
                if (datos.cantMinus > 0) {
                    updateIcon(id, false);
                } else {
                    updateIcon(id, true);
                }
                break;
            case 4:
                if (datos.cantNum > 0) {
                    updateIcon(id, false);
                } else {
                    updateIcon(id, true);
                }
                break;
            case 5:
                if (datos.cantSimb > 0) {
                    updateIcon(id, false);
                } else {
                    updateIcon(id, true);
                }
                break;
            case 6:
                if (datos.middle > 0) {
                    updateIcon(id, false);
                } else {
                    updateIcon(id, true);
                }
                break;
            case 7:
                if (datos.requerimientos){
                    updateIcon(id, false);
                } else {
                    updateIcon(id, true);
                }
        }
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

function resetAllVista() {
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


}