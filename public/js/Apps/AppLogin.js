import { ajax, toHome } from "../Utilities/UtAjax.js";
import { Cuenta } from "../Constants/Constants.js";
import { autenticarse } from "../Services/CuentaService.js";
import { headerLogueado } from './AppHeader.js'

export const login = () =>{
    let log = document.getElementById("form-Login");
    log.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let token = await loguearse();
        if(token.statusCode == 401){                
            maquetarErrorLogin(1);
            return;
        }
        else{
            maquetarErrorLogin(2);
            localStorage.setItem("token",token.value.toString());
            headerLogueado(localStorage.getItem("token"));
            toHome()
        }
    });
    //Si tocas el botón "No tengo cuenta"
    noCuenta();
}

export const loguearse = async () =>{
    let mail = document.getElementById("mail").value;
    let password = document.getElementById("contraseña").value;
    let cuenta = new Cuenta(mail,password);
    return await autenticarse(cuenta);   
}

const maquetarErrorLogin = (opcion) =>{
    let error = document.getElementById("error-login");
    if(opcion == 1){
        error.style.display = "block";
    }
    else{
        error.style.display = "none";
    }
    
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