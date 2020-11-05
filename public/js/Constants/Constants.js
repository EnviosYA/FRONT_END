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
    constructor(latitud,longitud,calle,altura,idLocalidad){            
        this.latitud = latitud;
        this.longitud = longitud;
        this.calle =  calle;
        this.altura = altura;
        this.idLocalidad = idLocalidad;
    }
}

class Cuenta {
    constructor(mail, password){
        this.mail = mail;
        this.password = password;
    }
}

class Envio {
    constructor(idUsuario, direccion, paquetes){
        this.idUsuario = idUsuario;
        this.direccion = direccion;
        this.paquetes = paquetes;
    }
}

class Paquete{
    constructor(idTipoPaquete, peso, largo, ancho, alto){        
        this.peso = peso;
        this.largo = largo;
        this.ancho = ancho;
        this.alto = alto;
        this.idTipoPaquete = idTipoPaquete;
    }
}
export {URLDIRECCION, URLLOCALIDAD, URLSUCURSALESHABILITADAS, URLSUCURSALPORENVIO, URLTIPOPAQUETE, URLBASECUENTA, URLBASEUSUARIO, URLENVIO, Usuario, Direccion, Cuenta, Envio, Paquete};