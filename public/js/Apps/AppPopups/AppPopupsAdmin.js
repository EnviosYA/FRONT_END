import { toPage } from "../../Utilities/UtAjax.js";
import { SucursalPorEnvio } from "../../Constants/Constants.js";
import { postSucursalPorEnvio } from "../../Services/SeguimientoService.js"

export const popupErrorIdEnvio = (error) =>{
    swal({
        title: error,
        buttons: ["Inicio", "Volver a intentarlo"],
        icon: "error"
      })
      .then((accion) => {
        if (accion) {            
            toPage("admin.html");
        }
        else{
            toPage("home.html");
        }
     });
}

export const popupErrorAlPublicarEstado = () =>{
    swal({
        title: "Error al publicar el estado",
        buttons: ["Inicio", "Volver a intentarlo"],
        icon: "error"
      })
      .then((accion) => {
        if (accion) {
            let url = location.hash + ".html";
            toPage(url);
        }
        else{
            toPage("home.html");
        }
     });
}

export const popupEstadoExitoso = () =>{
    swal({
        title: "¡Se publicó el nuevo estado correctamente!",
        buttons: ["Volver al inicio", "Publicar nuevo estado"],
        icon: "success"
      })
      .then((accion) => {
        if (accion) {
            location.hash = "";
            toPage("admin.html");
        }
        else{
            toPage("home.html");
        }
     });
}

export const popupConfirmarPublicarEstado = (nuevoEstado, nroEnvio) =>{
    swal({
        title: "¡Atención!",
        text:  "Se publicará un nuevo estado \n" + nuevoEstado,
        buttons: ["Editar", "Confirmar"],
        icon: "warning"
    })
    .then(async (accion) => {
        if (accion) {           
            let idSucursal = parseInt(document.getElementById("sucursal").value);
            let idEstado = parseInt(document.getElementById("estado").value);
            let sucursalPorEnvio = new SucursalPorEnvio(parseInt(nroEnvio),idSucursal,idEstado);
            let responseSucPorEnvio = await postSucursalPorEnvio(sucursalPorEnvio);
            if (responseSucPorEnvio.codigo == 201){
                popupEstadoExitoso();
            }else{
                popupErrorAlPublicarEstado();
            }
        }
    });
}