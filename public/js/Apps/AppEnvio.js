import{Direccion, Envio, Paquete} from "../Constants/Constants.js";
import { obtenerIdLocalidad } from "../Utilities/UtLocalidad.js";
import {obtenerCoordenadas} from "../Services/MapsService.js";
import{ maquetarLocalidades } from "../Utilities/UtLocalidad.js";

export const envio = () =>{
    maquetarLocalidades();
    let agregarPaquete = document.getElementById("clonar");
    agregarPaquete.addEventListener("click", (e)=> {
        e.preventDefault();
        clonar();
    });

    let crearEnvio = document.getElementById("form-Envio");
    crearEnvio.addEventListener("submit", (e)=> {
        e.preventDefault();
        guardarEnvio();
    });
}

let cantPaquetes = 2;
export const clonar = () =>{
    if (cantPaquetes <= 5)
    {
        let paquetes = document.querySelector("#paquetes");
        paquetes.innerHTML += 
        `
        <div class="paquete">
            <h4>Datos de paquete ${cantPaquetes}</h4>
            <select class="control" name="Tipopaquete" id="tipo" required>
                <option>  --- Seleccione Tipo de Paquete ---  </option>
                <option value="1">Caja</option>
                <option value="2">Bolsin</option>
                <option value="3">Carta documento</option>
                <option value="4">Telegrama</option>
                <option value="5">Carta simple</option>
            </select>
            <input class="control" type="number" min="0.01" step="0.01" placeholder="Peso" id="peso" required>
            <input class="control" type="number" min="0.01" step="0.01" placeholder="Largo" id="largo" required>
            <input class="control" type="number" min="0.01" step="0.01" placeholder="Ancho" id="ancho" required>
            <input class="control" type="number" min="0.01" step="0.01" placeholder="Alto" id="alto" required>
        </div>
        `
        cantPaquetes++;
    }
    if (cantPaquetes > 5){
        let form = document.getElementById("form-Envio");
        let btnAgregarPaquete = document.getElementById("clonar");
        form.removeChild(btnAgregarPaquete);
    }
}

export const guardarEnvio = () => {
    let idUsuario = 0;
    let calle = document.getElementById("calle").value;
    let altura = parseInt(document.getElementById("altura").value);
    let localidad = document.getElementById("localidad").value;
    let idLocalidad = obtenerIdLocalidad();
    let divPaquetes = document.querySelectorAll(".paquete");
    let paquetes = guardarPaquetes(divPaquetes);

    let direccionDestino = new Direccion(calle, altura,idLocalidad);
    let envio = new Envio(idUsuario, direccionDestino, paquetes);
    obtenerCoordenadas("calle " + calle +" "+ altura +" " + localidad , envio,2);
}

const guardarPaquetes = (divPaquetes) =>{
    let paquetes = [];
    divPaquetes.forEach(paquete => {
        let divDatos = paquete.querySelectorAll(".control");
        let arrayPaquete = [];
        divDatos.forEach(dato=>{
            arrayPaquete.push(dato.value);
        })
        let paqueteConcreto = new Paquete(arrayPaquete[0],arrayPaquete[1],arrayPaquete[2], arrayPaquete[3],arrayPaquete[4])        
        paquetes.push(paqueteConcreto);
    });
    return paquetes;
}