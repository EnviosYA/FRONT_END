const URLBASECUENTA = 'https://localhost:44311/api/Cuenta';
const URLBASEUSUARIO = 'https://localhost:44312/api/Usuario';
const URLBASEENVIO = 'https://localhost:44313/api/';
const URLBASESUCURSAL = "https://localhost:44314/api/";

//CUENTA
const LOGIN = URLBASECUENTA + "/Login";

//ENVIO
const URLENVIO = URLBASEENVIO + "Envio";
const URLSUCURSALPORENVIO = URLBASEENVIO + "SucursalPorEnvio/";

const URLTIPOPAQUETE = URLBASEENVIO + "TipoPaquetes/";


//SUCURSAL
const URLDIRECCION = URLBASESUCURSAL + "direcciones/";

const URLLOCALIDAD = URLBASESUCURSAL + "localidades/";

const URLSUCURSALESHABILITADAS = URLBASESUCURSAL + "sucursales?IdEstado=1";

//CLASES
class Usuario {
    constructor(nombre,apellido, dni, fechaNac,cuenta, direccion){        
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.fechaNac = fechaNac;
        this.cuenta = cuenta;    
        this.direccion = direccion;
    }
}
class Direccion {
    constructor(calle,altura,idLocalidad){
        this.latitud= 0;
        this.longitud = 0;
        this.calle =  calle;
        this.altura = altura;
        this.idLocalidad = idLocalidad
        this.localidad = null;
    }
}

class Cuenta {
    constructor(email, password){
        this.email = email;
        this.password = password;
    }
}

class Envio {
    constructor(idUsuario, direccionDestino, paquetes){
        this.idUsuario = idUsuario;
        this.direccionDestino = direccionDestino;
        this.paquetes = paquetes;
    }
}

class Paquete{
    constructor(idTipoPaquete){        
        this.idTipoPaquete = idTipoPaquete;
        this.peso = 0;
        this.largo = 0;
        this.ancho = 0;
        this.alto = 0;
        this.tipoPaquete = null;
    }
}
class Coordenada{
    constructor(latitud,longitud){
        this.lat = latitud;
        this.lng = longitud;
    }
}
class SucursalPorEnvio{
    constructor(idEnvio,idSucursal,idEstado){
        this.idEnvio = idEnvio;
        this.idSucursal = idSucursal;
        this.idEstado = idEstado;
    }
}
export {LOGIN,URLDIRECCION, URLLOCALIDAD, URLSUCURSALESHABILITADAS, URLSUCURSALPORENVIO, URLTIPOPAQUETE, 
        URLBASECUENTA, URLBASEUSUARIO, URLENVIO, Coordenada, Usuario, Direccion, Cuenta, Envio, Paquete, SucursalPorEnvio};