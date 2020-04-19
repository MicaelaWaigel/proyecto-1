function cargarTabla() {
    const tablaStorage = document.getElementById('tablaStorage');
    const passwords = JSON.parse(window.localStorage.getItem('PASSWORDS'));
    console.log(passwords);
    if (passwords != null){
        for(i=0; i<passwords.length; i++) {
            const trOpen = '<tr>';
            const fCell = '<td>' + i+1 + '</td>';
    
            const trClose = '</tr>';
            tablaStorage.innerHTML = trOpen + fCell + trClose;
        }
    }
    
}