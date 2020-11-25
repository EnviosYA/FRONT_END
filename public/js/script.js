import { seguimiento } from "../js/Apps/AppSeguimiento.js";
import { sucursales } from "../js/Apps/AppSucursales.js";
import { envio } from "./Apps/AppEnvio.js";
import { login } from "./Apps/AppLogin.js";
import { registrarse } from "./Apps/AppRegistrarse.js";
import { Envio } from "./Constants/Constants.js";
import { ajax } from "./Utilities/UtAjax.js";
import { separarJWT } from "./Utilities/UtJWT.js";

let main = document.querySelector("main");

const recorrerLinks = () =>{
    let links = document.querySelectorAll(".links");

    links.forEach( link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            location.hash = e.target.dataset.hash;
        })
    })
}
ajax("get", "home.html", (response) =>{
    main.innerHTML = response;
    recorrerLinks();
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
            case "Contacto":
                main.innerHTML = response;
                break;
            case "Envio":
                envio(response);
                break;
            case "Registrarse":
                main.innerHTML = response;
                registrarse();
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