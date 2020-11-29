import {URLENVIO} from "../Constants/Constants.js";
import { get, post} from "../Services/Requests.js";

export const postEnvio = (envio) => {
    return post(URLENVIO, envio);
}

export const getEnvioPorUsuario = (usuario) => {
    var url = URLENVIO + "?usuario=" + usuario;
    return get(url);
}

export const getEnvioPorEnvio = (envio) => {
    var url = URLENVIO + "?envio=" + envio;
    return get(url);
}