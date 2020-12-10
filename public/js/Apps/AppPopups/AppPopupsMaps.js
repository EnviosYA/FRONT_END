import { toHome, toPage } from "../../Utilities/UtAjax.js";
import { imprimirPDF } from "../imprimirPDF.js";
import { codeQR } from "../../Utilities/UtQR.js";
import { Comprobante } from "../AppEnvio.js";

export const popupErrorDireccion = () =>{
    swal({
        title: "La dirección ingresada no existe, o no pudo ser resuelta",
        text: "Inténtelo más tarde. En caso de continuar el inconveniente, por favor contáctenos para poder ayudarlo.",
        buttons: ["Contáctanos", "Aceptar"],
        icon: "error"
      })
      .then((accion) => {
        if (accion) {
            let url = location.hash + ".html";
            toPage(url);
        }
        else{
            window.location.href = "mailto:enviosya@enviosya.org";
            toPage("home.html");
        }
     });
}

export const popupRegistroCorrecto = () =>{
    swal({
        title: "¡Se registró correctamente!",
        text: "El próximo paso es iniciar sesión",
        buttons: ["Volver al inicio", "Aceptar"],
        icon: "success"
      })
      .then((accion) => {
        if (accion) {
            toPage("login.html");
        }
        else{
            toPage("home.html");
        }
     });
}

export const popupErrorRegistro = (responseUsuario) =>{
    swal({
        title: "Error al registrarse.",
        //text: responseUsuario.mensaje,
        text:  "Se ha producido un error intente más tarde",
        buttons: ["Volver al inicio", "Reintentar"],
        icon: "error"
      })
      .then((accion) => {
        if (accion) {
            toPage("registrarse.html");
        }
        else{
            toPage("home.html");
        }
     });
}

export const popupHistorialEnvio = () =>{

}

export const popupEnvioCorrecto = (entity,responseEnvio) =>{
    Comprobante(entity,responseEnvio);
    codeQR(responseEnvio.id);
    
    const botonImprimir = document.getElementById('button1');
    botonImprimir.addEventListener('click', function(){
        imprimirPDF();
    });

    const botonVolver = document.getElementById('button2');
    botonVolver.addEventListener('click', function(){
        toHome();
    });
}

export const popupErrorEnvio = (responseEnvio) =>{
    swal({
        title: "Ocurrió un error al crear su envío.",
        text: responseEnvio.mensaje,
        buttons: ["Volver al inicio", "Reintentar"],
        icon: "error"
      })
      .then((accion) => {
        if (accion) {
            toPage("envio.html");
        }
        else{
            toPage("home.html");
        }
     });
}