import {pascalCase} from '../Utilities/UtFormatos.js'
import {separarJWT} from '../Utilities/UtJWT.js'
import {getUsuario} from '../Services/UsuarioService.js'
import {getDireccionByID} from '../Services/SucursalService.js'
import { getEnvioByIdUser } from '../Services/EnvioService.js'
import * as Service from "../Services/SeguimientoService.js";
import {popupHistorialEnvio} from "../Apps/AppPopups/AppPopupsMaps.js"
import {toPage} from "../Utilities/UtAjax.js"
import {imprimirPDF} from "../Apps/imprimirPDF.js"
import {codeQR} from '../Utilities/UtQR.js'

export const maquetarPerfil = async() =>{
    let token = localStorage.getItem("token");
    let result = separarJWT(token);
    let perfilDescription = document.querySelector(".perfil-description");
    let perfilNombre = document.querySelector(".perfil-name");
    let user = await getUsuario(result.IdUser);
    let direccion = await getDireccionByID(user[0].idDireccion);
    let envioPorUser = await getEnvioByIdUser(result.IdUser);
    let perfilHistorial = document.querySelector(".perfil-historial")
    perfilHistorial.innerHTML = "";
    perfilNombre.innerText = `${pascalCase(result.Name)} ${pascalCase(result.LastName)}`
    perfilDescription.innerText = `${result.Email}
                                    ${user[0].dni}
                                    ${user[0].fechaNac}
                                    ${pascalCase(direccion.calle)} ${direccion.altura}
                                    ${direccion.nombreLocalidad}, ${direccion.nombreProvincia}
                                    CP ${direccion.cpLocalidad}
                                    `;
    envioPorUser.forEach(async envio => {
        let data = await Service.default(envio.idEnvio);
        let div = document.createElement("div");
        let origen = document.createElement("div");
        let estado = document.createElement("div");
        let destino = document.createElement("div");
        origen.classList.add("historial-origen");
        estado.classList.add("historial-estado");
        destino.classList.add("historial-destino");
        origen.innerHTML = `
        <img  src="../Images/ubicacion.png" alt=""/>
        <h6>
        Origen
        </h6>
        <h3>
        ${pascalCase(direccion.calle)}
        ${direccion.altura}
        </h3>
        `        
        destino.innerHTML = `
        <img src="../Images/ubicacion.png" alt=""/>
        <h6>
        Destino
        </h6>
        <h3>
        ${envio.calle}
        ${envio.altura}
        </h3>
        `
        div.classList.add("perfil-historial-envio")
        if(data.length == 0){
            estado.innerHTML = `
            <h3>Te estamos esperando!</h3> 
            <img src="../Images/alerta.png" alt=""/>
            <h6>Envio N°: ${envio.idEnvio}</h6>
            `
            div.classList.add("red")
         }else{

             if(data[data.length-1].estado == "Entregado"){                
                 estado.innerHTML = `
                 <h3>${data[data.length-1].estado}</h3> 
                 <img src="../Images/check.png" alt=""/>
                 <h6>Envio N°: ${envio.idEnvio}</h6>
                 `
                 div.classList.add("green")
                }else{
                    estado.innerHTML = `
                    <h3>En curso</h3>
                    <h5>${data[data.length-1].nombre.split('EnvioYa')[1]}</h5> 
                    <img src="../Images/camion2.png" alt=""/>
                    <h6>Envio N°: ${envio.idEnvio}</h6>
                    `
                    div.classList.add("yellow")            
                }                
            }
        
        div.append(origen,estado,destino);
        div.addEventListener("click",()=>{
            popupHistorialEnvio(envio);
            codeQR(envio.idEnvio);
            const botonImprimir = document.getElementById('button1');
                botonImprimir.addEventListener('click', function(){
                imprimirPDF();
            });

            const botonVolver = document.getElementById('button2');
                botonVolver.addEventListener('click', function(){
                location.hash = "";
                toPage('perfil.html');
            });
        })
        perfilHistorial.appendChild(div);
    })    
}