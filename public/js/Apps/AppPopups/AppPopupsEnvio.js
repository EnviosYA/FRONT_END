import { toPage } from "../../Utilities/UtAjax.js";

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