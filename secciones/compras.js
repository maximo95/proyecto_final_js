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
/*let id = 0;


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
}*/
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
    let cartasDivPrincipal = document.createElement("div");
    let cartasImagen = document.createElement("img");
    let cartasDivcuerpo =  document.createElement("div");
    let cartasTexto = document.createElement("h5");//innertexto
    let cartasParrafo = document.createElement("p");//innertexto
    let cartasBoton = document.createElement("button");//innertexto
    let botonRestar = document.createElement("button");
    cartasDivPrincipal.classList.add("card", "text-center", "venta","limites");
    cartasImagen.classList.add("card-img-top");
    cartasDivcuerpo.classList.add("card-body");
    cartasTexto.classList.add("card-title", "titulo-carta");
    cartasParrafo.classList.add("card-text", "texto-carta");
    cartasBoton.classList.add("btn", "btn-primary");
    botonRestar.classList.add ("btn", "btn-danger"); //Boton de prueba para mostrar la función de restar
    cartas.appendChild(cartasDivPrincipal);
    cartasDivPrincipal.appendChild(cartasImagen);
    cartasDivPrincipal.appendChild(cartasDivcuerpo);
    cartasDivcuerpo.appendChild(cartasTexto);
    cartasDivcuerpo.appendChild(cartasParrafo);
    cartasDivcuerpo.appendChild(cartasBoton);
    cartasDivcuerpo.appendChild (botonRestar);
    cartasImagen.setAttribute("src", objetoProductos.imagen);
    cartasImagen.setAttribute("alt","imagen de café");
    cartasTexto.innerText = objetoProductos.nombre;
    cartasParrafo.innerText = objetoProductos.origen;
    cartasBoton.innerText = "agregar carrito";
    botonRestar.innerText = "eliminar";
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
    mostrarCarrito (e) {
        document.getElementById("fondoCuadro").style.display = this.visibilidad ? "none" : "inline-block";
        this.visibilidad = ! this.visibilidad;
        console.log(this);
        this.crearItems();
        if (this.visibilidad == false){
            let separarDiv = document.getElementById("separarDiv");
            separarDiv.parentNode.removeChild(separarDiv);
            let divFinalizar = document.getElementById("divFinalizar");
            divFinalizar.parentNode.removeChild(divFinalizar);
        } else {
            //creo el boton de finalizar compra
            let botonFinalizarCompra =  document.createElement("button");//innertexto
            //le agrego un Id
            botonFinalizarCompra.setAttribute("id","botonAlerta");
            let divFinalizarCompra = document.createElement("div");
            divFinalizarCompra.setAttribute("id","divFinalizar");
            //Le agruego una class 
            divFinalizarCompra.classList.add("finalizarCompra");
            //Sector de finalizar compra
            divFinalizarCompra.appendChild(botonFinalizarCompra);
            //Le agrego un texto al boton
            botonFinalizarCompra.innerText = "finalizar compra";
            document.getElementById("fondoCuadro").appendChild(divFinalizarCompra);
            botonFinalizarCompra.addEventListener ("click", mostrarAlerta)
        }
    }
    crearItems(){
        if (localStorage.getItem("carritoDeCompras") != undefined){
            let listaProdElegidos = JSON.parse(localStorage.getItem("carritoDeCompras"));
            //Creo otro div para separar la parte de finalizar comprar y evitar que entre al forEach
            let flexCarritoDivision = document.createElement("div");
            //Creo una variable para llamar al elemento principal al cual appendear estos elementos
            let flexCarrito = document.getElementById ("fondoCuadro")
            //Le agrego un id al div que separa las secciones de compras
            flexCarritoDivision.setAttribute("id","separarDiv");
            //creo el sector de finalizar carrito
            flexCarrito.appendChild(flexCarritoDivision);
            listaProdElegidos.forEach(this.crearUnItem)
        }
    }
    //Creo una función que crea los items del carrito en el navbar
    crearUnItem(objetoItem){
        let flexCarrito = document.getElementById("separarDiv");
        let itemCarrito = document.createElement("div");
        let divImagenProducto = document.createElement("div");
        let imagenProducto = document.createElement("img");//poner src
        let nombrePrecioTotal = document.createElement("div");
        let nombreProducto = document.createElement("div");
        let nombre = document.createElement("p");//innertexto
        let precioTotalProducto = document.createElement("div");
        let precioIndividual = document.createElement("div");
        let precioUnProducto = document.createElement("p");//innertexto
        let precioCantidad = document.createElement("div");
        let precioDeCantidad = document.createElement("p");//innertexto
        let divUnidades = document.createElement("div");
        let botonRestarUnidades = document.createElement("button");//innertexto
        let numeroUnidades = document.createElement("p");//innertexto
        let botonSumarUnidades = document.createElement("button");//innertexto
        //Les agrego clases a los elementos creados
        itemCarrito.classList.add("itemCarrito");
        divImagenProducto.classList.add("imagen-producto");
        imagenProducto.classList.add("tamaño-imagen");
        nombrePrecioTotal.classList.add("nombre-precio-total");
        nombreProducto.classList.add("nombre-producto");
        precioTotalProducto.classList.add("precio-total-producto");
        precioIndividual.classList.add("precioIndividual");
        precioCantidad.classList.add("precioCantidad");
        divUnidades.classList.add("unidades");
        //Establesco la organización de los elementos a através de appendChild
        //sector de la imagen
        flexCarrito.appendChild(itemCarrito);
        itemCarrito.appendChild(divImagenProducto);
        divImagenProducto.appendChild(imagenProducto);
        //sector del nombre y los precios   
        itemCarrito.appendChild(nombrePrecioTotal);
        //nombre del producto seleccionado
        nombrePrecioTotal.appendChild(nombreProducto);
        nombreProducto.appendChild(nombre);
        //precio de un producto y precio del total de la cantidad del mismo producto
        nombrePrecioTotal.appendChild(precioTotalProducto);
         //precio de un solo producto
        precioTotalProducto.appendChild(precioIndividual);
        precioIndividual.appendChild(precioUnProducto);
        //precio de la cantidad total de un producto
        precioTotalProducto.appendChild(precioCantidad)
        precioCantidad.appendChild(precioDeCantidad);
        //sector de unidades
        itemCarrito.appendChild(divUnidades);
        //botones y cantidad
        //boton de restar cantidades
        divUnidades.appendChild(botonRestarUnidades);
        divUnidades.appendChild(numeroUnidades);
        divUnidades.appendChild(botonSumarUnidades);
        //Agruegar con setAttribute atributos a la imagen
        imagenProducto.setAttribute("src",objetoItem.imagen);
        imagenProducto.setAttribute("alt","imagen de café");
        //Agregar con setAttribute los ID de los botones

        botonRestarUnidades.setAttribute("producto_id",objetoItem.id);
        botonSumarUnidades.setAttribute("producto_id",objetoItem.id);
        itemCarrito.setAttribute("id","itemCarrito")

        //Con innerText le agrego a los elementos los textos correspondientes
        nombre.innerText = objetoItem.nombre;
        precioUnProducto.innerText = "Precio de un producto: " + objetoItem.precio;
        precioDeCantidad.innerText = "Precio de la cantidad seleccionada: " +  objetoItem.precio*objetoItem.cantidad;
        botonRestarUnidades.innerText = "-";
        numeroUnidades.innerText = objetoItem.cantidad;
        botonSumarUnidades.innerText = "+";

        //Agrego Funciones de sumar y restar a los botones
        botonRestarUnidades.addEventListener ("click",eventoRestarCantidad.bind(carritoDeCompras))
        botonSumarUnidades.addEventListener("click", eventoAumentarCarrito.bind(carritoDeCompras))
    }
}

