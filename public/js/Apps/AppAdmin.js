import { SucursalPorEnvio } from "../Constants/Constants.js";
import { getEnvioById } from "../Services/EnvioService.js";
import { popupErrorAlPublicarEstado, popupErrorIdEnvio, popupEstadoExitoso } from "./AppPopups/AppPopupsAdmin.js";
import { postSucursalPorEnvio } from "../Services/SeguimientoService.js"

export const admin = () =>{
    lectorQR();

    let formAdmin = document.getElementById('form-Admin');
    formAdmin.addEventListener('submit', async (e) =>{
        e.preventDefault();
        let nroEnvio = document.getElementById("nro-Envio").value;
        const envio = await getEnvioById(nroEnvio);
        if (envio.codigo == 201){
          popupErrorIdEnvio(envio.mensaje);
        }else{
          swal ("¿Desea cambiar el estado de este envío?",
          {
            buttons : [ "¡Por el momento no!" , "¡Ver y cambiar estado del envío!" ] ,  
          })
          .then((e) => {
            if(e){            
              tracking(nroEnvio);
            }
          })
        }
        
    });
}
const lectorQR = () =>{
  $('#reader').html5_qrcode(function(data){ // función de lectura Ok
    tracking(data);
    $('#reader').html5_qrcode_stop();
    return;
  },
  function(error){ // función de mala lectura
  }, function(videoError){ // función si falla la utilización de la camara.
    alert("videoError");
  });
}

let tracking = (nroEnvio) =>{
  limpiarEstado();
  let QR = document.querySelector('.QR');
  let estadoEnvio = document.createElement("DIV");
  estadoEnvio.id = "estadoEnvio";
  estadoEnvio.innerHTML +=
  `
    El envio ${nroEnvio} se encuentra en la sucursal de
    <select id = "sucursal" name="menu1">
      <option value="1" selected>Retiro</option>
      <option value="2">Monserrat</option>
      <option value="3">Florencio Varela</option>
      <option value="4">Quilmes</option>
    </select>
    con un estado de
    <form name="form1" target="_blank">
      <select id = "estado" name="menu1">
        <option value="1" selected>Ingreso a la sucursal</option>
        <option value="2">En proceso</option>
        <option value="3">Despachado</option>
        <option value="4">En viaje al domicilio del destinatiario</option>
        <option value="5">Entregado</option>
      </select>
      <input id="publicar" type="button" value="Publicar estado">   
  `
  QR.appendChild(estadoEnvio);

  let button = document.getElementById("publicar");
  button.addEventListener("click", async () =>{    
    let idSucursal = parseInt(document.getElementById("sucursal").value);
    let idEstado = parseInt(document.getElementById("estado").value);
    let sucursalPorEnvio = new SucursalPorEnvio(parseInt(nroEnvio),idSucursal,idEstado);
    let responseSucPorEnvio = await postSucursalPorEnvio(sucursalPorEnvio);
    if (responseSucPorEnvio.codigo == 201){
      popupEstadoExitoso();
    }else{
      popupErrorAlPublicarEstado();
    }
  })
}

const limpiarEstado = () =>{
  let existeEstadoEnvio = document.getElementById("estadoEnvio");
  if(existeEstadoEnvio){
    document.querySelector(".QR").removeChild(existeEstadoEnvio);
  }
}