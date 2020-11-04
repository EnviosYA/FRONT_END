const URLBASECUENTA = 'https://localhost:44311/api/Cuenta';
const URLBASEUSUARIO = 'https://localhost:44312/api/Usuario';
const URLBASEENVIO = 'https://localhost:44313/api/';
const URLBASESUCURSAL = "https://localhost:44314/api/";

//ENVIO
const URLENVIO = URLBASEENVIO + "Envio";
const URLSUCURSALPORENVIO = URLBASEENVIO + "SucursalPorEnvio/";

const URLTIPOPAQUETE = URLBASEENVIO + "TipoPaquetes/";


//SUCURSAL
const URLDIRECCION = URLBASESUCURSAL + "direcciones/";

const URLLOCALIDAD = URLBASESUCURSAL + "localidades/";

const URLSUCURSAL = URLBASESUCURSAL + "sucursales/";

//CLASES
class Usuario {
    constructor(nombre,apellido, dni, fechaNac,cuenta, direccion){        
        this.nombre = nombre,
        this.apellido = apellido,
        this.dni = dni,
        this.fechaNac = fechaNac,
        this.cuenta = cuenta,        
        this.direccion = direccion
    }
}
class Direccion {
    constructor(latitud,longitud,calle,altura,idLocalidad){            
        this.latitud = latitud,
        this.longitud = longitud,
        this.calle =  calle,
        this.altura = altura,
        this.idLocalidad = idLocalidad
    }
}

class Cuenta {
    constructor(mail, password){
        this.mail = mail,
        this.password = password
    }
}

export {URLDIRECCION, URLLOCALIDAD, URLSUCURSAL, URLSUCURSALPORENVIO, URLTIPOPAQUETE, URLBASECUENTA, URLBASEUSUARIO, URLENVIO, Usuario, Direccion, Cuenta};