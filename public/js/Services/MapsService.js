
export const crearMapaSucursales = (array) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZmF4YWxzb2wiLCJhIjoiY2toM24xbTZiMDNpeTJ6cWI1ZTlmaDgxZiJ9.tBaVmgkNIOiityXw_q6cLg';  
    var map = new mapboxgl.Map({ 
        container: "maps", 
        style: 'mapbox://styles/mapbox/streets-v9',  
        center: [-58.43582278331235,-34.6077853705844],
        zoom: 8
    }); 
    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    }));
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));
    
    array.forEach(coord => {
        new mapboxgl.Marker().setLngLat(coord).addTo(map);        
    });    
}