import { toPage } from "../../Utilities/UtAjax.js";

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