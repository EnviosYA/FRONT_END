import { getLocalidades} from "../Services/SucursalService.js";

//Agrega las localidades como opción en el formulario dirección
export const maquetarLocalidades = () => {   
    let datalist = document.getElementById("localidades"); 
    getLocalidades().then(localidades => localidades.forEach(localidad => {
        datalist.innerHTML += `<option value="${localidad.nombre}" name = "${localidad.nombre}" id="${localidad.idLocalidad}"><option>`        
    }));
}

export const obtenerIdLocalidad = () =>{
    var listObj = document.getElementById("localidad");
    var datalist = document.getElementById(listObj.getAttribute("list"));
    if(datalist.options.namedItem(listObj.value) != null)
        return parseInt(datalist.options.namedItem(listObj.value).id);
}

export const localidadInvalida = () =>{
    let localidad = document.getElementById("localidad").value;
    
    let listaLocalidades = obtenerLocalidades();    
    if (listaLocalidades.indexOf(localidad) >= 0) {
        return false;    
    } else {    
        return true;    
    }
    

}

const obtenerLocalidades = () =>{
    let lista = document.getElementById("localidades");
    return Array.prototype.map.call(lista.options, function(option) {
        return option.value;
    });
}