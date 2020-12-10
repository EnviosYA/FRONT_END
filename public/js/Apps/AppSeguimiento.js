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
    $('#reader').html5_qrcode(function (nroEnvio){      
        getSucursalPorEnvio(nroEnvio);
        $('#reader').html5_qrcode_stop();
    },
    function(error){ 
      //popupErrorIdEnvio(error);
    }, function(videoError){ 
      
    });
}

function getSucursalPorEnvio(id) {        
    Service.default(id)
            .then(x => {
                console.log(x)
                if(x.length == 0){
                    document.getElementById('sinEnvio').style.display = "none";
                    document.getElementById("envioIncorrecto").style.display = "block";
                } else {
                    if(document.getElementById("ingreso-busqueda")){
                        document.getElementById("ingreso-busqueda").style.display = "none";
                        document.getElementById("titulo").style.display = "none";
                    }
                    const seguimiento = document.createElement("div");
                    seguimiento.setAttribute("id", "tracking");
                    const ulProgressBar = document.createElement("ul");
                    ulProgressBar.setAttribute("id", "progreso");
                    ulProgressBar.innerHTML = '';
                    const contenedor = document.getElementById("container");

                    contenedor.innerHTML = 
                    `
                        <div id="map-tracking" class="map-seguimiento"></div>
                    `;
                    
                    contenedor.appendChild(seguimiento);
                    seguimiento.appendChild(ulProgressBar);
                    maquetarSeguimiento(x);
                }
            });
}

function maquetarSeguimiento(seguimiento){
    var coordenadas = [];
    var sucursalActiva = "";

    seguimiento.forEach(element => {
        var ms = Date.parse(element.fecha);
        var fecha = new Date(ms);

        if(element.nombre != sucursalActiva){
            let ulEstado = document.createElement("ul");
            ulEstado.setAttribute("class", "seguimiento-estado");
            ulEstado.setAttribute("id", `"estado-${element.nombre}"`);

            let liNombre = document.createElement("li");
            liNombre.setAttribute("class", "nombre-sucursal");
            liNombre.innerHTML = element.nombre;

            let liEstadoFecha = document.createElement("li");
            liEstadoFecha.innerHTML = `${element.estado}: ${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getUTCFullYear()}`;

            ulEstado.appendChild(liNombre);
            ulEstado.appendChild(liEstadoFecha);
            let ulProgressBar = document.getElementById("progreso"); 
            ulProgressBar.appendChild(ulEstado);

            coordenadas.push(new Coordenada(parseFloat(element.latitud), parseFloat(element.longitud)));
            sucursalActiva = element.nombre;
        } else {
            let liEstadoFecha = document.createElement("li");
            liEstadoFecha.innerHTML = `${element.estado}: ${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getUTCFullYear()}`;

            let ulEstado = document.getElementById(`"estado-${element.nombre}"`);
            ulEstado.appendChild(liEstadoFecha);
        }
    });
    
    crearMapaSeguimiento(coordenadas);
}