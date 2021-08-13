function saludar(){
    let usuario =JSON.parse(localStorage.getItem('usuario')); 
    if (usuario != undefined ){
        let nombre = usuario.nombre;
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