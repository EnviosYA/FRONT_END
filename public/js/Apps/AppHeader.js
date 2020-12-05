import { separarJWT } from '../Utilities/UtJWT.js'
import { pascalCase } from '../Utilities/UtFormatos.js'
import { popupCerrarSesion } from './AppPopups/AppPopupsHeader.js';

export const headerLogueado = (token) =>{
    let headerLogin = document.getElementById("login-header");
    
    if(token != undefined){
        let tokenObject = separarJWT(token);
        if(tokenObject.accountType == 1){        
            headerLogin.innerText = `${pascalCase(tokenObject.Name)} ${pascalCase(tokenObject.LastName)}`;
            headerLogin.setAttribute("data-hash","Perfil");
            headerLogin.href = "perfil.html"; 
            botonSalir();
        }else if(tokenObject.accountType == 2){
            headerLogin.innerText = "Administrador";
            headerLogin.setAttribute("data-hash","Admin");
            headerLogin.href = "admin.html";
            botonSalir();
        }
    }else {
        headerLogin.innerText = "Iniciar sesión";
        headerLogin.setAttribute("data-hash","Login");
        headerLogin.href = "login.html";
    }
}

const botonSalir = () =>{
    if(document.querySelector(".Cerrar-Sesion") == undefined){
        let nav = document.querySelector("nav");
        let ancla = document.createElement("a");
        ancla.classList.add("Cerrar-Sesion");
        ancla.innerText="Cerrar sesión";
        ancla.style.cursor = "pointer";
        nav.appendChild(ancla);
        ancla.addEventListener("click",()=>{   
            popupCerrarSesion(nav,ancla);
        })
    }    
}
