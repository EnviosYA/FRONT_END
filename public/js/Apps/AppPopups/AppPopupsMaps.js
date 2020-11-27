import { toHome, toPage } from "../../Utilities/UtAjax.js";

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
            //Agregar opción de enviar mail, o maquetar pantalla de contacto
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
            toHome();
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
            toHome();
        }
     });
}

export const popupEnvioCorrecto = (entity,responseEnvio) =>{
    let infoEnvio = {
        numeroEnvio: "Número de envío: " + responseEnvio.id,
        direccionEnvio: "\n Destino: " + entity.direccionDestino.calle + " " + entity.direccionDestino.altura + " " + entity.direccionDestino.localidad,
        paquetesEnvio: ""
    }  
    let cantPaquetes = 1;             
    entity.paquetes.forEach(paquete =>{                    
        infoEnvio.paquetesEnvio += "\n Paquete " + cantPaquetes + ": " + paquete.tipoPaquete + " ";
        if(paquete.tipoPaquete == "Caja"){
            infoEnvio.paquetesEnvio += paquete.peso + "kg " +  paquete.largo + "m " + paquete.ancho + "m " + paquete.alto + "m ";
        }
        cantPaquetes++;
    })
    let info = infoEnvio.numeroEnvio + infoEnvio.direccionEnvio + infoEnvio.paquetesEnvio;
    swal({
        title: responseEnvio.mensaje,
        text:  info,
        icon: "success"
      })
      .then((accion) => {
        if (accion) {
            toPage("perfil.html");
        }
     });
}

export const popupErrorEnvio = (responseEnvio) =>{
    console.log(responseEnvio);
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
            toHome();
        }
     });
}

