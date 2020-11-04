import { URLSUCURSALPORENVIO } from "../Constants/Constants.js";
import { get } from "../Services/Requests.js";

const getSucursalPorEnvio = (id) => {
    return get(URLSUCURSALPORENVIO + id);
}

export default getSucursalPorEnvio;