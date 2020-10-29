import { SucursalPorEnvio } from "./Constants.js";
import * as Service from "./SucursalPorEnviosService.js";

window.onload = () => {
    document.getElementById('getSeguimiento').onclick = function () {
        var idEnvio = document.getElementById('input-envio').value;
        getSucursalPorEnvio(idEnvio);
    }
};

function getSucursalPorEnvio(id) {
    document.getElementById("ingreso-busqueda").style.display = "none";
    Service.default(id)
            .then(x => {
                console.log(x)
            });
}