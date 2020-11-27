import {ajax, toHome, toPage} from "../../Utilities/UtAjax.js";

export const popupNoLogin = () => {
    swal({
        title: "No ha iniciado sesión",
        text: "¡Para realizar un envío debe iniciar sesión!",
        icon: "warning",
        buttons: {
            cancel: "Cancelar",
            catch: {
                text: "Registrarse",
                value: "catch",
            },
            defeat: "Iniciar sesión",
        },
      })
      .then((accion) => {
          switch (accion){
            case "defeat":
                toPage("login.html"); 
                break;
            case "catch":
                toPage("registrarse.html");
              break;
            default:        
              toPage("home.html");
              break;
          }
     });
}