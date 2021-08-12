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