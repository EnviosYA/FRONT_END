import { toHome, toPage } from "../../Utilities/UtAjax.js";
import { imprimirPDF } from "../imprimirPDF.js";
import { codeQR } from "../../Utilities/QR/Generate QR/codigoQR.js";
import { separarJWT } from '../../Utilities/UtJWT.js';
import { pascalCase } from '../../Utilities/UtFormatos.js';

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

let Comprobante = (entity,responseEnvio) =>{
    let main = document.querySelector("main");
    main.innerHTML="";

    let infoEnvio = {
        paquetesEnvio: ""
    }  

    let cantPaquetes = 1;             
    entity.paquetes.forEach(paquete =>{                    
        infoEnvio.paquetesEnvio += "Articulo " + cantPaquetes + ", Tipo de paquete: " + paquete.tipoPaquete + " ";
        if(paquete.tipoPaquete == "Caja"){
            infoEnvio.paquetesEnvio += "Detalle: Peso: " + paquete.peso + "kg, " + "Largo " +  paquete.largo + "m, " + "Ancho " + paquete.ancho + "m, " + "Alto: " + paquete.alto + "m";
        }
        cantPaquetes++;
    })
    let info = infoEnvio.paquetesEnvio;

    let instrucciones = document.createElement("div");
    instrucciones.id="instrucciones";
    let instruccionesTexto = document.createTextNode("Puede descargar este comprobante y pegarlo en el frente de tu encomienda");
    instrucciones.appendChild(instruccionesTexto);

    let contenedorBoton = document.createElement("div");
    contenedorBoton.id = "contBtn";

    const btnImprimir = document.createElement('button');
    btnImprimir.type = 'button';
    btnImprimir.className = "button";
    btnImprimir.id ="button1";
    btnImprimir.innerText = 'Descargar Comprobante';
    contenedorBoton.appendChild(btnImprimir);

    const btnSalir = document.createElement('button');
    btnSalir.type = 'button';
    btnSalir.className = "button";
    btnSalir.id ="button2";
    btnSalir.innerText = 'Volver al home';
    contenedorBoton.appendChild(btnSalir);

    let paginaPDF = document.createElement("div");
    paginaPDF.id = "paginaPDF";
    
    let cabaceraPDF = document.createElement("div");
    cabaceraPDF.id="cabaceraPDF";
    
    let titulo = document.createElement("div");
    titulo.id = "tituloCuerpo"
    let envioYA = document.createTextNode("EnviosYA");
    titulo.appendChild(envioYA);
    cabaceraPDF.appendChild(titulo);

    let lema = document.createElement("div");
    lema.id = "lema"
    let lemaEnvioYA = document.createTextNode("La tranquilidad de saber donde esta tu envio");
    lema.appendChild(lemaEnvioYA);
    cabaceraPDF.appendChild(lema);

    let Datos = localStorage.getItem("token");
    let tokenObject = separarJWT(Datos);
    let Remitente = document.createElement("div");
    Remitente.id = "Remitente"
    Remitente.innerHTML+=
    `
    <h3>Datos del remitente</h3><br>
    Numero de envio ${responseEnvio.id}<br>
    Nombre y apellido: ${pascalCase(tokenObject.Name)} ${pascalCase(tokenObject.LastName)}<br>
    <h3>Datos del destinatario</h3><br>
    Destino: ${entity.direccionDestino.calle} ${entity.direccionDestino.altura} ${entity.direccionDestino.localidad}<br>
    Descripcion: ${info}
`;
    let codigoQR = document.createElement("div");
    codigoQR.id="codigoQR";
    
    let contenedorCabecera = document.createElement("div");
    contenedorCabecera.id = "contenedorCabecera";
    contenedorCabecera.appendChild(codigoQR);
    contenedorCabecera.appendChild(cabaceraPDF);
    paginaPDF.appendChild(contenedorCabecera);
    paginaPDF.appendChild(Remitente);
    
    main.appendChild(instrucciones);
    
    main.appendChild(paginaPDF);

    main.appendChild(contenedorBoton);
}

