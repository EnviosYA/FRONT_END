export const admin = () =>{
    $('#reader').html5_qrcode(function(data){ // función de lectura Ok
        alert(data);
        $('#reader').html5_qrcode_stop();},
    function(error){ // función de mala lectura
    }, function(videoError){ // función si falla la utilización de la camara.
        alert("videoError");
    });
    
    
    let btnBuscarCodigo = document.getElementById('codigoManual');
    btnBuscarCodigo.addEventListener('click', function(e){
        e.preventDefault();
        let data = "1234";
        swal ("¿Desea realizar el tracking de este envio? " +data,
        { 
            buttons : [ "¡Por el momento, no!" , "¡Realizar tracking!" ] ,  
         }).then((e) => {
             if(e)
             {
              tracking(data);
             }
         })
    });
}

let tracking = (data) =>{
   /*  alert("Estamos en la funcion"); */
    let main = document.querySelector('main');
    let estadoEnvio = document.createElement("DIV");
    estadoEnvio.id = "estadoEnvio";
    estadoEnvio.innerHTML +=
    `
    El envio ${data} se encuentra en la sucursal de ${"Florencio Varela"}
    con un estado de
    <form name="form1" target="_blank">
  <select name="menu1" onChange="MM_jumpMenu('parent',this,0)">
    <option value="Ingreso a la sucursal" selected>Ingreso a la sucursal</option>
    <option value="En proceso">En proceso</option>
    <option value="Despachado">Despachado</option>
    <option value="En viaje al domicilio del destinatiario">En viaje al domicilio del destinatiario</option>
    <option value="Entregado">Entregado</option>
  </select>
  <input type="button" value="Publicar estado" onclick="Publicar('${data}');">           
    `
    main.appendChild(estadoEnvio);
}
