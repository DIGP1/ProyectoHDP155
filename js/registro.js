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

registro.addEventListener('submit', (e) => {
       e.preventDefault();

       const name = document.querySelector("[data-name]").value;
       const user = document.querySelector("[data-user]").value;
       const email = document.querySelector("[data-correo]").value;
       const password = document.querySelector("[data-contra]").value;

       // Validar campos vacíos
       if (name.trim() === '') {
              displayError(errorUser, 'Por favor, ingresa un nombre.');
              return;
       }
       if (email.trim() === '') {
              displayError(errorEmail, 'Por favor, ingresa un correo electrónico.');
              return;
       }
       if (password.trim() === '') {
              displayError(errorPassword, 'Por favor, ingresa una contraseña.');
              return;
       }

       const usuarios = JSON.parse(localStorage.getItem('users')) || [];
       
       // comprobar si existe repeticion
       const nameRegistrared = usuarios.find(user => user.name === name);
       const emailRegistrared = usuarios.find(user => user.email === email);
       const passwordRegistrared = usuarios.find(user => user.password === password);

       // Validar contraseña
       const minimumCharacters = password.length >= 8;
       const hasNoSpaces = !/\s/.test(password);
       const hasSymbol = /[!@#$%^&*]/.test(password);
       
       if (usuarios.some(user => user.name === name && user.email === email && user.password === password)) {
              displayError(errorPassword, 'Todos los campos coinciden con un usuario existente.');
              return;
       } 
       if (nameRegistrared) {
              displayError(errorUser, 'El nombre ya está registrado.');
              return;
       } 
       if (emailRegistrared) {
              displayError(errorEmail, 'El correo ya está registrado.');
              return;
       }
       if (passwordRegistrared) {
              displayError(errorPassword, 'La contraseña ya está registrada.');
              return;
       }
       if (!minimumCharacters) {
              displayError(errorPassword, 'La contraseña debe tener al menos 8 caracteres.');
              return;
       }
       if (!hasNoSpaces) {
              displayError(errorPassword, 'La contraseña no debe contener espacios.');
              return;
       }
       if (!hasSymbol) {
              displayError(errorPassword, 'La contraseña debe contener al menos un símbolo.');
              return;
       }
       
       usuarios.push({ id:uuid.v4(), name:name, user:user, email:email, password:password});
       localStorage.setItem('users', JSON.stringify(usuarios));
       alert('Usuario registrado con exito.')

       window.location.href = 'InicioSesion.html';
});
