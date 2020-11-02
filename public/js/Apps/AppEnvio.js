let num = 1;
export const clonar = () =>{
    if (num < 5)
    {
        var c = document.getElementById("datos");
        var clon = c.cloneNode(true);
        var pkgs = document.getElementById("paquetes");
        var p = document.createElement("H4");
        num++;
        p.appendChild(document.createTextNode("Datos de paquete "+ num));
        console.log(p);
        pkgs.append(p, clon);
    }
}