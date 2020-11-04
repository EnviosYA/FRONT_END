import {URLBASECUENTA} from "../Constants/Constants.js";
import { get, post} from "../Services/Requests.js";

export const getCuenta = () => {
    return get(URLBASECUENTA);
}