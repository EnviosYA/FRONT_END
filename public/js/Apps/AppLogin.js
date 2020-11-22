import { ajax } from "../Utilities/UtAjax.js";
import { loguearse } from "./AppCuenta.js";

export const login = () =>{
    let log = document.getElementById("form-Login");
    log.addEventListener("submit", (e)=>{
        e.preventDefault();
        let token = loguearse();
        setTimeout(() => {
            console.log(token);
        }, 2000);
    });
    //Si tocas el botón "No tengo cuenta"
    noCuenta();
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