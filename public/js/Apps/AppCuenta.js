import {getCuenta} from "../Services/CuentaService.js";
import {cifrar} from "../Utilities/UtHash.js"

export const logIn = () =>{        
    let cuenta = {
        mail: document.getElementById("mail").value,
        password: cifrar(document.getElementById("contraseña").value)
    }
    return getCuenta(cuenta);    
}