const URLJSON = "vender.json";
function guardarProductoEnLocalStorage (){
    $.getJSON( URLJSON,function(respuesta,estado){
        if(estado === "success"){
        let misproductos = respuesta.productos
        const guardarApiLocal = JSON.stringify(misproductos);
        localStorage.setItem("misproductos",guardarApiLocal);
        }

    })
} 
guardarProductoEnLocalStorage ();

let cafes= sessionStorage.getItem('cafes');
if (cafes == undefined){
    sessionStorage.setItem(`cafes`, JSON.stringify([]));
}

//const compras = [];
let id = 0;


let botonBrasil = document.getElementById("botonBrasil");
botonBrasil.onclick = () => {
    let arrayDeCompras = JSON.parse(sessionStorage.getItem(`cafes`));
    arrayDeCompras.push({ id: id++, nombre: "Café brasilero", precio: 1200 });  
    sessionStorage.setItem(`cafes`,  JSON.stringify(arrayDeCompras));
    mostrarListaDeCompras();
};

let botonColombia = document.getElementById("botonColombia");
botonColombia.onclick = () => {
    let arrayDeCompras = JSON.parse(sessionStorage.getItem(`cafes`));
    arrayDeCompras.push({ id: id++, nombre: "Café colombiano", precio: 1250 });
    sessionStorage.setItem(`cafes`, JSON.stringify(arrayDeCompras));
    mostrarListaDeCompras();
};
function mostrarListaDeCompras (){
    let verificar = document.getElementById("verificar");
    if(verificar != null){
        verificar.parentNode.removeChild(verificar);            
    }
    verificar = document.createElement("div");
    verificar.setAttribute("id", "verificar");
    for (const producto of JSON.parse(sessionStorage.getItem(`cafes`))) {
        let contenedor = document.createElement("div");
        contenedor.innerHTML = 
        `<p> ID: ${producto.id}</p>
        <p> Producto: ${producto.nombre}</p>
        <b> $ ${producto.precio}</b>`;
        verificar.appendChild(contenedor);
    }
    let listaDeCompras = document.getElementById ("listaDeCompras");
    listaDeCompras.appendChild(verificar);
}
/*const productos = [
{ id: 1, nombre: "Cafe colombiano", precio: 1250 },
{ id: 2, nombre: "Cafe brasilero", precio: 1200 },];
for (const producto of productos) {
 $("#tasas").append(`<div><h3> ID: ${producto.id}</h3>
 <p> Producto: ${producto.nombre}</p>
 <b> $ ${producto.precio}</b></div>`);
}*/

$(document).ready(function(){
    obtenerDatos();
});

function obtenerDatos(){
    $.get("https://api.sampleapis.com/coffee/hot").done(function(resultado,estado){
        if(estado == "success"){
            //Me devuleve el array directamente
            let datosRecibidos = resultado; 
            datosRecibidos.forEach(cafe => {
                if (cafe.title && cafe.description){
                    $("#cafes").append("<tr><td>"+cafe.title+"</td><td>"+cafe.description+"</td></td>")
                }
            })
        }
    })
}

/*let visibilidad = true;
$("#esconder").on('click', () => {
    //if ternario
    visibilidad ? $(".aRemover").css({ display: "none" }) : $(".aRemover").css({ display: "inline-block" });
    visibilidad = !visibilidad;
    console.log(visibilidad);
});*/

$(".wrapper").css("display" , "grid");

$("#esconder").css("justify-self" , "center");

//Cartas de cafe

const mostrar = miProducto => {
    $("#cafe").prepend(
    `<div class=" d-flex justify-content-around align-items-center  flex-row carta">
        <div class="card text-center venta">
            <img src="${miProducto.imagen}" class="card-img-top" alt="imagen de un paquete con café de Colombia">
            <h5 "card-title titulo-carta">${miProducto.nombre}</h5>
            <p "card-text texto-carta"> ${miProducto.origen}</p>
            <button botonProducto_${miProducto.id}>Agregar al Carrito</button>
        </div>
    </div>`
    );
//agregar evento
};
function crearCartas (objetoProductos){
    let cartas = document.getElementById("cafe");
    let cartasDivCartas = document.createElement("div");
    let cartasImagen = document.createElement("img");
    let cartasDivcuerpo =  document.createElement("div");
    let cartasTexto = document.createElement("h5");//innertexto
    let cartasParrafo = document.createElement("p");//innertexto
    let cartasBoton = document.createElement("button");//innertexto
    let botonRestar = document.createElement("button");
    cartasDivCartas.classList.add("card", "text-center", "venta");
    cartasImagen.classList.add("card-img-top");
    cartasDivcuerpo.classList.add("card-body");
    cartasTexto.classList.add("card-title", "titulo-carta");
    cartasParrafo.classList.add("card-text", "texto-carta");
    cartasBoton.classList.add("btn", "btn-primary");
    botonRestar.classList.add ("btn", "btn-danger"); //Boton de prueba para mostrar la función de restar
    cartas.appendChild(cartasDivCartas);
    cartasDivCartas.appendChild(cartasImagen);
    cartasDivCartas.appendChild(cartasDivcuerpo);
    cartasDivcuerpo.appendChild(cartasTexto);
    cartasDivcuerpo.appendChild(cartasParrafo);
    cartasDivcuerpo.appendChild(cartasBoton);
    cartasDivcuerpo.appendChild (botonRestar);
    cartasImagen.setAttribute("src", objetoProductos.imagen);
    cartasImagen.setAttribute("alt","imagen de café");
    cartasTexto.innerText = objetoProductos.nombre;
    cartasParrafo.innerText = objetoProductos.origen;
    cartasBoton.innerText = "agregar a carrito";
    botonRestar.innerText = "eliminar producto";
    cartasBoton.setAttribute("id", objetoProductos.id);
    botonRestar.setAttribute("id",objetoProductos.id);

    cartasBoton.addEventListener("click", eventoAgregarProducto)

    botonRestar.addEventListener ("click",eventoCorroborarProducto)

}
function eventoAgregarProducto (e) {
  for (const producto of arrayDeProductosParaVender){
      if (producto.id == e.target.id){
          console.log(producto.id);
          comprobarCarrito (producto);
      }
  }
}
let arrayDeProductosParaVender = JSON.parse(localStorage.getItem("misproductos"));
arrayDeProductosParaVender.forEach(crearCartas);

