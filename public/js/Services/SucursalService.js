import {POST_DELETE_DIRECCION, GETDIRECCION, GETLOCALIDADES, GET_PUT_SUCURSALES }from "../Constants/ConstantBranchOffices.js";

const GetLocalidades= () => {
    let url = GETLOCALIDADES;
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

const GetSucursales= () => {
    let url = GET_PUT_SUCURSALES;
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

export {GetLocalidades, GetSucursales};