const URLBASECUENTA = 'https://localhost:44311/api/Cuenta';
const URLBASEUSUARIO = 'https://localhost:44312/api/';
const URLBASEENVIO = 'https://localhost:44313/api/';
const URLBASESUCURSAL = "https://localhost:44314/api/";

//ENVIO
const ENVIO = URLBASEENVIO + "Envio";
const SUCURSALPORENVIO = URLBASEENVIO + "SucursalPorEnvio/";

const TIPOPAQUETE = URLBASEENVIO + "TipoPaquetes";


//SUCURSAL
const DIRECCION = URLBASESUCURSAL + "direcciones";

const LOCALIDAD = URLBASESUCURSAL + "localidades";

const SUCURSAL = URLBASESUCURSAL + "sucursales";

export {DIRECCION, LOCALIDAD, SUCURSAL, SUCURSALPORENVIO, TIPOPAQUETE, URLBASECUENTA, URLBASEUSUARIO, ENVIO};