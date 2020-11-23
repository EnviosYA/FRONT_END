$('#reader').html5_qrcode(function(data){ // función de lectura Ok
    alert(data);
    $('#reader').html5_qrcode_stop();},
function(error){ // función de mala lectura
}, function(videoError){ // función si falla la utilización de la camara.
    alert("videoError");});

let btnBuscarCodigo = document.getElementById('codigoManual');
btnBuscarCodigo.addEventListener('click', function(e){
    e.preventDefault();
    swal ("¿Desea realizar el tracking de este envio?",
    { 
        buttons : [ "¡Por el momento, no!" , "¡Realizar tracking!" ] ,  
     }).then((e) => {
         if(e)
         {
             tracking();
         }
     })
});

let tracking = () =>{
    swal({
        text: 'Indique el estado del envio".',
        content: "select",/* <option selected value="0"> Elige una opción </option>,
        <optgroup label="Microsoft"> 
        <option value="1">Windows Vista</option> 
        <option value="2">Windows 7</option> 
        <option value="3">Windows XP</option> 
    </optgroup> , */
        button: {
          text: "Search!",
          closeModal: false,
        },
      })
      .then(name => {
        if (!name) throw null;
       
        return fetch(`https://itunes.apple.com/search?term=${name}&entity=movie`);
      })
      .then(results => {
        return results.json();
      })
      .then(json => {
        const movie = json.results[0];
       
        if (!movie) {
          return swal("No movie was found!");
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