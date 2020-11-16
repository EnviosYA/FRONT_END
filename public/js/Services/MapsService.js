import { Coordenada } from "../Constants/Constants.js";
import {postUsuario} from "../Services/UsuarioService.js";

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

export const obtenerCoordenadas = (address, usuario) => {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': address
    }, function (results,status){
        if (status == google.maps.GeocoderStatus.OK) {            
            usuario.direccion.lat = results[0].geometry.location.lat();
            usuario.direccion.lng = results[0].geometry.location.lng();    
            console.log(usuario);
            //postUsuario(usuario);
        }
        else{
            alert('Geocode no tuvo éxito por la siguiente razón: ' + status)
        }
    }    
    );
    return coord;
}