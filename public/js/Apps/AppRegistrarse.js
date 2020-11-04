import { postUsuario } from "../Services/UsuarioService.js";
import { getLocalidades} from "../Services/SucursalService.js";


export const maquetarLocalidades = () => {       
    let datalist = document.getElementById("localidades"); 
    getLocalidades().then(elementos => elementos.forEach(element => {
        datalist.innerHTML += `<option value = "${element.nombre}" id = ${element.idLocalidad}><option>`        
    }));        
}

export const guardarDireccion = () => {
    let registarse = document.getElementById("registrarse").value;
    let mail = document.getElementById("mail").value;
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let dni = document.getElementById("dni").value;
    let fechaNac = document.getElementById("fechaNac").value;    
    let localidad = document.getElementById("localidad").value;
    let calle = document.getElementById("calle").value;
    let altura = document.getElementById("altura").value;    

    registarse.addEventListener("click", (e)=>{
        e.preventDefault();

    })
}