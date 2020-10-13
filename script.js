let links = document.querySelectorAll(".links");
let main = document.querySelector("main");

links.forEach( link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        location.hash = e.target.dataset.hash;
    })
})

if(location.hash){
    let url = location.hash.split("#")[1] + ".html";
    ajax("get",url);
}

window.addEventListener("hashchange", () => {
    let url = location.hash.split("#")[1] + ".html";
    console.log(url);
    ajax("get", url, (response) => {
        main.innerHTML = response;
      });
});

function ajax(metodo, url, callback) {
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
  
window.onscroll = function(){fixed()};
let header = document.getElementById("myHeader");
let sticky = header.offsetTop;
function fixed(){
    if(window.pageYOffset > sticky){
        header.classList.add("sticky");
    }else{
        header.classList.remove("sticky");
    }
}