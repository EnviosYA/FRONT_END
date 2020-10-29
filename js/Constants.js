const URLBASE = 'https://localhost:44311/api/';

const GETSUCURSALPORENVIO = URLBASE + 'SucursalPorEnvio/';

export default GETSUCURSALPORENVIO;

export class SucursalPorEnvio{
    constructor(idSucursal, estado, fecha){
        this.idSucursal = idSucursal,
        this.estado = estado,
        this.fecha = fecha
    }
}