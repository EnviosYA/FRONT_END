/* Provisorio luego se va a añadir un token */
let autorizado = false;

let login = () =>
{
    swal({
        text: 'Debe loguearse para trabajar en este sector".',
        content: "input",
        button: {
          text: "Ingrese su contraseña",
          /* closeModal: false, */
        },
      })
      .then(name => {if (!name) throw null;
        return fetch(`https://itunes.apple.com/search?term=${name}&entity=movie`);
      })
      .then(results => {
        alert("Encontre tu pelicula");
        autorizado = true;
        return results.json();
      })
      .then(json => {
        const movie = json.results[0];
        if (!movie) {
          swal("No movie was found!");
          location.reload();
        }
       
        const name = movie.trackName;
        const imageURL = movie.artworkUrl100;
       
        swal({
          title: "Top result:",
          text: name,
          icon: imageURL,
        });
      })
      .catch(err => {
        if (err) {
          swal("Oh noes!", "The AJAX request failed!", "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
}

login();

$('#reader').html5_qrcode(function(data){ // función de lectura Ok
    alert(data);
    $('#reader').html5_qrcode_stop();},
function(error){ // función de mala lectura
}, function(videoError){ // función si falla la utilización de la camara.
    alert("videoError");});

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
            if(autorizado==true)
            {
                tracking(data);
            }
            else
            {
                login();
            }   
         }
     })
});

let btnRegistrarse = document.getElementById('registro');
btnRegistrarse.addEventListener('click', function(e){
    e.preventDefault();
    login();
});

let tracking = (data) =>{
   /*  alert("Estamos en la funcion"); */
    let main = document.getElementById('contMain');
    let estadoEnvio = document.createElement("DIV");
    estadoEnvio.id = "estadoEnvio";
    estadoEnvio.innerHTML+=
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
