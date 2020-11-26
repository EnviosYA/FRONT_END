import {separarJWT} from './UtJWT.js'
import {pascalCase} from './UtFormatos.js'
import { toHome } from './UtAjax.js';

export const HeaderLogueado = (token) =>{
    let headerLogin = document.getElementById("login-header");
    
    if(token != undefined){
        let tokenObject = separarJWT(token);
        console.log(tokenObject)
        if(tokenObject.accountType == 1){        
            headerLogin.innerText = `${pascalCase(tokenObject.Name)} ${pascalCase(tokenObject.LastName)}`;
            headerLogin.setAttribute("data-hash","Perfil");
            headerLogin.href = "perfil.html"; 
            botonSalir();
            console.log(headerLogin)
        }else if(tokenObject.accountType == 2){
            headerLogin.innerText = "Admin";
            headerLogin.setAttribute("data-hash","Admin");
            headerLogin.href = "admin.html";
            botonSalir();
            console.log(headerLogin)
        }
    }else {
        headerLogin.innerText = "Iniciar Sesión";
        headerLogin.setAttribute("data-hash","Login");
        headerLogin.href = "login.html"; 
        console.log(headerLogin)
    }
}

const botonSalir = () =>{
    let nav = document.querySelector("nav");
    let ancla = document.createElement("a");
    ancla.classList.add("Cerrar-Sesion");
    ancla.innerText="Cerrar Sesión";
    ancla.href = "index.html"
    nav.appendChild(ancla);
    ancla.addEventListener("click",()=>{
        localStorage.removeItem("token");
    })
}