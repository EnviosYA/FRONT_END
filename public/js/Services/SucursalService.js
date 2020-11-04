import {URLLOCALIDAD, URLSUCURSALESHABILITADAS, URLDIRECCION} from "../Constants/Constants.js";
import { get, post} from "../Services/Requests.js";

const getLocalidades = () => {
    return get(URLLOCALIDAD);
}

const getSucursales = () => {
    return get(URLSUCURSALESHABILITADAS);
}

const getDireccionByID = (id) =>{
    return get(URLDIRECCION+id)
}

const postDireccion = (direccion) => {
    return post(URLDIRECCION, direccion)
}

export {getLocalidades, getSucursales, postDireccion};