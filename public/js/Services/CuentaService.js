import {URLBASECUENTA} from "../Constants/Constants.js";
import { get, post} from "../Services/Requests.js";

export const postCuenta = (direccion) => {
    return post(URLBASECUENTA, direccion);
}