import * as Service from "../Services/SeguimientoService.js";
import { crearMapaSeguimiento } from "../Services/MapsService.js";
import { Coordenada } from "../Constants/Constants.js";

export const seguimiento = () => {
    document.getElementById('getSeguimiento').onclick = () => {
        var idEnvio = document.getElementById('input-envio').value;
        if(idEnvio == ""){
            document.getElementById('sinEnvio').style.display = "block";
            document.getElementById('envioIncorrecto').style.display = "none";
            document.getElementById('input-envio').classList.remove("control");
            document.getElementById('input-envio').classList.add("input-error");
        } else {
            getSucursalPorEnvio(idEnvio);
        }
    }
}

function getSucursalPorEnvio(id) {        
    Service.default(id)
            .then(x => {
                if(x.length == 0){
                    document.getElementById('sinEnvio').style.display = "none";
                    document.getElementById("envioIncorrecto").style.display = "block";
                } else {
                    document.getElementById("ingreso-busqueda").style.display = "none";
                    document.getElementById("seguimiento").className += "bordes";
                    maquetarSeguimiento(x);
                }
            });
}

function maquetarSeguimiento(seguimiento){
    var divSeguimiento = document.getElementById("seguimiento");
    var coordenadas = [];
    var sucursalActiva = "";

    seguimiento.forEach(element => {
        var ms = Date.parse(element.fecha);
        var fecha = new Date(ms);

        divSeguimiento.innerHTML += 
        `
            <div class="seguimiento-estado">
                <ul>
                    <li>${element.nombre}</li>
                    <li>${element.estado}</li>
                    <li>${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getUTCFullYear()}</li>
                </ul>    
            </div>
        `;
        if(element.nombre != sucursalActiva){
            coordenadas.push(new Coordenada(parseFloat(element.latitud), parseFloat(element.longitud)));
            sucursalActiva = element.nombre;
        }
    });
    
    document.getElementById("container").innerHTML += 
    `
        <div id="map-tracking" class="map-seguimiento"></div>
    `;
    
    crearMapaSeguimiento(coordenadas);
}