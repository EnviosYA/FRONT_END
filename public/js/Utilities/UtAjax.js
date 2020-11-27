import { pascalCase } from "./UtFormatos.js";

export const ajax  = (metodo, url, callback) =>{
  let xhr = new XMLHttpRequest();
  xhr.open(metodo, url);
  xhr.addEventListener("progress", (e) => {
    console.log("Descargando...");
  });
  xhr.addEventListener("load", () => {
    if (xhr.status == 200) {
      callback(xhr.response);
    }
  });
  xhr.send();
};
 
export const recorrerLinks = () =>{
  let links = document.querySelectorAll(".links");  
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      location.hash = link.getAttribute("data-hash");
    })
  })
}

export const toHome = () =>{
  let main = document.querySelector("main");
  ajax("get", "home.html", (response) =>{
    main.innerHTML = response;
    recorrerLinks();
  })  
}

export const toPage = (url) =>{
  let pagina = url.split(".")[0];
  let page = pascalCase(pagina);
  location.hash = page;
}