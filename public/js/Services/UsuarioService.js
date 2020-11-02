import {URLBASEUSUARIO} from "../Constants/Constants.js";
import {get, post} from "../Services/Requests.js";

export const postUsuario = (usuario) => {
    return post(URLBASEUSUARIO, usuario);
}