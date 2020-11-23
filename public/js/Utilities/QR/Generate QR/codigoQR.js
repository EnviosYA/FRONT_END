export const codeQR=(texto)=>{    
        let miCodigoQR = new QRCode("codigoQR");
        $("#descargarCodigo").css("display","inline-block");
        miCodigoQR.makeCode(texto);
    $("#descargarCodigo").on("click",function(){
        var base64 = $("#codigoQR img").attr('src');
        $("#descargarCodigo").attr('href', base64);
        $("#descargarCodigo").attr('download', "codigoQR");
        $("#descargarCodigo").trigger("click");
    });};
