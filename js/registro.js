const registro = document.querySelector("[form-regi]");
const errorUser = document.querySelector("[p-name]");
const errorEmail = document.querySelector('[p-email]')
const errorPassword = document.querySelector('[p-password]');
const createP = document.createElement('p');

function displayError(element, message) {
       createP.style.color = 'red';
       createP.style.fontSize = '11px';
       createP.style.textAlign = 'center';
       createP.innerHTML = message;
       element.innerHTML = '';
       element.appendChild(createP);
}

//Valida el correo
const validarEmail = (email) => {
	var expresionRegular = /^([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,6})$/;
	return expresionRegular.test(email);
};

registro.addEventListener('submit', (e) => {
       e.preventDefault();

       const nombreIngresado = document.querySelector("[data-name]").value;
       const usuarioIngresado = document.querySelector("[data-user]").value;
       const emailIngresado = document.querySelector("[data-correo]").value;
       const contraseniaIngresada = document.querySelector("[data-contra]").value;

       // Validar campos vacíos
       if (nombreIngresado.trim() === '') {
              displayError(errorUser, 'Por favor, ingresa un nombre.');
              return;
       }
       if (emailIngresado.trim() === '') {
              displayError(errorEmail, 'Por favor, ingresa un correo electrónico.');
              return;
       } else {
              //Validación de correo a través de expresión regular
              if (!validarEmail(emailIngresado)) {
                     displayError(errorEmail, 'Por favor, ingrese un correo válido');
                     return;
              }
       }
       if (contraseniaIngresada.trim() === '') {
              displayError(errorPassword, 'Por favor, ingresa una contraseña.');
              return;
       }

       const usuarios = JSON.parse(localStorage.getItem('users')) || [];
       
       // comprobar si existe repeticion
       const nameRegistrared = usuarios.find(user => user.user === usuarioIngresado);
       const emailRegistrared = usuarios.find(user => user.email === emailIngresado);

       // Validar contraseña
       const minimoDeCaracteres = contraseniaIngresada.length >= 8;
       const noTieneEspacios = !/\s/.test(contraseniaIngresada);
       const tieneSimbolos = /^(?=.*[!@#$%^&*()\-_=+{};:,<.>])/.test(contraseniaIngresada);
       
       if (nameRegistrared) {
              displayError(errorUser, 'El nombre de usuario ya está registrado.');
              return;
       } 
       if (emailRegistrared) {
              displayError(errorEmail, 'El correo ya está registrado.');
              return;
       }
       if (!minimoDeCaracteres) {
              displayError(errorPassword, 'La contraseña debe tener al menos 8 caracteres.');
              return;
       }
       if (!noTieneEspacios) {
              displayError(errorPassword, 'La contraseña no debe contener espacios.');
              return;
       }
       if (!tieneSimbolos) {
              displayError(errorPassword, 'La contraseña debe contener al menos un símbolo.');
              return;
       }
       
       usuarios.push({ id:uuid.v4(), name:nombreIngresado, user:usuarioIngresado, email:emailIngresado, password:contraseniaIngresada});
       localStorage.setItem('users', JSON.stringify(usuarios));
       alert('Usuario registrado con exito.')

       window.location.href = 'InicioSesion.html';
});
