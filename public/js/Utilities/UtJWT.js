export const separarJWT = (token) =>{
    let partes = token.split(".");
    let payload = atob(partes[1]);
    let objeto = JSON.parse(payload);
    return objeto;
}