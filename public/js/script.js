import { seguimiento } from "../js/Apps/AppSeguimiento.js";
import {maquetarSucursales} from "../js/Apps/AppSucursales.js";
import {clonar, guardarEnvio} from "../js/Apps/AppEnvio.js";
import {registrarUsuario} from "../js/Apps/AppRegistrarse.js";
import{maquetarLocalidades} from "./Utilities/UtLocalidad.js";
import { logIn } from "./Apps/AppCuenta.js";

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
                let log = document.getElementById("log");
                log.addEventListener("click", (e)=>{
                    e.preventDefault();
                    logIn();
                });
                //Si tocas el botón "No tengo cuenta"
                let registrarse = document.getElementById("noCuenta");
                registrarse.addEventListener("click", e=>{
                    e.preventDefault();
                    location.hash = e.target.dataset.hash;
                    let url = location.hash.split("#")[1] + ".html";
                    ajax("get", url, (response) => {
                        main.innerHTML = response;
                        let token = logIn();
                    });
                });
                break;
            case "Sucursales":
                maquetarSucursales();
                break;
            case "Contacto":
                break;
            case "Envio":
                maquetarLocalidades();
                let agregarPaquete = document.getElementById("clonar");
                agregarPaquete.addEventListener("click", (e)=> {
                    e.preventDefault();
                    clonar();
                });

                let crearEnvio = document.getElementById("crearEnvio");
                crearEnvio.addEventListener("click", (e)=> {
                    e.preventDefault();
                    guardarEnvio();
                });
                break;
            case "Registrarse":
                maquetarLocalidades();
                let registarse = document.getElementById("registrarse");
                registarse.addEventListener("click", (e)=>{
                    e.preventDefault();
                    registrarUsuario();
                });
                break;     
        }
      });
});

function ajax(metodo, url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(metodo, url);
    xhr.addEventListener("progress", (e) => {
      console.log("Descargando...");
    });
    xhr.addEventListener("load", () => {
      if (xhr.status == 200) {
        callback(xhr.response);
      }
    });
    xhr.send();
 };
  
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