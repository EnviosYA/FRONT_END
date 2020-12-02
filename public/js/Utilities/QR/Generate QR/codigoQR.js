export const codeQR=(texto)=>{ 
        let param = texto.toString();
        let miCodigoQR = new QRCode("codigoQR");
        $("#descargarCodigo").css("display","inline-block");
        miCodigoQR.makeCode(param);
        };
