import{ Direccion, Envio, Paquete } from "../Constants/Constants.js";
import { localidadInvalida, obtenerIdLocalidad } from "../Utilities/UtLocalidad.js";
import {obtenerCoordenadas} from "../Services/MapsService.js";
import{ maquetarLocalidades } from "../Utilities/UtLocalidad.js";
import { separarJWT } from "../Utilities/UtJWT.js";
import { popupNoLogin } from "./AppPopups/AppPopupsNoLogin.js";
import { pascalCase } from "../Utilities/UtFormatos.js";
import { popupEliminarPaquete, popupErrorNoSeleccionoPaquete, popupLocalidadNoExistente } from "./AppPopups/AppPopupsEnvio.js"


let main = document.querySelector("main");

export const envio = (response) =>{    

    if (localStorage.getItem("token") != null){
        main.innerHTML = response;
        envioInterno();
    }
    else{
        popupNoLogin();
    }
}

const envioInterno = () => {
    maquetarLocalidades();
    maquetarMedidas();

    let agregarPaquete = document.getElementById("clonar");
    agregarPaquete.addEventListener("click", (e)=> {
        e.preventDefault();
        clonar();    
    });   
    maquetarCosto();    

    let crearEnvio = document.getElementById("form-Envio");
    crearEnvio.addEventListener("submit", (e)=> {
        e.preventDefault();
        if(localidadInvalida()){
            popupLocalidadNoExistente();
        }else{
            guardarEnvio();
        }
    });
}

const maquetarCosto = () =>{
    let calcularCosto = document.getElementById("calcular");
    calcularCosto.addEventListener("click", (e)=>{
        e.preventDefault();
        let costo = 0;
        let paquetes = document.querySelectorAll(".paquete");
        paquetes.forEach(paquete =>{
            let tipoPaquete = paquete.querySelector("#tipo").value;
            switch(tipoPaquete){
                case "":
                    popupErrorNoSeleccionoPaquete();
                    let span = document.getElementById("costo");
                    span.style.display = "none";
                    break;
                case "1":
                    costo += 600;
                    let peso = paquete.querySelector("#peso").value;
                    let costoPeso = calcularCostoPeso(peso);
                    costo += costoPeso;
                    break;
                case "2":
                    costo += 500;
                    break;
                case "3":
                    costo += 950;
                    break;
                case "4":
                    costo += 500;
                    break;
                case "5":
                    costo += 300;
                    break;
            }            
        })
        if(costo>0){
            let span = document.getElementById("costo");
            span.innerText = "$ " + costo;
            span.style.display = "block";
            setTimeout(() => {
                span.style.display = "none";
            }, 5000);
        }
    })
}

const calcularCostoPeso = (peso) =>{
    if (peso <= 0 || peso == undefined){
        return 0;
    }
    if (peso > 0 && peso < 15)
        return 200;
    else if (peso > 15 && peso < 30)
        return 500;
    else if (peso > 30 && peso < 45)
        return 700;
    else if (peso > 45 && peso < 60)
        return 900;
    else
        return 1200;
}

const maquetarMedidas = () =>{
    let selects = document.querySelectorAll("#tipo");
    selects.forEach(select =>{        
        select.addEventListener("change", (e)=>{
            e.preventDefault();      
            let divPaquete = select.parentNode;      
            let inputs = divPaquete.querySelectorAll(".medida");
            let cantInputs = inputs.length;
            if(select.value == 1){
                if(!cantInputs){
                    divPaquete.insertAdjacentHTML('beforeend', `
                    <input class="control medida" type="number" min="0.01" step="0.01" max="1000" placeholder="Peso (Kg)" id="peso" required>
                    <input class="control medida" type="number" min="0.01" step="0.01" max="1000" placeholder="Largo (M)" id="largo" required>
                    <input class="control medida" type="number" min="0.01" step="0.01" max="1000" placeholder="Ancho (M)" id="ancho" required>
                    <input class="control medida" type="number" min="0.01" step="0.01" max="1000" placeholder="Alto (M)" id="alto" required>
                    `)
                }                
            }
            else{
                if(cantInputs){
                   inputs.forEach(input =>{
                       divPaquete.removeChild(input);
                   })
                }
            }
        })
    })    
}

