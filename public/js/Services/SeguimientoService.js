import {SUCURSAL} from "../Constants/Constants.js";

const getSucursalPorEnvio = (id) => {
    let url = SUCURSAL + id;

    return fetch(url)
            .then(data => data.json())
            .then(seguimiento => {
                return seguimiento
            })
            .catch(err => console.log("Error: " + err));
}

export default getSucursalPorEnvio;