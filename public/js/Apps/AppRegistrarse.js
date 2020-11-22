import {Direccion, Usuario, Cuenta} from "../Constants/Constants.js";
import { obtenerCoordenadas } from "../Services/MapsService.js";
import {obtenerIdLocalidad,maquetarLocalidades} from "../Utilities/UtLocalidad.js";

export const registrarse = () =>{    
    maquetarLocalidades();
    let registrarse = document.getElementById("form-Registrarse");
    registrarse.addEventListener("submit", (e)=>{
        e.preventDefault();
        registrarUsuario();
    });
}

export const registrarUsuario = () => {    
    let mail = document.getElementById("mail").value;
    let password = document.getElementById("password").value;
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let dni = document.getElementById("dni").value;
    let fechaNac = document.getElementById("fechaNac").value;
    let calle = document.getElementById("calle").value;
    let altura = parseInt(document.getElementById("altura").value);      
    let localidad = document.getElementById("localidad").value;
    let idLocalidad = obtenerIdLocalidad();
    
    let cuenta = new Cuenta(mail,password);
    let direccion = new Direccion(calle, altura,idLocalidad);
    let usuario = new Usuario(nombre,apellido, dni, fechaNac, cuenta, direccion);
    obtenerCoordenadas("calle " + calle +" "+ altura +" " + localidad , usuario,1);
}