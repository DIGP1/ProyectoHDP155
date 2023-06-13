const recuperarCuenta = document.querySelector("[data-login]");//Almacena el formulario como tal xd

//Verifica si se hace el "envío" del formulario
recuperarCuenta.addEventListener('submit', (e)=>{
    e.preventDefault();//Evita el evento por defecto (que se recargue la pagina)

    const usuario = document.querySelector("[data-user]").value;//Almacena el usuario

    const usuarios = JSON.parse(localStorage.getItem('users')) || [];//Extrae la lista de usuarios registrados en el LocalStorage

    const validarUsuario = usuarios.find(user => (user.user === usuario));//Verifica si el usuario indicado existe en la lista de usuarios

    //Valida si el usuario fue encontrado, si es así, muestra un mensaje que el correo fue enviado, sino, indica que el usuario no fue encontrado
    if (!validarUsuario) {
        alert('El suario que ha ingresado no existe, por favor asegurese de ingresar un usuario válido.');
    }else {
        //Parámetros que necesita para enviar el correo
        let parametros = {
            to_name: validarUsuario.name,//"Ever Vásquez"
            email_id: validarUsuario.email,//"ever.vasquezc27@gmail.com"
            message: validarUsuario.password,
            from_name: "El Salvador Blog no-reply",
        };
        
        //Permite enviar el correo, como parámetros recibe el ID de servicio y el ID de plantilla, así como también los otros parámetros.
        emailjs.send("service_95fkbec","template_leudwbc", parametros).then(
            (result) => {
                alert("Correo enviado exitosamente, revisa tu bandeja de entrada.");
                localStorage.setItem('login_success', JSON.stringify(validarUsuario)); 
                window.location.href = '../apartados/InicioSesion.html';
            }
        ).catch(
            //En caso de que exista un error en el proceso, muestra una alerta con sl siguiente mensaje.
            (err) => {
                alert("Parece que ocurrio un error al enviar el correo.");
            }
        );
    }

});