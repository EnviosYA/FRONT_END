export const separarJWT = (token) =>{
    let partes = token.split(".");
    let payload = atob(partes[1]);
    return JSON.parse(payload);
}