const clonar = () =>{
    let paquetes = document.querySelectorAll(".paquete");
    let cantPaquetes = paquetes.length + 1;
    if (cantPaquetes <= 5)
    {
        let divPaquetes = document.getElementById("paquetes");
        divPaquetes.insertAdjacentHTML('beforeend',`
        <div class="paquete">
            <h4 id="numeroPaquete" class="numeroPaquete">Paquete ${cantPaquetes}</h4>            
            <input type="button" value="Eliminar" class="button eliminarPaquete">
            <select class="control" name="Tipopaquete" id="tipo" required>
                <option>  --- Seleccione Tipo de Paquete ---  </option>
                <option value="1">Caja</option>
                <option value="2">Bolsin</option>
                <option value="3">Carta documento</option>
                <option value="4">Telegrama</option>
                <option value="5">Carta simple</option>
            </select>
            
        </div>
        `);
        maquetarMedidas();
        añadirEventoEliminarPaquete();
    }
    añadirEventoEliminarPaquete();
    cantPaquetes = paquetes.length + 1;
    if (cantPaquetes == 5){
        let btnAgregarPaquete = document.getElementById("clonar");
        btnAgregarPaquete.style.display = "none";
    }
}

const añadirEventoEliminarPaquete = () =>{
    let btnsEliminarPaquete = document.querySelectorAll(".eliminarPaquete");
    btnsEliminarPaquete.forEach(btn =>{
        let paquete = btn.parentNode;
        while(paquete.className != "paquete"){
            paquete = paquete.parentNode;
        }
        btn.addEventListener("click", (e)=>{                    
            popupEliminarPaquete(paquete);
        })
    })    
}

export const chequearCantPaquetes = () =>{
    let btnAgregarPaquete = document.getElementById("clonar");
    let cantPaquetes = document.querySelectorAll(".paquete").length;
    if(cantPaquetes < 5 && btnAgregarPaquete){
        btnAgregarPaquete.style.display = "block";
    }
}

export const reacomodarNumeroPaquetes = () =>{
    let paquetes = document.querySelectorAll("#numeroPaquete");
    for (let i = 0; i < paquetes.length; i++) {
        paquetes[i].innerText = "Paquete " + (i+2);       
    }
}

export const guardarEnvio = () => {
    let idUsuario = parseInt(separarJWT(localStorage.getItem("token")).IdUser);
    let calle = document.getElementById("calle").value;
    let altura = parseInt(document.getElementById("altura").value);
    let localidad = document.getElementById("localidad").value;
    let idLocalidad = obtenerIdLocalidad();
    let paquetes = guardarPaquetes();

    let direccionDestino = new Direccion(calle, altura,idLocalidad);
    direccionDestino.localidad = localidad;
    let envio = new Envio(idUsuario, direccionDestino, paquetes);
    obtenerCoordenadas("calle " + calle +" "+ altura +" " + localidad , envio,2);
}

const guardarPaquetes = () =>{
    let divPaquetes = document.querySelectorAll(".paquete");
    let paquetes = [];
    divPaquetes.forEach(paquete => {
        let divDatos = paquete.querySelectorAll(".control");
        let arrayPaquete = [];
        divDatos.forEach(dato=>{
            arrayPaquete.push(dato.value);
        });    
        let paqueteConcreto = new Paquete(parseInt(arrayPaquete[0]));
        switch(paqueteConcreto.idTipoPaquete){
            case 1:
                paqueteConcreto.tipoPaquete = "Caja";                
                paqueteConcreto.peso = parseInt(arrayPaquete[1]);
                paqueteConcreto.largo = parseInt(arrayPaquete[2]);
                paqueteConcreto.ancho = parseInt(arrayPaquete[3]);
                paqueteConcreto.alto = parseInt(arrayPaquete[4]);
                break;
            case 2:
                paqueteConcreto.tipoPaquete = "Bolsin";
                break;
            case 3:
                paqueteConcreto.tipoPaquete = "Carta documento";
                break;
            case 4:
                paqueteConcreto.tipoPaquete = "Telegrama";
                break;
            case 5:
                paqueteConcreto.tipoPaquete = "Carta simple";
                break;            
        }
        paquetes.push(paqueteConcreto);
    });
    return paquetes;
}

