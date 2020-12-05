import * as Service from "../Services/SeguimientoService.js";
import { crearMapaSeguimiento } from "../Services/MapsService.js";
import { Coordenada } from "../Constants/Constants.js";

export const seguimiento = () => {
    lectorQRSeguimiento();
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

const lectorQRSeguimiento = () =>{
    $('#reader').html5_qrcode(async function (nroEnvio){      
        getSucursalPorEnvio(nroEnvio);     
        $('#reader').html5_qrcode_stop();
        return;
    },
    function(error){ 
      //popupErrorIdEnvio(error);
    }, function(videoError){ 
      
    });
}

function getSucursalPorEnvio(id) {        
    Service.default(id)
            .then(x => {
                if(x.length == 0){
                    document.getElementById('sinEnvio').style.display = "none";
                    document.getElementById("envioIncorrecto").style.display = "block";
                } else {
                    document.getElementById("ingreso-busqueda").style.display = "none";
                    document.getElementById("titulo").style.display = "none";
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
    var coordenadas = [];
    var sucursalActiva = "";
    let arrayLetras = ["A", "B", "C", "D", "E", "F", "G"];
    let i = 0;
    let cantidadSeguimiento = seguimiento.length;

    seguimiento.forEach(element => {
        var ms = Date.parse(element.fecha);
        var fecha = new Date(ms);

        if(element.nombre != sucursalActiva){
            let divEstado = document.createElement("div");
            divEstado.setAttribute("class", "seguimiento-estado");
            divEstado.setAttribute("id", `"estado-${element.nombre}"`);

            let liNombre = document.createElement("li");
            liNombre.setAttribute("class", "nombre-sucursal");
            if(cantidadSeguimiento == 1){
                liNombre.innerHTML = `${element.nombre}`;
            } else {
                liNombre.innerHTML = `${element.nombre} (${arrayLetras[i]})`;
                i += 1;
            }

            let liEstadoFecha = document.createElement("li");
            liEstadoFecha.innerHTML = `${element.estado}: ${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getUTCFullYear()}`;

            divEstado.appendChild(liNombre);
            divEstado.appendChild(liEstadoFecha);
            divSeguimiento.appendChild(divEstado);

            coordenadas.push(new Coordenada(parseFloat(element.latitud), parseFloat(element.longitud)));
            sucursalActiva = element.nombre;
        } else {
            let liEstadoFecha = document.createElement("li");
            liEstadoFecha.innerHTML = `${element.estado}: ${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getUTCFullYear()}`;

            let divEstado = document.getElementById(`"estado-${element.nombre}"`);
            divEstado.appendChild(liEstadoFecha);
        }
    });
    
    crearMapaSeguimiento(coordenadas);
}