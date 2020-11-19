import {URLBASECUENTA} from "../Constants/Constants.js";
import { get, post} from "../Services/Requests.js";

export const getCuenta = (cuenta) => {
    return get(URLBASECUENTA + "?username=" + cuenta.mail + "&password=" + cuenta.password);
}