let visibilidad = false;
let carritoDeCompras = new CarritoDeCompras();
let carrito = document.getElementById("cuadroCarrito");
carrito.addEventListener("click",carritoDeCompras.mostrarCarrito.bind(carritoDeCompras));

function eventoRestarCantidad (e) {
    if (localStorage.getItem("carritoDeCompras") != undefined){
        const listaDeElementosElegidos = JSON.parse(localStorage.getItem("carritoDeCompras"));
        for (let i=0; i<listaDeElementosElegidos.length; i++){
            if (listaDeElementosElegidos[i].id == e.target.getAttribute("producto_id")){
                listaDeElementosElegidos[i].cantidad --
            }
        }
        const listaFiltrada = listaDeElementosElegidos.filter(objeto => objeto.cantidad > 0 );
        localStorage.setItem("carritoDeCompras",JSON.stringify(listaFiltrada));
        this.mostrarCarrito ()
        this.mostrarCarrito ()
        }
    }

    function eventoAumentarCarrito (e) {
        for (const producto of arrayDeProductosParaVender){
            if (producto.id == e.target.getAttribute("producto_id")) {
                console.log(producto.id);
                comprobarCarrito (producto);
            }
        }
        this.mostrarCarrito ()
        this.mostrarCarrito ()
      }
//Creo una función que me permitira mostrar la alerta una vez hecho el click
function mostrarAlerta(e){
    //Llamo al evento para mostrar carrito que muestra y oculta los elemento
    carritoDeCompras.mostrarCarrito();
    //creo la alerta se vera en la pantalla a través del id del div en el html
    let mostrarAlertaCompra = document.getElementById("alertaCompra");
    //Le agrego las clases de bootstrap
    mostrarAlertaCompra.classList.add("alert", "alert-success");
    //Agrego texto
    mostrarAlertaCompra.innerText = "Su compra se realizado Nos pondremos en contacto para realizar el envió";

}





