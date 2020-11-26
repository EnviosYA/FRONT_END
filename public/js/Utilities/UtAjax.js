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
  
  links.forEach( link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      location.hash = e.target.dataset.hash;
    })
  })
}
  
export const toHome = () =>{
  let main =  document.querySelector("main");
  ajax("get", "home.html", (response) =>{
    main.innerHTML = response;
    location.hash = "Home";
    recorrerLinks();
  })
}