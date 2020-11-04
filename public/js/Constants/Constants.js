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
    constructor(mail,contraseña,nombre,apellido,fechaNac,latitud,longitud,calle,altura,idLocalidad){
        this.mail = mail,
        this.contraseña = contraseña,
        this.nombre = nombre,
        this.apellido = apellido,
        this.fechaNac = fechaNac,        
        this.latitud = latitud,
        this.longitud = longitud,
        this.calle =  calle,
        this.altura = altura,
        this.idLocalidad = idLocalidad
    }
}

export {URLDIRECCION, URLLOCALIDAD, URLSUCURSAL, URLSUCURSALPORENVIO, URLTIPOPAQUETE, URLBASECUENTA, URLBASEUSUARIO, URLENVIO,  Usuario};