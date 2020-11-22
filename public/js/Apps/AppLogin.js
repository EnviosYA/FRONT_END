import { ajax } from "../Utilities/UtAjax.js";
import { Cuenta } from "../Constants/Constants.js";
import {autenticarse} from "../Services/CuentaService.js";
import { separarJWT } from "../Utilities/UtJWT.js";

export let token = null; 

export const login = () =>{
    let log = document.getElementById("form-Login");
    log.addEventListener("submit", async (e)=>{
        e.preventDefault();                
        token = await loguearse();
    });
    //Si tocas el botón "No tengo cuenta"
    noCuenta();
}
export const loguearse = async () =>{
    let mail = document.getElementById("mail").value;
    let password = document.getElementById("contraseña").value;
    let cuenta = new Cuenta(mail,password);
    let token = await autenticarse(cuenta);    
    return token.value.toString();
}

const noCuenta = () =>{
    let main = document.querySelector("main");
    let noCuenta = document.getElementById("noCuenta");
    noCuenta.addEventListener("click", e=>{
        e.preventDefault();
        location.hash = e.target.dataset.hash;
        let url = location.hash.split("#")[1] + ".html";
        ajax("get", url, (response) => {
            main.innerHTML = response;
        });
    });
}