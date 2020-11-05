import {postEnvio} from "../Services/EnvioService.js";
import{Direccion, Envio, Paquete} from "../Constants/Constants.js";

let cantPaquetes = 1;
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
}

export const guardarEnvio = () => {    
    let idUsuario = 0;   

    let latitud = 0;
    let longitud = 0;
    let calle = document.getElementById("calle").value;
    let altura = document.getElementById("altura").value;      
    let idLocalidad = document.getElementById("localidad").value;    

    let divPaquetes = document.querySelectorAll(".paquete");
    let paquetes = [];   
    divPaquetes.forEach(paquete => {
        let divDatos = paquete.querySelectorAll(".control");
        let arrayPaquete = [];
        divDatos.forEach(dato=>{
            arrayPaquete.push(dato.value);
        })
        let paqueteConcreto = new Paquete(arrayPaquete[0],arrayPaquete[1],arrayPaquete[2], arrayPaquete[3],arrayPaquete[4])        
        paquetes.push(paqueteConcreto);
    })

    let direccion = new Direccion(latitud, longitud, calle, altura,idLocalidad);

    let envio = new Envio(idUsuario, direccion, paquetes);
    //postEnvio(envio);
}