import { toPage } from "../../Utilities/UtAjax.js";
import { chequearCantPaquetes, reacomodarNumeroPaquetes } from "../AppEnvio.js";

export const popupLocalidadNoExistente = () =>{
    swal({
        title: "¡La localidad ingresada no pertenece a la lista!",
        text: "Si la localidad que está ingresando es correcta, no cubrimos envíos en dicho lugar. \n ¡Haznos saber si desearías que cubramos esa área!",
        buttons: ["Contáctanos", "Editar"],
        icon: "error"
      })
      .then((accion) => {
        if (accion) {
        }
        else{
            window.location.href = "mailto:enviosya@enviosya.org";
            toPage("home.html");
        }
    });
}

export const popupEliminarPaquete = (paquete) =>{
    swal({
        title: "¡Atención!",
        text: "¿Está seguro que desea eliminar el paquete?",
        buttons: ["Cancelar", "Eliminar"],
        icon: "warning"
      })
      .then((accion) => {
        if (accion) {
            let divPaquetes = document.getElementById("paquetes");
            divPaquetes.removeChild(paquete);
            reacomodarNumeroPaquetes();
            chequearCantPaquetes();
        }
    });
}

export const popupErrorNoSeleccionoPaquete = () =>{
    swal({
        title: "¡Error!",
        text: "Se debe seleccionar el tipo de todos los paquetes.",
        icon: "error"
      })
      .then((accion) => {
        if (accion) {            
        }
    });
}