import { Coordenada } from "../Constants/Constants.js";
import {postUsuario} from "./UsuarioService.js";
import {postEnvio} from "./EnvioService.js";
import { toHome, toPage } from "../Utilities/UtAjax.js";

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
            swal({
                title: "La dirección ingresada no existe, o no pudo ser resuelta",
                text: "Inténtelo más tarde. En caso de continuar el inconveniente, por favor contáctenos para poder ayudarlo.",
                buttons: ["Contáctanos", "Aceptar"],
                icon: "error"
              })
              .then((accion) => {
                if (accion) {
                    toPage("registrarse.html");
                }
                else{
                    //Agregar opción de enviar mail, o maquetar pantalla de contacto
                }
             });
        }
    });
}

const setearCoordenadas = async(results, entity, opcion) =>{
    switch(opcion){
        case 1:
            entity.direccion.latitud = results[0].geometry.location.lat();
            entity.direccion.longitud = results[0].geometry.location.lng();
            const responseUsuario = await postUsuario(entity);
            if(responseUsuario.status){
                swal({
                    title: "¡Se registró correctamente!",
                    text: "El próximo paso es iniciar sesión",
                    buttons: ["Volver al inicio", "Aceptar"],
                    icon: "success"
                  })
                  .then((accion) => {
                    if (accion) {
                        toPage("login.html");
                    }
                    else{
                        toHome();
                    }
                 });
            }
            else{
                swal({
                    title: "Error al registrarse.",
                    //text: responseUsuario.mensaje,
                    text:  "Se ha producido un error intente más tarde",
                    buttons: ["Volver al inicio", "Reintentar"],
                    icon: "error"
                  })
                  .then((accion) => {
                    if (accion) {
                        toPage("registrarse.html");
                    }
                    else{
                        toHome();
                    }
                 });
            }            
            break;
        case 2:
            entity.direccionDestino.latitud = results[0].geometry.location.lat();
            entity.direccionDestino.longitud = results[0].geometry.location.lng();
            const responseEnvio = await postEnvio(entity);
            if(responseEnvio.codigo == 201){
                swal({
                    title: responseEnvio.mensaje,
                    text: "Su número de envío es: " + responseEnvio.id,
                    icon: "success"
                  })
                  .then((accion) => {
                    if (accion) {
                        toPage("perfil.html");
                    }
                 });
            }else{
                swal({
                    title: "Ocurrió un error al crear su envío.",
                    text: responseEnvio.mensaje,
                    buttons: ["Volver al inicio", "Reintentar"],
                    icon: "error"
                  })
                  .then((accion) => {
                    if (accion) {
                        toPage("envio.html");
                    }
                    else{
                        toHome();
                    }
                 });
            }
            break;
    }
}

export const crearMapaSeguimiento = (array) => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const waypts = [];

    const map = new google.maps.Map(document.getElementById("map-tracking"), {
        zoom: 10,
        center: { lat: -34.6077853705844, lng: -58.43582278331235 },
    });
    
    directionsRenderer.setMap(map);
    
    if(array.length == 1){
        array.forEach(coord => {
            new google.maps.Marker({
                position: coord,
                map: map,
            });
        });
    } else if(array.length == 2){
        directionsService.route(
            {
              origin: array[0],
              destination: array[1],
              optimizeWaypoints: true,
              travelMode: google.maps.TravelMode.DRIVING
            },
            (response, status) => {
                if(status === "OK") {
                    directionsRenderer.setDirections(response);
                    const route = response.routes[0];
                }
            }
        );
    } else if(array.length > 2){
        for(let i = 1; i < array.length-1; i++){
            waypts.push({
                location: array[i],
                stopover: true
            });
            console.log(waypts);
        }
        directionsService.route(
            {
              origin: array[0],
              destination: array[array.length-1],
              waypoints: waypts,
              optimizeWaypoints: true,
              travelMode: google.maps.TravelMode.DRIVING
            },
            (response, status) => {
                if(status === "OK") {
                    directionsRenderer.setDirections(response);
                    const route = response.routes[0];
                }
            }
        );
    }
}