import { SUCURSALPORENVIO } from "../Constants/Constants.js";

const getSucursalPorEnvio = (id) => {
    let url = SUCURSALPORENVIO + id;

    return fetch(url)
            .then(data => data.json())
            .then(seguimiento => {
                return seguimiento
            })
            .catch(err => console.log("Error: " + err));
}

export default getSucursalPorEnvio;