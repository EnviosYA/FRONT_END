export const pascalCase = (string) => {
    const minuscula = string.toLowerCase();
    return minuscula[0].toUpperCase() + minuscula.slice(1);
}

export const todasPrimerasMayusculas = (string) =>{
  let stringMinuscula = string.toLowerCase().split(" ");
  let palabraNormalizada = "";
  stringMinuscula.forEach(palabra => {
    palabraNormalizada += palabra[0].toUpperCase() + palabra.slice(1) + " ";
  });
  return palabraNormalizada;
}