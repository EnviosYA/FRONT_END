import { seguimiento } from "../js/Apps/AppSeguimiento.js";
import { sucursales } from "../js/Apps/AppSucursales.js";
import { envio } from "./Apps/AppEnvio.js";
import { login } from "./Apps/AppLogin.js";
import { registrarse } from "./Apps/AppRegistrarse.js";
import { ajax } from "./Utilities/UtAjax.js";


let links = document.querySelectorAll(".links");
let main = document.querySelector("main");

links.forEach( link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        location.hash = e.target.dataset.hash;
    })
})

if(location.hash){
    let url = location.hash.split("#")[1] + ".html";
    ajax("get",url);
}

window.addEventListener("hashchange", () => {
    let localizacion = location.hash.split("#")[1];
    let url = localizacion + ".html";
    ajax("get", url, (response) => {
        main.innerHTML = response;        
        switch(localizacion){
            case "Seguimiento":
                seguimiento();
                break;
            case "Login":
                login();
                break;
            case "Sucursales":
                sucursales();
                break;
            case "Contacto":
                break;
            case "Envio":
                envio();                
                break;
            case "Registrarse":
                registrarse();
                break;
        }
      });
});
  
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