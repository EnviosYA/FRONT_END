import { separarJWT } from '../Utilities/UtJWT.js'
import { pascalCase } from '../Utilities/UtFormatos.js'
import { popupCerrarSesion } from './AppPopups/AppPopupsHeader.js';

export const headerLogueado = (token) =>{
    let divSesion = document.getElementById("sesion");
    
    if(token != undefined){
        let tokenObject = separarJWT(token);
        
        if(tokenObject.accountType == 1){
            divSesion.innerHTML = `<span>Bienvenido, ${pascalCase(tokenObject.Name)}!<i class="fas fa-caret-down"></i></span>`;
            let ulDesplegable = document.createElement("ul");
            ulDesplegable.setAttribute("id", "ul-desplegable");

            let liPerfil = document.createElement("li");

            let linkPerfil = document.createElement("a");
            linkPerfil.innerHTML = 'Mi cuenta';
            linkPerfil.setAttribute("class", "links");
            linkPerfil.setAttribute("data-hash", "Perfil");
            linkPerfil.href = "perfil.html";

            liPerfil.appendChild(linkPerfil);
            ulDesplegable.appendChild(liPerfil);
            divSesion.appendChild(ulDesplegable);
            divSesion.style.float = "right";
            
            botonSalir();
        }else if(tokenObject.accountType == 2){
            divSesion.innerHTML = `<span>Administrador<i class="fas fa-caret-down"></i></span>`;
            let ulDesplegable = document.createElement("ul");
            ulDesplegable.setAttribute("id", "ul-desplegable");

            let liPerfil = document.createElement("li");

            let linkPerfil = document.createElement("a");
            linkPerfil.innerHTML = 'Mantenimiento';
            linkPerfil.setAttribute("class", "links");
            linkPerfil.setAttribute("data-hash", "Admin");
            linkPerfil.href = "admin.html";

            liPerfil.appendChild(linkPerfil);
            ulDesplegable.appendChild(liPerfil);
            divSesion.appendChild(ulDesplegable);
            divSesion.style.float = "right";
            
            botonSalir();
        }
    }else {
        let linkLogin = document.createElement("a");
        linkLogin.innerText = "Iniciar sesión";
        linkLogin.setAttribute("data-hash","Login");
        linkLogin.setAttribute("class", "links");
        linkLogin.href = "login.html";
        divSesion.innerHTML = '';
        divSesion.style.float = "left";
        divSesion.appendChild(linkLogin);
    }

    let ul = document.getElementById("ul-desplegable");

    divSesion.addEventListener("click", () => {
        if(ul != null){
            let estiloDisplay = ul.style.display;
            if(estiloDisplay == 'block'){
                ul.style.display = 'none';
            } else {
                ul.style.display = 'block';
            }
        }
    });   
}

const botonSalir = () =>{
    if(document.querySelector(".Cerrar-Sesion") == undefined){
        let ul = document.getElementById("ul-desplegable");
        let li = document.createElement("li");
        let ancla = document.createElement("a");
        ancla.setAttribute("class", "links");
        ancla.classList.add("Cerrar-Sesion");
        ancla.innerText="Cerrar sesión";
        ancla.style.cursor = "pointer";
        li.appendChild(ancla)
        ul.appendChild(li);
        ancla.addEventListener("click",()=>{   
            popupCerrarSesion(li,ancla);
        })
    }
}

export const cambiarVisualizacionUsuario = () => {
    let ul = document.getElementById("ul-desplegable");

    if(ul != null){
        let estiloDisplay = ul.style.display;
        if(estiloDisplay == 'block'){
            ul.style.display = 'none';
        }
    }    
}
