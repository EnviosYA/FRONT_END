import{ Direccion, Envio, Paquete } from "../Constants/Constants.js";
import { obtenerIdLocalidad } from "../Utilities/UtLocalidad.js";
import {obtenerCoordenadas} from "../Services/MapsService.js";
import{ maquetarLocalidades } from "../Utilities/UtLocalidad.js";
import { separarJWT } from "../Utilities/UtJWT.js";
import { popupNoLogin } from "./AppPopups/AppPopupsNoLogin.js";


let main = document.querySelector("main");

export const envio = (response) =>{    

    if (localStorage.getItem("token") != null){
        main.innerHTML = response;
        envioInterno();
    }
    else{
        popupNoLogin();
    }
}

const envioInterno = () => {
    maquetarLocalidades();
    maquetarMedidas();
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

const maquetarMedidas = () =>{
    let selects = document.querySelectorAll("#tipo");
    selects.forEach(select =>{        
        select.addEventListener("change", (e)=>{
            e.preventDefault();      
            let divPaquete = select.parentNode;      
            let inputs = divPaquete.querySelectorAll(".medida");
            let cantInputs = inputs.length;
            if(select.value == 1){
                if(!cantInputs){
                    divPaquete.insertAdjacentHTML('beforeend', `
                    <input class="control medida" type="number" min="0.01" step="0.01" max="1000" placeholder="Peso (Kg)" id="peso" required>
                    <input class="control medida" type="number" min="0.01" step="0.01" max="1000" placeholder="Largo (M)" id="largo" required>
                    <input class="control medida" type="number" min="0.01" step="0.01" max="1000" placeholder="Ancho (M)" id="ancho" required>
                    <input class="control medida" type="number" min="0.01" step="0.01" max="1000" placeholder="Alto (M)" id="alto" required>
                    `)
                }                
            }
            else{
                if(cantInputs){
                   inputs.forEach(input =>{
                       divPaquete.removeChild(input);
                   })
                }
            }
        })
    })    
}

const clonar = () =>{
    let paquetes = document.querySelectorAll(".paquete");
    let cantPaquetes = paquetes.length + 1;
    if (cantPaquetes <= 5)
    {        
        let divPaquetes = document.getElementById("paquetes");
        divPaquetes.insertAdjacentHTML('beforeend',`
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
        </div>
        `);
        maquetarMedidas();
    }
    cantPaquetes = paquetes.length + 1;
    if (cantPaquetes == 5){
        let form = document.getElementById("form-Envio");
        let btnAgregarPaquete = document.getElementById("clonar");
        form.removeChild(btnAgregarPaquete);
    }
}

export const guardarEnvio = () => {
    let idUsuario = parseInt(separarJWT(localStorage.getItem("token")).IdUser);
    let calle = document.getElementById("calle").value;
    let altura = parseInt(document.getElementById("altura").value);
    let localidad = document.getElementById("localidad").value;
    let idLocalidad = obtenerIdLocalidad();
    let paquetes = guardarPaquetes();

    let direccionDestino = new Direccion(calle, altura,idLocalidad);
    direccionDestino.localidad = localidad;
    let envio = new Envio(idUsuario, direccionDestino, paquetes);
    obtenerCoordenadas("calle " + calle +" "+ altura +" " + localidad , envio,2);
}

const guardarPaquetes = () =>{
    let divPaquetes = document.querySelectorAll(".paquete");
    let paquetes = [];
    divPaquetes.forEach(paquete => {
        let divDatos = paquete.querySelectorAll(".control");
        let arrayPaquete = [];
        divDatos.forEach(dato=>{
            arrayPaquete.push(dato.value);
        });    
        let paqueteConcreto = new Paquete(parseInt(arrayPaquete[0]));
        switch(paqueteConcreto.idTipoPaquete){
            case 1:
                paqueteConcreto.tipoPaquete = "Caja";                
                paqueteConcreto.peso = parseInt(arrayPaquete[1]);
                paqueteConcreto.largo = parseInt(arrayPaquete[2]);
                paqueteConcreto.ancho = parseInt(arrayPaquete[3]);
                paqueteConcreto.alto = parseInt(arrayPaquete[4]);
                break;
            case 2:
                paqueteConcreto.tipoPaquete = "Bolsin";
                break;
            case 3:
                paqueteConcreto.tipoPaquete = "Carta documento";
                break;
            case 4:
                paqueteConcreto.tipoPaquete = "Telegrama";
                break;
            case 5:
                paqueteConcreto.tipoPaquete = "Carta simple";
                break;            
        }
        paquetes.push(paqueteConcreto);
    });
    return paquetes;
}

