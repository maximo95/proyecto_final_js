let miFormulario = document.getElementById ("formulario");
miFormulario. addEventListener ("submit", validarFormulario );
function validarFormulario (e){
    /*0=> nombre 
    1=>apellido
    2=>email */
    //Cancelamos el comportamiento del evento
    e.preventDefault ();
    //Obtenemos el elemento desde el cual se disparó el evento
    let formulario = e.target
    let nombre = formulario.children[0].children[0].children[0].value;  
    let apellido = formulario.children[1].children[0].children[0].value; 
    let email = formulario.children[2].children[0].children[1].value;
    let usuario = {};
    usuario.nombre = nombre ;
    usuario.apellido = apellido;
    usuario.email = email;
    let usuarioEnJson = JSON.stringify(usuario);
    localStorage.setItem("usuario",usuarioEnJson);
    saludar();
}


function saludar(){
    let usuario =JSON.parse(localStorage.getItem('usuario'));
    let nombre = usuario.nombre;
    if (usuario != undefined ){
        let verificar = document.getElementById("verificar");

        if(verificar != null){
            verificar.parentNode.removeChild(verificar);
        }
        let elementoSaludo = document.getElementById ("saludo");
        let saludo = document.createElement("p");
        saludo.setAttribute("id", "verificar");
        saludo.innerHTML = `<h4>¡Hola ${nombre}!</h4>`; 
        elementoSaludo.appendChild(saludo);
    }
}

saludar();

function guardarUsuario(){
    let nombreUsuario = localStorage.getItem('nombre');
    if (nombre != undefined){

    }
}

//GETJSON Con boton para mostrar sucursales
const URLJSON = "users.json";
//Agregamos un botón con jQuery
$("#sucursales").prepend('<button id="btn">mostrar dirección</button>');
 //Escuchamos el evento click del botón agregado
$("#btn").click(
    () => {
    $.getJSON(URLJSON, function(respuesta, estado) {
    console.log(respuesta);
         
        if (estado === "success") {
             let misDatos = respuesta.locales;
            
             $("#sucursales-container").html('');

            for (const dato of misDatos) {

                 $("#sucursales-container").append(`<div>

                        <h3>${dato.sucursal}</h3>

                        <p> ${dato.direccion}</p>

                             </div>`)

            }

         }
    })
});