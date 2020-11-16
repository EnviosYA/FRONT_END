import { getLocalidades} from "../Services/SucursalService.js";
import {Direccion, Usuario, Cuenta} from "../Constants/Constants.js";
import { obtenerCoordenadas } from "../Services/MapsService.js";


export const maquetarLocalidades = () => {     
    let datalist = document.getElementById("localidades"); 
    getLocalidades().then(localidades => localidades.forEach(localidad => {
        datalist.innerHTML += `<option value="${localidad.nombre}" name = "${localidad.nombre}"id="${localidad.idLocalidad}"><option>`        
    }));
}

export const registrarUsuario = () => {    
    let mail = document.getElementById("mail").value;
    let password = document.getElementById("password").value;    
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let dni = document.getElementById("dni").value;
    let fechaNac = document.getElementById("fechaNac").value;
    let calle = document.getElementById("calle").value;
    let altura = document.getElementById("altura").value;      
    let localidad = document.getElementById("localidad").value;
    let idLocalidad = obtenerIdLocalidad();
    
    let cuenta = new Cuenta(mail,password);
    let direccion = new Direccion(0,0,calle, altura,idLocalidad);
    let usuario = new Usuario(nombre,apellido, dni, fechaNac, cuenta, direccion);
    let coords = obtenerCoordenadas("calle " + calle +" "+ altura +" " + localidad , usuario)    
}

const obtenerIdLocalidad = () =>{
    var listObj = document.getElementById("localidad");
    var datalist = document.getElementById(listObj.getAttribute("list"));
    if(datalist.options.namedItem(listObj.value) != null)
        return datalist.options.namedItem(listObj.value).id;
}