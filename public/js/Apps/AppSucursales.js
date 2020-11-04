import { crearMapaSucursales } from "../Services/MapsService.js";
import {getSucursales} from "../Services/SucursalService.js";

export function maquetarSucursales(){
    let divSucursales = document.getElementById("sucursales");
    let sucursales = getSucursales();
    console.log(sucursales);
    divSucursales.innerHTML += 
    `
         <div class="linea-vertical"></div>
    `;
    sucursales.then(sucursales => {
        let coord = [];
        sucursales.forEach(sucursal => { 
            divSucursales.innerHTML += 
            `
                <div class="sucursal">
                    <ul>
                        <li class = "sucursal-nombre">${sucursal.nombre}</li>
                        <li>${sucursal.calle} ${sucursal.altura}</li>
                        <li>${sucursal.nombreLocalidad} (${sucursal.cp}) - ${sucursal.nombreProvincia}</li>
                    </ul>    
                </div>
            `;
            coord.push([sucursal.longitud,sucursal.latitud]);
        });
        crearMapaSucursales(coord);
    });
}