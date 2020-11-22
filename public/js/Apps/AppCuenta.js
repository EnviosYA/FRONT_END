import { Cuenta } from "../Constants/Constants.js";
import {autenticarse} from "../Services/CuentaService.js";

export const loguearse = () =>{
    let mail = document.getElementById("mail").value;
    let password = document.getElementById("contraseña").value;
    let cuenta = new Cuenta(mail,password);
    return autenticarse(cuenta);
}