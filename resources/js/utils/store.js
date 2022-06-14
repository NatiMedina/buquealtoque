



function getFromLocalStorage() {

    const date = new Date();
    const today = date.toISOString().split('T')[0];

    const item = window.localStorage.getItem('pasaje');
    return item ? JSON.parse(item) : {
        origen: 'Buenos Aires',
        destino: 'Colonia',
        fecha_partida: today,
        fecha_regreso: today,
        pasaje_adulto: 1,
        pasaje_menor: 0,
        vehiculo: 0,
    };
}

function setToLocalStorage(value) {
    window.localStorage.setItem('pasaje', JSON.stringify(value));
}

export { getFromLocalStorage, setToLocalStorage };