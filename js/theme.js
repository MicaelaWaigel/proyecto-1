
function checkTheme() {
    console.log('CheckTheme');
    const tema = window.localStorage.getItem('TEMA');
    if (tema != null) {
        if(tema == 'Azul') {
            changeTheme('Azul');
        }
    }
}


function changeTheme(tema){
    window.localStorage.setItem('TEMA', tema);
    if(tema == 'Azul') {
        if( computedStyle('--color-theme') != 'royalblue') {
            document.documentElement.style.setProperty('--color-theme', 'royalblue');
            cambio('btn-danger', 'btn-primary');
            
        }
    } else {
        if(computedStyle('--color-theme') != 'firebrick') {
            document.documentElement.style.setProperty('--color-theme', 'firebrick');
            cambio('btn-primary', 'btn-danger');
        }
    }
}

function checkThemeMedidor() {
    const tema = window.localStorage.getItem('TEMA');
    console.log(tema);
    if (tema != null) {
        if(tema == 'Azul') {
            changeThemeMedidor('Azul');
        }
    }
}

function changeThemeMedidor(tema) {
    const cambiosRed = ['border-danger', 'btn-outline-danger'];
    const cambiosBlue = ['border-primary', 'btn-outline-primary'];
    window.localStorage.setItem('TEMA', tema);
    if(tema == 'Azul') {
        if( computedStyle('--color-theme') != 'royalblue') {
            document.documentElement.style.setProperty('--color-theme', 'royalblue');
        }
        for(i=0; i<cambiosRed.length; i++){
            cambio(cambiosRed[i], cambiosBlue[i]);
        }
        console.log(document.getElementById('password').classList);
    } else {
        if(computedStyle('--color-theme') != 'firebrick') {
            document.documentElement.style.setProperty('--color-theme', 'firebrick');
        }
        for(i=0; i<cambiosBlue.length; i++){
            cambio(cambiosBlue[i], cambiosRed[i]);
        }
    }
}

function computedStyle(id) {
    return getComputedStyle(document.documentElement).getPropertyValue(id);
}

function cambio(id, idNew) {
    let elemento = document.getElementsByClassName(id);
    elemento.item(0).classList.replace(id, idNew);
    
}