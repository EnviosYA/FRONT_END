import { URLENVIO } from "../Constants/Constants.js";
import { get, post} from "../Services/Requests.js";

export const postEnvio = (envio) => {
    return post(URLENVIO, envio);
}

export const getEnvioByIdUser = (usuario) => {
    let url = URLENVIO + "?usuario=" + usuario;
    return get(url);
}

export const getEnvioById = (envio) => {
    var url = URLENVIO + "?envio=" + envio;
    return get(url);
}