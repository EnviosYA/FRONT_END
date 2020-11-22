import { Coordenada } from "../Constants/Constants.js";
import {postUsuario} from "./UsuarioService.js";
import {postEnvio} from "./EnvioService.js";

export const crearMapaSucursales = (array) => {
    var centro = new Coordenada(-34.6077853705844,-58.43582278331235);
    var mapOptions = {
        zoom: 10,
        center: centro
    };

    var map = new google.maps.Map(document.getElementById('maps'), mapOptions);    
    array.forEach(coord => {
        new google.maps.Marker({
            position: coord,
            map: map,
        });   
    });
}

export const obtenerCoordenadas = (address, entity, opcion) => {    
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': address
    }, (results,status) =>{
        if (status == google.maps.GeocoderStatus.OK) { 
            setearCoordenadas(results,entity,opcion);
        }
        else{
            alert('Geocode no tuvo éxito por la siguiente razón: ' + status)
        }
    });

}

const setearCoordenadas = (results, entity, opcion) =>{
    switch(opcion){
        case 1:
            entity.direccion.latitud = results[0].geometry.location.lat();
            entity.direccion.longitud = results[0].geometry.location.lng();    
            console.log(entity);
            postUsuario(entity);
            break;
        case 2:
            entity.direccionDestino.latitud = results[0].geometry.location.lat();
            entity.direccionDestino.longitud = results[0].geometry.location.lng();    
            console.log(entity);
            postEnvio(entity);
            break;
    }
}