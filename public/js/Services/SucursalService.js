import {URLLOCALIDAD, URLSUCURSAL, URLDIRECCION} from "../Constants/Constants.js";
import { get, post} from "../Services/Requests.js";

const getLocalidades= () => {
    get(URLLOCALIDAD);
}

const getSucursales= () => {
    get(URLSUCURSAL);
}

const postDireccion = (direccion) => {
    post(URLDIRECCION, direccion)
}



export {getLocalidades, getSucursales, postDireccion};