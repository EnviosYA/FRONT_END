import {LOGIN} from "../Constants/Constants.js";
import { get, post} from "../Services/Requests.js";

export const autenticarse = (cuenta) => {
    return post(LOGIN, cuenta);
}