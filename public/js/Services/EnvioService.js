import {URLENVIO} from "../Constants/Constants.js";
import { get, post} from "../Services/Requests.js";

export const postEnvio = (envio) => {
    post(URLENVIO, envio);
}
