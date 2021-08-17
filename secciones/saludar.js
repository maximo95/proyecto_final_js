//Funcion de saludor una vez registrado
function saludar(){
    //creo una variable para asignarle el valor de un array parseado
    let usuario =JSON.parse(localStorage.getItem('usuario'));
    //Solo se ejecuta si es que existe
    if (usuario != undefined ){
        let nombre = usuario.nombre;
        let verificar = document.getElementById("verificar");

        if(verificar != null){
            verificar.parentNode.removeChild(verificar);
        }
        //CREA los elemento en el html para realizar el saludo
        let elementoSaludo = document.getElementById ("saludo");
        let saludo = document.createElement("p");
        saludo.setAttribute("id", "verificar");
        saludo.innerHTML = `<h4>¡Hola ${nombre}!</h4>`; 
        elementoSaludo.appendChild(saludo);
    }
}
//Convoco a la funcion de saludar
saludar();