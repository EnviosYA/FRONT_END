import * as Service from "../Services/SeguimientoService.js";

export const seguimiento = () => {
    document.getElementById('getSeguimiento').onclick = () => {
        var idEnvio = document.getElementById('input-envio').value;
        if(idEnvio == ""){
            document.getElementById('sinEnvio').style.display = "block";
            document.getElementById('envioIncorrecto').style.display = "none";
            document.getElementById('input-envio').classList.remove("control");
            document.getElementById('input-envio').classList.add("input-error");
        }
        getSucursalPorEnvio(idEnvio);
    }
}

function getSucursalPorEnvio(id) {
    
    Service.default(id)
            .then(x => {
                console.log(x)
                if(x.length === 0){
                    document.getElementById('sinEnvio').style.display = "none";
                    document.getElementById("envioIncorrecto").style.display = "block";
                } else {
                    document.getElementById("ingreso-busqueda").style.display = "none";
                    var seguimiento = document.getElementById("seguimiento").className += "bordes";
                    maquetarSeguimiento(x);
                    document.getElementById("gmaps").style.display = "block";
                }
            });
}

function maquetarSeguimiento(seguimiento){
    var divSeguimiento = document.getElementById("seguimiento");

    seguimiento.forEach(element => {
        var ms = Date.parse(element.fecha);
        var fecha = new Date(ms);

        divSeguimiento.innerHTML += 
           `
                <div class="seguimiento-estado">
                    <ul>
                        <li><b>ID Sucursal:</b> ${element.idSucursal}</li>
                        <li><b>Estado del envío:</b> ${element.estado}</li>
                        <li><b>Fecha:</b> ${fecha.getDate()}-${fecha.getMonth()+1}-
                            ${fecha.getUTCFullYear()}</li>
                    </ul>    
                </div>
            `;
    });
}