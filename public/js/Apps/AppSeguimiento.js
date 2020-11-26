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
                    const seguimiento = document.createElement("div");
                    seguimiento.setAttribute("id", "seguimiento");
                    const contenedor = document.getElementById("container");

                    contenedor.innerHTML = 
                    `
                        <div id="map-tracking" class="map-seguimiento"></div>
                    `;

                    contenedor.appendChild(seguimiento);
                    maquetarSeguimiento(x);
                }
            });
}

function maquetarSeguimiento(seguimiento){
    var divSeguimiento = document.getElementById("seguimiento");
    /*divSeguimiento.setAttribute("class", "bordes");*/
    var coordenadas = [];
    var sucursalActiva = "";

    seguimiento.forEach(element => {
        var ms = Date.parse(element.fecha);
        var fecha = new Date(ms);

        let divEstado = document.createElement("div");
        divEstado.setAttribute("class", "seguimiento-estado");

        let ul = document.createElement("ul");

        if(element.nombre != sucursalActiva){
            let liNombre = document.createElement("li");
            liNombre.setAttribute("class", "nombre-sucursal");
            liNombre.innerHTML = element.nombre;
            ul.appendChild(liNombre);
        }

        let liEstadoFecha = document.createElement("li");
        liEstadoFecha.innerHTML = `${element.estado}: ${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getUTCFullYear()}`;
        ul.appendChild(liEstadoFecha);
        
        divEstado.appendChild(ul);

        divSeguimiento.appendChild(divEstado);
        
        if(element.nombre != sucursalActiva){
            coordenadas.push(new Coordenada(parseFloat(element.latitud), parseFloat(element.longitud)));
            sucursalActiva = element.nombre;
        }
    });
    
    crearMapaSeguimiento(coordenadas);
}