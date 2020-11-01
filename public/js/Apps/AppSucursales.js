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
                        <li><b>Sucursal:</b> ${sucursal.nombre}</li>
                        <li><b>Ubicada en la localidad de: </b> ${sucursal.nombreLocalidad}</li>
                    </ul>    
                </div>
            `;
    }));
}