import {URLENVIO} from "../Constants/Constants.js";
import { get, post} from "../Services/Requests.js";

export const postEnvio = (envio) => {
    return post(URLENVIO, envio);
}