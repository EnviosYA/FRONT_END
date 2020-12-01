import {pascalCase} from '../Utilities/UtFormatos.js'
import {separarJWT} from '../Utilities/UtJWT.js'
import {getUsuario} from '../Services/UsuarioService.js'
import {getDireccionByID} from '../Services/SucursalService.js'
import {getEnvioPorUsuario} from '../Services/EnvioService.js'

export const maquetarPerfil = async() =>{
    let token = localStorage.getItem("token");
    let result = separarJWT(token);
    let perfilDescription = document.querySelector(".perfil-description");
    let perfilNombre = document.querySelector(".perfil-name");
    let user = await getUsuario(result.IdUser);
    let direccion = await getDireccionByID(user[0].idDireccion);
    let envioPorUser = await getEnvioPorUsuario(result.IdUser);
    perfilNombre.innerText = `${pascalCase(result.Name)} ${pascalCase(result.LastName)}`
    perfilDescription.innerText = `${result.Email}
                                    ${user[0].dni}
                                    ${user[0].fechaNac}
                                    ${pascalCase(direccion.calle)} ${direccion.altura}
                                    ${direccion.nombreLocalidad}, ${direccion.nombreProvincia}
                                    CP ${direccion.cpLocalidad}
                                    `
    console.log(direccion);
    console.log(envioPorUser);
    console.log(user);
    console.log(result);
    
}