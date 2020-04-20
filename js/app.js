function cargarTabla() {
    let tablaStorage = document.getElementById('tablaStorage');
    const passwords = JSON.parse(window.localStorage.getItem('PASSWORDS'));
    console.log(passwords);
    if (passwords != null){
        for(i=0; i<passwords.length; i++) {
            const trOpen = '<tr>';
            let fCell = '<td>' + parseInt(i+1, 10) + '</td>';
            let sCell = '<td>' + passwords[i].password + '</td>';
            let tCell = '<td>' + passwords[i].datos.puntaje + '</td>';
            let cCell = '<td>' + passwords[i].datos.complejidad + '</td>';
            const trClose = '</tr>';
            let celdas = fCell + sCell + tCell + cCell;
            tablaStorage.innerHTML = trOpen + celdas + trClose;
        }
    } else {
        const trOpen = '<tr>';
        const fCell = '<td>' + '1' + '</td>';
        const sCell = '<td>-</td>';
        const tCell = '<td>-</td>';
        const cCell = '<td>-</td>';
        const trClose = '</tr>';
        const celdas = fCell + sCell + tCell + cCell;
        tablaStorage.innerHTML = trOpen + celdas + trClose;
    }
    
}