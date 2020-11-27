import { headerLogueado } from "../AppHeader.js"
import { toHome } from "../../Utilities/UtAjax.js"

export const popupCerrarSesion = (nav,ancla) =>{    
    swal({
        title: "¿Desea cerrar sesión?",
        buttons: ["Cancelar", "Aceptar"],
        icon: "warning"        
        })
        .then((accion) => {
        if (accion) {
            localStorage.removeItem("token");
            nav.removeChild(ancla);
            headerLogueado(undefined);
            toHome();
        }
    });
}