export const Comprobante = (entity,responseEnvio) =>{
    let main = document.querySelector("main");
    main.innerHTML="";

    let infoEnvio = {
        paquetesEnvio: ""
    }  

    let cantPaquetes = 1;             
    entity.paquetes.forEach(paquete =>{                    
        infoEnvio.paquetesEnvio += "Articulo " + cantPaquetes + ", Tipo de paquete: " + paquete.tipoPaquete + " ";
        if(paquete.tipoPaquete == "Caja"){
            infoEnvio.paquetesEnvio += "Detalle: Peso: " + paquete.peso + "kg, " + "Largo " +  paquete.largo + "m, " + "Ancho " + paquete.ancho + "m, " + "Alto: " + paquete.alto + "m";
        }
        cantPaquetes++;
    })
    let info = infoEnvio.paquetesEnvio;

    let instrucciones = document.createElement("div");
    instrucciones.id="instrucciones";
    let instruccionesTexto = document.createTextNode("Puede descargar este comprobante y pegarlo en el frente de tu encomienda");
    instrucciones.appendChild(instruccionesTexto);

    let contenedorBoton = document.createElement("div");
    contenedorBoton.id = "contBtn";

    const btnImprimir = document.createElement('button');
    btnImprimir.type = 'button';
    btnImprimir.className = "button";
    btnImprimir.id ="button1";
    btnImprimir.innerText = 'Descargar Comprobante';
    contenedorBoton.appendChild(btnImprimir);

    const btnSalir = document.createElement('button');
    btnSalir.type = 'button';
    btnSalir.className = "button";
    btnSalir.id ="button2";
    btnSalir.innerText = 'Volver al home';
    contenedorBoton.appendChild(btnSalir);

    let paginaPDF = document.createElement("div");
    paginaPDF.id = "paginaPDF";
    
    let cabaceraPDF = document.createElement("div");
    cabaceraPDF.id="cabaceraPDF";
    
    let titulo = document.createElement("div");
    titulo.id = "tituloCuerpo"
    let envioYA = document.createTextNode("EnviosYA");
    titulo.appendChild(envioYA);
    cabaceraPDF.appendChild(titulo);

    let lema = document.createElement("div");
    lema.id = "lema"
    let lemaEnvioYA = document.createTextNode("La tranquilidad de saber donde esta tu envio");
    lema.appendChild(lemaEnvioYA);
    cabaceraPDF.appendChild(lema);

    let Datos = localStorage.getItem("token");
    let tokenObject = separarJWT(Datos);
    let Remitente = document.createElement("div");
    Remitente.id = "Remitente"
    Remitente.innerHTML+=
    `
    <h3>Datos del remitente</h3><br>
    Numero de envio ${responseEnvio.id}<br>
    Nombre y apellido: ${pascalCase(tokenObject.Name)} ${pascalCase(tokenObject.LastName)}<br>
    <h3>Datos del destinatario</h3><br>
    Destino: ${entity.direccionDestino.calle} ${entity.direccionDestino.altura} ${entity.direccionDestino.localidad}<br>
    Descripcion: ${info}
`;
    let codigoQR = document.createElement("div");
    codigoQR.id="codigoQR";
    
    let contenedorCabecera = document.createElement("div");
    contenedorCabecera.id = "contenedorCabecera";
    contenedorCabecera.appendChild(codigoQR);
    contenedorCabecera.appendChild(cabaceraPDF);
    paginaPDF.appendChild(contenedorCabecera);
    paginaPDF.appendChild(Remitente);
    
    main.appendChild(instrucciones);
    
    main.appendChild(paginaPDF);

    main.appendChild(contenedorBoton);
}

