const URLBASECUENTA = 'https://localhost:44311/api/Cuenta';
const URLBASEUSUARIO = 'https://localhost:44312/api/Usuario';
const URLBASEENVIO = 'https://localhost:44313/api/';
const URLBASESUCURSAL = "https://localhost:44314/api/";

//ENVIO
const URLENVIO = URLBASEENVIO + "Envio";
const URLSUCURSALPORENVIO = URLBASEENVIO + "SucursalPorEnvio/";

const URLTIPOPAQUETE = URLBASEENVIO + "TipoPaquetes";


//SUCURSAL
const URLDIRECCION = URLBASESUCURSAL + "direcciones";

const URLLOCALIDAD = URLBASESUCURSAL + "localidades";

const URLSUCURSAL = URLBASESUCURSAL + "sucursales";

export {URLDIRECCION, URLLOCALIDAD, URLSUCURSAL, URLSUCURSALPORENVIO, URLTIPOPAQUETE, URLBASECUENTA, URLBASEUSUARIO, URLENVIO};