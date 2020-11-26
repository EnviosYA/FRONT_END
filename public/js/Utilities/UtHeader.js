import {separarJWT} from './UtJWT.js'
import {pascalCase} from './UtFormatos.js'

export const HeaderLogueado = (token) =>{
    let headerElement = document.getElementById("login-header");
    let tokenObject = separarJWT(token);
    console.log(tokenObject)
    headerElement.innerText = `${pascalCase(tokenObject.Name)} ${pascalCase(tokenObject.LastName)}`;
    headerElement.setAttribute("data-hash","Perfil");
    headerElement.href = "perfil.html"; 
    console.log(headerElement)
}