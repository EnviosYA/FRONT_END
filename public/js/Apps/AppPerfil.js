import {pascalCase} from '../Utilities/UtFormatos.js'
import {separarJWT} from '../Utilities/UtJWT.js'
import {getUsuario} from '../Services/UsuarioService.js'
import {getDireccionByID} from '../Services/SucursalService.js'
import { getEnvioByIdUser } from '../Services/EnvioService.js'
import * as Service from "../Services/SeguimientoService.js";

export const maquetarPerfil = async() =>{
    let token = localStorage.getItem("token");
    let result = separarJWT(token);
    let perfilDescription = document.querySelector(".perfil-description");
    let perfilNombre = document.querySelector(".perfil-name");
    let user = await getUsuario(result.IdUser);
    let direccion = await getDireccionByID(user[0].idDireccion);
    let envioPorUser = await getEnvioByIdUser(result.IdUser);
    let perfilHistorial = document.querySelector(".perfil-historial")
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
        console.log(data.length)
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
        if(data == 0){          
                console.log(data[0].estado)
                estado.innerHTML = `
                <h3>Te estamos esperando!</h3>
                <img src="../Images/camion2.png" alt=""/>
                `
                div.classList.add("red")        
        }else{
            if(data[data.length-1].estado == "Entregado"){
                estado.innerHTML = `
                <h3>${data[data.length-1].estado}</h3> 
                <img src="../Images/camion1.png" alt=""/>
                 `
                div.classList.add("green")
            }else if(data.length >=1){
                estado.innerHTML = `
                <h3>En curso</h3>
                <h5>${data[data.length-1].nombre.split('EnvioYa')[1]}</h5> 
                <img src="../Images/camion2.png" alt=""/>
                `
                div.classList.add("yellow")            
            }
        }

        
        div.append(origen,estado,destino);
        perfilHistorial.appendChild(div);
    })    
}