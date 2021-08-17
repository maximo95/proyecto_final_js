//Atraves de una variable llamo el archivo Json que contiene el array de producto
const URLJSON = "vender.json";
//Mediante una funcion guardo en el local storage el array que se encuentra en el api
function guardarProductoEnLocalStorage (){
    //Estoy pidiendo un archivo y luego ejerciendo una función de callback
    $.getJSON( URLJSON,function(respuesta,estado){
        //Con este condicional establesco que si la carga es correcta ejecuta la función
        if(estado === "success"){
        //creo una variable le asigno el valor del array de productos devueltos por el ajax
        let misproductos = respuesta.productos
        //A una constante le asigno el valor  del array subido al localstorage
        const guardarApiLocal = JSON.stringify(misproductos);
        localStorage.setItem("misproductos",guardarApiLocal);
        }

    })
} 
//Llamo para que se ejecute la funcion
guardarProductoEnLocalStorage ();

//Cartas de cafe

//A través de una funcion  que tiene como parametro el array de objetos creo las cartas
function crearCartas (objetoProductos){
    //creo los elementos que forman parte de las cartas
    let cartas = document.getElementById("cafe");
    let cartasDivPrincipal = document.createElement("div");
    let cartasImagen = document.createElement("img");
    let cartasDivcuerpo =  document.createElement("div");
    let cartasTexto = document.createElement("h5");//innertexto
    let cartasParrafo = document.createElement("p");//innertexto
    let cartasBoton = document.createElement("button");//innertexto
    let botonRestar = document.createElement("button");
    //Les agrego las clases correspondientes
    cartasDivPrincipal.classList.add("card", "text-center", "venta","limites");
    cartasImagen.classList.add("card-img-top");
    cartasDivcuerpo.classList.add("card-body");
    cartasTexto.classList.add("card-title", "titulo-carta");
    cartasParrafo.classList.add("card-text", "texto-carta");
    cartasBoton.classList.add("btn", "btn-primary");
    botonRestar.classList.add ("btn", "btn-danger"); //Boton de prueba para mostrar la función de restar
    //Agrego un elemento a elemento padre para poder establecer un orden
    cartas.appendChild(cartasDivPrincipal);
    cartasDivPrincipal.appendChild(cartasImagen);
    cartasDivPrincipal.appendChild(cartasDivcuerpo);
    cartasDivcuerpo.appendChild(cartasTexto);
    cartasDivcuerpo.appendChild(cartasParrafo);
    cartasDivcuerpo.appendChild(cartasBoton);
    cartasDivcuerpo.appendChild (botonRestar);
    //A través setAttribut le asigno src y el alt a la imagen de la carta
    cartasImagen.setAttribute("src", objetoProductos.imagen);
    cartasImagen.setAttribute("alt","imagen de café");
    //Le agrego a las cartas a traves del innertext le agrego a la carta el nombre y origen obteniendo del array (como parametro)
    cartasTexto.innerText = objetoProductos.nombre;
    cartasParrafo.innerText = objetoProductos.origen;
    //Les agrego el nombre de la funcion de los botones 
    cartasBoton.innerText = "agregar carrito";
    botonRestar.innerText = "eliminar";
    //Les agrego a los botones su id correspondiente
    cartasBoton.setAttribute("id", objetoProductos.id);
    botonRestar.setAttribute("id",objetoProductos.id);
    //agrego un evento a cada boton para que se ejecute
    cartasBoton.addEventListener("click", eventoAgregarProducto)

    botonRestar.addEventListener ("click",eventoCorroborarProducto)

}
//creo una funcion en la cual establesco como parametro el evento 
function eventoAgregarProducto (e) {
    //Itero el array para encontrar el producto que ocacionó el evento
  for (const producto of arrayDeProductosParaVender){
      //Estables un condicional comparando id del producto con el id del evento 
    if (producto.id == e.target.id){
          console.log(producto.id);
          //ejecuta la funcion para eel producto que genero el evento
          comprobarCarrito (producto);
      }
  }
}
//Creo una variable y le asigno el array del localstorage parseado
let arrayDeProductosParaVender = JSON.parse(localStorage.getItem("misproductos"));
//Uso foreach para que cada objeto del array le aplico la funcion crear cartas
arrayDeProductosParaVender.forEach(crearCartas);
//Creo una funcion que tenga como parametro producto 
function comprobarCarrito (producto){
    //Establesco un if para corroborarque el carrito de compras esté vacío
    if (localStorage.getItem("carritoDeCompras") == undefined){
        //creo un array vacio para poder pushear los productos seleccionados
        const carritoDeCompras= [];
        //Le agrego un atributo al objeto
        producto.cantidad = 1;
        //Le agrego elemento al array 
        carritoDeCompras.push(producto);
        //Guardo en el localStorage el array de objetos carritoDeCompras
        localStorage.setItem("carritoDeCompras",JSON.stringify(carritoDeCompras));
    }else {
        //variable con valore del array del local storage
        let listaEnCarrito = JSON.parse(localStorage.getItem("carritoDeCompras"));
        //le asigno a una variable el valor de false para que se empiece a ejecutar
        let verificarExistencia = false;
        //con un forEach busco el producto para hace un update del valos
        listaEnCarrito.forEach(function (productoDeLista, indice, array){
            //Con un condicional comparo que sea el producto si verifica hago un update en el array
            if(producto.id == productoDeLista.id){
                productoDeLista.cantidad ++;
                listaEnCarrito[indice] = productoDeLista;
                verificarExistencia = true;
            }
        });
        //si el producto no está en la lista lo agrego
            if (!verificarExistencia){
                producto.cantidad = 1;
                listaEnCarrito.push(producto);
            }
            //subo los cambios al local
        localStorage.setItem("carritoDeCompras",JSON.stringify(listaEnCarrito));
    }     
}
//Hago una funcion para restar productos y evaluo si tengo que sacarlo de la lista o no
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
    
