import { postUsuario } from "../Services/UsuarioService.js";
import { getLocalidades} from "../Services/SucursalService.js";
import {Direccion, Usuario, Cuenta} from "../Constants/Constants.js";


export const maquetarLocalidades = () => {     
    let datalist = document.getElementById("localidades"); 
    getLocalidades().then(elementos => elementos.forEach(element => {
        datalist.innerHTML += `<option value = "${element.nombre}" id = ${element.idLocalidad}><option>`        
    }));
}

export const guardarDireccion = () => {    
    let mail = document.getElementById("mail").value;
    let password = document.getElementById("password").value;    
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let dni = document.getElementById("dni").value;
    let fechaNac = document.getElementById("fechaNac").value;
    let latitud = 0;
    let longitud = 0;
    let calle = document.getElementById("calle").value;
    let altura = document.getElementById("altura").value;      
    let idLocalidad = document.getElementById("localidad").value;
    

    let cuenta = new Cuenta(mail,password);
    let direccion = new Direccion(latitud, longitud, calle, altura,idLocalidad);

    let usuario = new Usuario(nombre,apellido, dni, fechaNac, cuenta, direccion);
    //postUsuario(usuario);
}