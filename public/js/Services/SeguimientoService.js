import { URLSUCURSALPORENVIO } from "../Constants/Constants.js";
import { get, post } from "../Services/Requests.js";

const getSucursalPorEnvio = (id) => {
    return get(URLSUCURSALPORENVIO + id);
}

export const postSucursalPorEnvio = (sucursalPorEnvio) =>{
    return post(URLSUCURSALPORENVIO,sucursalPorEnvio);
}

export default getSucursalPorEnvio;