import { separarJWT } from './UtJWT.js'
import { pascalCase } from './UtFormatos.js'
import { toHome } from './UtAjax.js';

export const HeaderLogueado = (token) =>{
    let headerLogin = document.getElementById("login-header");
    
    if(token != undefined){
        let tokenObject = separarJWT(token);
        if(tokenObject.accountType == 1){        
            headerLogin.innerText = `${pascalCase(tokenObject.Name)} ${pascalCase(tokenObject.LastName)}`;
            headerLogin.setAttribute("data-hash","Perfil");
            headerLogin.href = "perfil.html"; 
            botonSalir();
        }else if(tokenObject.accountType == 2){
            headerLogin.innerText = "Admin";
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
    let nav = document.querySelector("nav");
    let ancla = document.createElement("a");
    ancla.classList.add("Cerrar-Sesion");
    ancla.innerText="Cerrar Sesión";
    ancla.style.cursor = "pointer";
    nav.appendChild(ancla);
    ancla.addEventListener("click",()=>{        
        popupSalir(nav,ancla);
    })
}

const popupSalir = (nav,ancla) =>{    
    swal({
        title: "¿Desea cerrar sesión?",
        buttons: ["Cancelar", "Aceptar"],
        icon: "warning"        
        })
        .then((accion) => {
        if (accion) {
            localStorage.removeItem("token");
            nav.removeChild(ancla);
            HeaderLogueado(undefined);
            toHome();
        }
    });
}