export const pascalCase = (string) => {
    const minuscula = string.toLowerCase();
    return minuscula[0].toUpperCase() + minuscula.slice(1);
  }