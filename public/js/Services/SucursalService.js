import {LOCALIDAD, SUCURSAL} from "../Constants/Constants.js";

const getLocalidades= () => {
    let url = LOCALIDAD;
    return fetch(url, {
        method:"GET"
    })
    .then(response => { 
        return response.json()
    })
    .then(json => {
        return json;
    })
    .catch(err => console.log('ERROR: ' + err))
}

const getSucursales= () => {
    let url = SUCURSAL;
    return fetch(url, {
        method:"GET"
    })
    .then(response => { 
        return response.json()
    })
    .then(json => {
        return json;
    })
    .catch(err => console.log('ERROR: ' + err))
}

export {getLocalidades, getSucursales};