
import { getEnvioById } from "../Services/EnvioService.js";
import { popupErrorAlPublicarEstado, popupErrorIdEnvio, popupEstadoExitoso, popupConfirmarPublicarEstado } from "./AppPopups/AppPopupsAdmin.js";
import getSucursalPorEnvio, { postSucursalPorEnvio } from "../Services/SeguimientoService.js"
import { toPage } from "../Utilities/UtAjax.js";

export const admin = () =>{
  lectorQRAdmin();
  ingresoManual();
}

const lectorQRAdmin = () =>{
  $('#reader').html5_qrcode(async function (nroEnvio){ // función de lectura Ok
    if(await noExisteEnvio(nroEnvio)){
      popupErrorIdEnvio("El QR escaneado es incorrecto.");
    }else{
      maquetarAdmin(nroEnvio);        
    }
    $('#reader').html5_qrcode_stop();
    return;
  },
  function(error){ 
    //popupErrorIdEnvio(error);
  }, function(videoError){ // función si falla la utilización de la camara.
    
  });
}

const maquetarEstadoActual = async (nroEnvio) =>{
  let estados = await getSucursalPorEnvio(nroEnvio);
  let estadoActual = estados.pop();  
  let QR = document.querySelector('.QR');
  let divEstadoActual = document.createElement("div");
  divEstadoActual.id = "estadoActual";

  let ms = Date.parse(estadoActual.fecha);
  let fecha = new Date(ms);
  divEstadoActual.innerHTML +=
  `
    <h2 id= "estadoActual-titulo">Estado actual</h2>
    <h4 id="estadoActual-sucursal">${estadoActual.nombre.split("EnvioYa")[1]}</h4>
    <li id="estadoActual-fecha">${estadoActual.estado}: ${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getUTCFullYear()}</li>        
  `;

  QR.appendChild(divEstadoActual);
}

const ingresoManual = () =>{
  let formAdmin = document.getElementById('form-Admin');
  formAdmin.addEventListener('submit', async (e) =>{
    e.preventDefault();
    let nroEnvio = document.getElementById("nro-Envio").value;
    if (await noExisteEnvio(nroEnvio)){
      popupErrorIdEnvio("El número de envio no existe.");
    }else{
      maquetarAdmin(nroEnvio);
    }
  });
}

const noExisteEnvio = async (nroEnvio) =>{
  const envio = await getEnvioById(nroEnvio);
  return envio.status == 400;
}

const maquetarAdmin = (nroEnvio) =>{  
  maquetarEstadoActual(nroEnvio);
  maquetarActualizacionEstado(nroEnvio);  
}

const maquetarActualizacionEstado = (nroEnvio) =>{
  let QR = document.querySelector('.QR');
  QR.removeChild(document.getElementById("form-Admin"));
  let titulo = document.getElementById("tituloAdmin");

  titulo.innerText = "Modificando el estado del envío " + nroEnvio;
  let estadoEnvio = document.createElement("DIV");
  estadoEnvio.id = "estadoEnvio";
  estadoEnvio.innerHTML +=
  `
    <form action="" class="formulario" id="form-Estado">        
      <h2>Actualizar estado</h2>
      <select class="control" id="sucursal">
        <option value="1" selected>Retiro</option>
        <option value="2">Monserrat</option>
        <option value="3">Florencio Varela</option>
        <option value="4">Quilmes</option>
      </select>
      <select class="control" id="estado">
        <option value="1" selected>Ingreso a la sucursal</option>
        <option value="2">En proceso</option>
        <option value="3">Despachado</option>
        <option value="4">En viaje al domicilio del destinatiario</option>
        <option value="5">Entregado</option>
      </select>
      <input id="publicar" type="submit" class="button" value="Actualizar">
      <input id="cancelar-estado" type="button" class="button" value="Cancelar">
    </form>       
  `
  QR.appendChild(estadoEnvio);
  publicarEstado(nroEnvio);
  cancelar(); 
}

const publicarEstado = (nroEnvio) =>{
  let formEstado = document.getElementById("form-Estado");
  formEstado.addEventListener("submit", async (e) =>{    
    e.preventDefault();
    let inputSucursal = document.getElementById("sucursal");
    let inputEstado = document.getElementById("estado");
    let nuevoEstado = "Sucursal: " + inputSucursal.options[inputSucursal.selectedIndex].text + "\n" + "Estado: " + inputEstado.options[inputEstado.selectedIndex].text;
    popupConfirmarPublicarEstado(nuevoEstado,nroEnvio);    
  })
}

const cancelar = () =>{
  let cancelar = document.getElementById("cancelar-estado");
  cancelar.addEventListener("click", ()=>{
    location.hash = "";
    toPage("admin.html");
  })
}