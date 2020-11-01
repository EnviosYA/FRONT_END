import { URLSUCURSALPORENVIO } from "../Constants/Constants.js";
import { get, post} from "../Services/Requests.js";

const getSucursalPorEnvio = () => {
    return get(URLSUCURSALPORENVIO);
}

export default getSucursalPorEnvio;