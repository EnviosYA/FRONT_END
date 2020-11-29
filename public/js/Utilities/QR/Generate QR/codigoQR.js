export const codeQR=(texto)=>{    
        let miCodigoQR = new QRCode("codigoQR");
        $("#descargarCodigo").css("display","inline-block");
        miCodigoQR.makeCode(texto);
        var base64 = $("#codigoQR img").attr('src');
        };