function comprobarCarrito (producto){
    if (localStorage.getItem("carritoDeCompras") == undefined){
        const carritoDeCompras= [];
        producto.cantidad = 1;
        carritoDeCompras.push(producto);
        localStorage.setItem("carritoDeCompras",JSON.stringify(carritoDeCompras));
    }else {
        let listaEnCarrito = JSON.parse(localStorage.getItem("carritoDeCompras"));
        let verificarExistencia = false;
        listaEnCarrito.forEach(function (productoDeLista, indice, array){
            if(producto.id == productoDeLista.id){
                productoDeLista.cantidad ++;
                listaEnCarrito[indice] = productoDeLista;
                verificarExistencia = true;
            }
        });
            if (!verificarExistencia){
                producto.cantidad = 1;
                listaEnCarrito.push(producto);
            }
        localStorage.setItem("carritoDeCompras",JSON.stringify(listaEnCarrito));
    }     
}

function eventoCorroborarProducto (e) {
    if (localStorage.getItem("carritoDeCompras") != undefined){
        const listaDeElementosElegidos = JSON.parse(localStorage.getItem("carritoDeCompras"));
        for (let i=0; i<listaDeElementosElegidos.length; i++){
            if (listaDeElementosElegidos[i].id == e.target.id){
                listaDeElementosElegidos[i].cantidad --
            }
        }
        const listaFiltrada = listaDeElementosElegidos.filter(objeto => objeto.cantidad > 0 );
        localStorage.setItem("carritoDeCompras",JSON.stringify(listaFiltrada));
        }
    }
    


//Función para hacer el click


/*let cartas = document.getElementById("cafe");
let cartasDivCartas = document.createElement("div");
let cartasImagen = document.createElement("img").classList.add("card-img-top");
let cartasDivcuerpo =  document.createElement("div").classList.add("card-body");
let cartasTexto = document.createElement("h5").classList.add("card-title", "titulo-carta");//innertexto
let cartasParrafo = document.createElement("p").classList.add("card-text", "texto-carta");//innertexto
let cartasBoton = document.createElement("button").classList.add("btn", "btn-primary");//innertexto
cartasDivCartas.classList.add("card", "text-center", "venta");*/

/*$.getJSON( URLJSON, function (respuesta, estado) {
    if(estado === "success"){
        let arrayDeProductos = respuesta.cartas;
        arrayDeProductos.forEach(crearCartas);
    }
});*/
   

    /*miProducto.forEach (mostrar() =>{}
    $("body").prepend(`<div>
        <img>${dato.imagen}
        <h3>${dato.nombre}</h3>
        <p> ${dato.origen}</p>
        </div>`)
) */



class CarritoDeCompras {
    constructor(){
        this.visibilidad = false;
    }
    mostrarCarrito () {
        document.getElementById("fondoCuadro").style.display = this.visibilidad ? "none" : "inline-block";
        this.visibilidad = ! this.visibilidad;
    }
}

let visibilidad = false;
let carritoDeCompras = new CarritoDeCompras();
let carrito = document.getElementById("cuadroCarrito");
carrito.addEventListener("click",carritoDeCompras.mostrarCarrito);

/*let carrito = document.getElementById("cuadroCarrito");
carrito.addEventListener("click",()=> {
    document.getElementById("fondoCuadro").style.display = visibilidad ? "none" : "inline-block";
    visibilidad = ! visibilidad;
});*/

/*Creo un Array de productos para guardarlos en loal storage  */
/*const productos = [
    {
        id:0, nombre: "CAFÉ GENUINO BOCNAT 232 X 1KG EN GRANO O MOLIDO", origen: "Brasil", precio: 2490, cantidad: 1
    },
    {
        id:1, nombre: "Café Bourbon Moka x 1Kg en grano o molido", origen: "Brasil", precio: 2400, cantidad: 1
    },
    {
        id:2, nombre: "CAFÉ OH! GUANES GENUINO X 1KG EN GRANO O MOLIDO", origen: "Colombia", precio: 2750, cantidad: 1
    },
    {
        id:3, nombre: "Café Excelso Descafeinado x 1Kg en grano o molido", origen: "Colombia", precio: 3220, cantidad: 1
    },
    {
        id:4, nombre: "Café De Especialidad Orgánico 1kg Grano O Molido", origen: "Etiopía", precio: 5240, cantidad: 1
    },
    {
        id:5, nombre: "Café de Especialidad Cristal x 1Kg en grano o molido", origen: "Guatemala", precio: 4250, cantidad: 1
    }
];

const productosGuardadosLocal = (clave,valor)=> { localStorage.setItem(clave, valor) };

for (const producto of productos){
    productosGuardadosLocal(producto.id, JSON.stringify(producto));
}*/


/*const usuario = { nombre: "nombre", apellido: "apellido", edad : 2, email : "info@gmail.com", domicilio: "Eva peron 1359"};

const usuarioGuardadoLocal = (clave,valor)=> { localStorage.setItem(clave, valor) };

usuarioGuardadoLocal ("listaUsuario",JSON.stringify(usuario));*/





