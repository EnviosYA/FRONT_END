import { Coordenada } from "../Constants/Constants.js";
import { crearMapaSucursales } from "../Services/MapsService.js";
import {getSucursales} from "../Services/SucursalService.js";

export const sucursales = () =>{
    let divSucursales = document.getElementById("sucursales");
    let sucursales = getSucursales();
    divSucursales.innerHTML += 
    `
         <div class="linea-vertical"></div>
    `;
    sucursales.then(sucursales => {
        let coords = [];
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
            coords.push(new Coordenada(sucursal.latitud,sucursal.longitud));
        });
        crearMapaSucursales(coords);
    });
}