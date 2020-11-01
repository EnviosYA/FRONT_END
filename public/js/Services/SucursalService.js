import {URLLOCALIDAD, URLSUCURSAL, URLDIRECCION} from "../Constants/Constants.js";
import { get, post} from "../Services/Requests.js";

const getLocalidades= () => {
    return get(URLLOCALIDAD);
}

const getSucursales= () => {
    return get(URLSUCURSAL);
}

const postDireccion = (direccion) => {
    return post(URLDIRECCION, direccion)
}



export {getLocalidades, getSucursales, postDireccion};