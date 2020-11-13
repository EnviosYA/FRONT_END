import { Coordenada } from "../Constants/Constants.js";

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

export const obtenerCoordenadas = (address) => {
    var geocoder = new google.maps.Geocoder();
    let coord = new Coordenada();
    geocoder.geocode({
        'address': address
    }, function (results,status){
        if (status == google.maps.GeocoderStatus.OK) {            
            coord.lat = results[0].geometry.location.lat();
            coord.lng = results[0].geometry.location.lng();    
        }
        else{
            alert('Geocode no tuvo éxito por la siguiente razón: ' + status)
        }
    }    
    );
    return coord;
}