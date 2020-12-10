export const popupHistorialEnvio = () =>{
    swal({
        title: "¿Descargar comprobante con detalles?",
        buttons: ["Cancelar", "Descargar comprobante"]
      })
      .then((accion) => {
        if (accion) {
            //Descargar comprobante
        }
     });
}