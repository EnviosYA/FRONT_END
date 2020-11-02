import {getSucursales} from "../Services/SucursalService.js";

export function maquetarSucursales(){
    let divSucursales = document.getElementById("sucursales");
    let sucursales = getSucursales();
    console.log(sucursales);

    sucursales.then(sucursales => sucursales.forEach(sucursal => { 
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
    }));
}