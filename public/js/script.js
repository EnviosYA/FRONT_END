import { seguimiento } from "../js/Apps/AppSeguimiento.js";
import { sucursales } from "../js/Apps/AppSucursales.js";
import { envio } from "./Apps/AppEnvio.js";
import { login } from "./Apps/AppLogin.js";
import { registrarse } from "./Apps/AppRegistrarse.js";
import { ajax , toHome , recorrerLinks, toPage } from "./Utilities/UtAjax.js";
import { cambiarVisualizacionUsuario, headerLogueado } from "./Apps/AppHeader.js";
import {maquetarPerfil} from './Apps/AppPerfil.js'
import { admin } from "./Apps/AppAdmin.js";

let main = document.querySelector("main");
const token = localStorage.getItem("token");

headerLogueado(token);
toHome();
main.addEventListener("click", ()=>{
    cambiarVisualizacionUsuario();
})
window.addEventListener("hashchange", () => {   
    let localizacion = location.hash.split("#")[1];    
    let url = localizacion + ".html";
    ajax("get", url, (response) => {
        switch(localizacion){
            case "Home":
                main.innerHTML = response;
                recorrerLinks();
                break;
            case "Login":
                main.innerHTML = response;
                login();
                break;
            case "Seguimiento":
                main.innerHTML = response;
                seguimiento();
                break;            
            case "Sucursales":
                main.innerHTML = response;
                sucursales();
                break;            
            case "Envio":
                envio(response);
                break;
            case "Registrarse":
                main.innerHTML = response;
                registrarse();
                break;
            case "Perfil":
                main.innerHTML = response;
                maquetarPerfil();    
                break;
            case "Admin":
                main.innerHTML = response;
                admin();
                break;
            case "Contacto":
                main.innerHTML = response;
                break;
        }
    });    
});

//Header estático
window.onscroll = function(){fixed()};
let header = document.getElementById("myHeader");
let sticky = header.offsetTop;
function fixed(){
    if(window.pageYOffset > sticky){
        header.classList.add("sticky");
    }else{
        header.classList.remove("sticky");
    }
}

//Seiciro
let a = document.getElementById("seiciro")
a.addEventListener("click",(e)=>{
    e.preventDefault();
    swal({
        title: "Seiciro",
        buttons: {
            lean: "Leandro Lima",
            ciro: "Ciro Gargatagli",
            damian: "Damian Djirikian",
            eze: "Ezequiel Blasi",
            dani: "Daniel Villamierda"
        },
          })
      .then((accion) => {
        switch(accion){
            case "lean":
                window.open("https://www.linkedin.com/in/leandro-lima-03510b162/");
                break;
            case "ciro":
                window.open("https://www.linkedin.com/in/ciro-gargatagli-g%C3%B3mez-aba44a1a9/");
                break;
            case "damian":
                window.open("https://www.linkedin.com/in/damian-djirikian-921171b9/");
                break;
            case "eze":
                window.open("https://www.linkedin.com/in/ezequiel-blasi-0944201b6/");
                break;
            case "dani":
                window.open("https://www.linkedin.com/in/daniel-villajuan-78363b1a2/");
                break;
            default:
                break;
        }
        
     });
})