//Creo una clase para mostrar el carrito de compras
class CarritoDeCompras {
    //Constructor que define una variable para indicarnos si tenemos o no que mostrar el carrito
    constructor(){
        this.visibilidad = false;
    }
    //Funcion para mostrar el carrito
    mostrarCarrito (e) {
        document.getElementById("fondoCuadro").style.display = this.visibilidad ? "none" : "inline-block";
        this.visibilidad = ! this.visibilidad;
        console.log(this);
        this.crearItems();
        //Si tenemo que ocultarlo eliminos lo que tiene dentro
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
        precioDeCantidad.classList.add("letra");
        precioUnProducto.classList.add("letra");
        nombre.classList.add("letraNombre");
        botonRestarUnidades.classList.add("btn", "btn-primary", "btn-sm","contornoBoton");
        botonSumarUnidades.classList.add("btn", "btn-primary", "btn-sm","contornoBoton");
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
        precioDeCantidad.innerText = "Precio de la cantidad: " +  objetoItem.precio*objetoItem.cantidad;
        botonRestarUnidades.innerText = "-";
        numeroUnidades.innerText = objetoItem.cantidad;
        botonSumarUnidades.innerText = "+";

        //Agrego Funciones de sumar y restar a los botones
        botonRestarUnidades.addEventListener ("click",eventoRestarCantidad.bind(carritoDeCompras))
        botonSumarUnidades.addEventListener("click", eventoAumentarCarrito.bind(carritoDeCompras))
    }
}
//Creo un objeto de la clase CarritoDeCompras
let carritoDeCompras = new CarritoDeCompras();
//Obtego el elemento del icono del carrito
let carrito = document.getElementById("cuadroCarrito");
//Como el metodo de la clase usa otra funcion de la misma cambiamos el contexto de evento
carrito.addEventListener("click",carritoDeCompras.mostrarCarrito.bind(carritoDeCompras));
//Creo una funcion para el evento del boton de restar unidades
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
        //oculto y mustro la lista para poder tener actualizada
        this.mostrarCarrito ()
        this.mostrarCarrito ()
        }
    }
    //Creo una funcion para el evento del boton de sumar unidades
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





