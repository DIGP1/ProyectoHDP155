
// const admin= ()=>{

   // if(!validaradmin){
   //  li.textContent= "Mi perfil";
   //  $ ( li ). attr ( ' href ' ,  ' ../apartados/usuarios.html ' );
   // }else{
   //  li.textContent= "Administrar";
   //  $ ( li ). attr ( ' href ' ,  ' ../apartados/pruebaadmin.html ' );
   // }
    
//     validaradmin= userLogin.find(user => (user.user === "ADMIN" && user.password === password));

   
//     li.textContent= "Administrar";
//     $ ( li ). attr ( ' href ' ,  ' pruebadmin.html ' );
//     console.log(li)
   
// }
// export default admin;

//mostrando los datos e eliminar

const adminUser = document.querySelector('[data-users]');
const info= document.getElementById('contenedor');

adminUser.addEventListener('click', (e) => {
   e.preventDefault();
   info.innerHTML = '';
   let users = JSON.parse(localStorage.getItem('users')) || [];
 
   const table = document.createElement('table');
   table.classList.add('table');
   table.innerHTML = `
     <thead>
       <tr>
         <th>User</th>
         <th>Name</th>
         <th>Email</th>
         <th>Password</th>
         <th>Seleccionar</th>
         <th>Botones</th>
         <th><button data-agregar>Agregar Usuario</button></th>
       </tr>
     </thead>
     <tbody>
       ${users
         .map(
           (user) => `
             <tr>
               <td>${user.user}</td>
               <td>${user.name}</td>
               <td>${user.email}</td>
               <td>${user.password}</td>
               <td><input type="checkbox" data-id="${user.id}"></td> 
               <td>
                 <button class="btn-edit" data-id="${user.id}">Editar</button> 
                 <button class="btn-delete" data-id="${user.id}">Eliminar</button> 
               </td>
             </tr>
           `
         )
         .join('')}
     </tbody>
   `;
 
   info.innerHTML = '';
   info.appendChild(table);

  assingUpdateEvent(users, info);//Evento de editar usuario
  assingAddEvent(users, info);//Evento de agregar nuevo usuario
 
   assignDeleteEvent(users); // Asignar eventos click a los botones de eliminar
 
   const check = document.querySelectorAll('input[type="checkbox"]');
   check.forEach((checkbox) => {
     checkbox.addEventListener('change', () => {
       const userId = checkbox.getAttribute('data-id');
       if (checkbox.checked) {
         // Lógica para seleccionar el usuario con el ID correspondiente
       } else {
         // Lógica para deseleccionar el usuario con el ID correspondiente
       }
     });
   });
 });

 let formVisible = false;//Permite verificar si el formulario para editar es visible
 const createP = document.createElement('p');//Permite asignar los estilos a los mensajes de error
 
 function assignDeleteEvent(users) {
	formVisible = false;
   const borrar = document.querySelectorAll('.btn-delete');
   borrar.forEach((button) => {
     button.addEventListener('click', () => {
       const userId = button.getAttribute('data-id');
       users = users.filter((user) => user.id !== userId); // Actualizar la variable `users`
       localStorage.setItem('users', JSON.stringify(users));
       button.parentNode.parentNode.remove(); // Eliminar la fila correspondiente
     });
   });
 }
 
 function assingUpdateEvent(users, container){
	const editar = document.querySelectorAll('.btn-edit');
   editar.forEach((button) => {
     button.addEventListener('click', () => {
       const userId = button.getAttribute('data-id');
       let userEdit = users.filter((user) => user.id === userId); // Almacena el usuario que se va a editar
	   if (!formVisible) {
		    mostrarFormulario(container);
        formVisible = true;
      }
	   mostrarDatos(userEdit[0]);
	   const btnGuardar = document.querySelector('[data-editar-btn]');

	   btnGuardar.addEventListener("click", () => {
		const usuarios = JSON.parse(localStorage.getItem('users')) || false;
		const usuarioIndex = usuarios.findIndex(
			usuario =>
			usuario.usuario === userEdit[0].usuario &&
			usuario.email === userEdit[0].email &&
			usuario.password === userEdit[0].password &&
			usuario.name === userEdit[0].name
		)
		console.log("Ususario a editar: ", usuarios[usuarioIndex])
		/* La condición if (usuarioIndex !== -1) verifica si se encontró el usuario en la lista. Si el valor de usuarioIndex es 
		diferente de -1, significa que se encontró el usuario y se procede a realizar la edición. Si el valor de usuarioIndex es -1, 
		indica que el usuario no se encontró en la lista y se muestra un mensaje de alerta correspondiente. */
		if (usuarioIndex !== -1){
			usuarios[usuarioIndex] = {
				...usuarios[usuarioIndex],
				email: document.getElementById("correoelectronico").value,
				name: document.getElementById("nombrecompleto").value,
				password: document.getElementById("contraseña").value,
				user: document.getElementById("usuarioo").value
			};
			localStorage.setItem('users', JSON.stringify(usuarios));
			localStorage.setItem('login_success', JSON.stringify(usuarios[usuarioIndex]));
			alert('Información de usuario actualizada correctamente.');

		}
	   });
     });
   });
 }

 function assingAddEvent(users, container){
  const btnAgregar = document.querySelector("[data-agregar]");
  btnAgregar.addEventListener("click", () => {
    console.log("Valor del formulario: ", formVisible)
    if (!formVisible) {
      mostrarFormulario(container);
      formVisible = true;
    }else {
      const divContainer = document.getElementsByClassName('container_');
      container.removeChild(divContainer[0]);
      mostrarFormulario(container);
    }

    const registro = document.getElementById("form-regi");
    const errorUser = document.querySelector("[p-name]");
    const errorEmail = document.querySelector('[p-email]')
    const errorPassword = document.querySelector('[p-password]');
    

    registro.addEventListener("submit", (e) => {
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
      alert('Usuario registrado con exito.');
    
    })
  });
 }

function mostrarFormulario(container){
	
	const formEdit = document.createElement('form');
  formEdit.setAttribute("id", "form-regi");
	const divContainer = document.createElement('div');
	divContainer.classList.add('container_');
	divContainer.classList.add('mt-3');
	divContainer.classList.add('mb-3');
	divContainer.innerHTML = ``;
	formEdit.innerHTML = `
	<div class="input-field">
		<label for="email">Nombre Completo</label> <input type="text" class="input" id="nombrecompleto" required data-name>
	</div>
	<div class="input-field">
		<label for="Usuario">Usuario</label><input type="text" class="input" id="usuarioo" required data-user>
	</div>
	<p p-name></p>
	<div class="input-field"> 
		<label for="email">Correo</label><input type="text" class="input" id="correoelectronico" required data-correo>
	</div>
  <p p-email></p>
	<div class="input-field p-2">
		<label for="email">Contraseña</label><input type="password" class="input" id="contraseña" required data-contra>
    <label class="">Mostrar Contraseña <input class="p-3" type="checkbox" id="mostrarContrasenaCheckbox"></label>
	</div>
  <p p-password></p>
	<div class="button-container">
    <input type="submit" class="submit btn btn-success" value="Guardar" id="editarbtn" data-editar-btn>
	</div>`;
	divContainer.innerHTML = ``;
	divContainer.appendChild(formEdit);
	container.appendChild(divContainer);

  const passwordInput = document.getElementById("contraseña");
  passwordInput.type = 'password';
  const mostrarContrasenaCheckbox = document.getElementById('mostrarContrasenaCheckbox');
  mostrarContrasenaCheckbox.addEventListener('change', function(e){
    e.preventDefault();
    if (mostrarContrasenaCheckbox.checked) {
      passwordInput.type = 'text';
    }else {
      passwordInput.type = 'password';
    }
  });
		
 }

 function mostrarDatos(userEditar){
    const usuarios = JSON.parse(localStorage.getItem('users')) || false;
  
    const { email, name, password, user } = usuarios.find(
      usuario =>
        usuario.usuario === userEditar.usuario && usuario.email === userEditar.email 
        && usuario.password === userEditar.password && usuario.name === userEditar.name
    );
    const emailInput = document.getElementById("correoelectronico");
    const nameInput = document.getElementById("nombrecompleto");
    const passwordInput = document.getElementById("contraseña");
    const usuarioInput = document.getElementById("usuarioo");
  
    emailInput.value = email;
    nameInput.value = name;
    passwordInput.value = password;
    usuarioInput.value = user;

 }

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



//////////////////////////////////////////////////////////
const usuarios = document.querySelector('[data-users]')
const adminPost = document.querySelector('[data-post]')
const comentarios = document.querySelector('[data-comentarios]')

adminPost.addEventListener('click', (e) => {
   e.preventDefault();
   const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
   
   info.innerHTML = '';
   

   
 
   if (blogs.length === 0) {
      const messageDiv = document.createElement('div');
      messageDiv.innerHTML = `<div class="alert alert-secondary">No hay blogs disponibles.</div>`;
      info.appendChild(messageDiv);
   } else {
    info.innerHTML = `
    <div class="d-flex justify-content-end">
        <a href="../apartados/CrearBlog.html" class="btn btn-primary m-3 btn-lg active" role="button" aria-pressed="true">Nuevo Post</a>
`;


   
      const cardsHTML = blogs.map(blog => `
      
       <div class="col-auto mb-4">
         <div class="card" style="max-width: 300px; ">
           <img src="${blog.banner}" class="card-img-top mx-auto img-fluid" alt="Imagen del blog" style="max-height: 150px;">
           <div class="card-body ">
             <h5 class="card-title fw-bold">${blog.titulo}</h5>
             <p class="card-text">${blog.cuerpo.substring(0, 200)}...</p>
           </div>
           <div class="card-footer">
             <small class="text-muted">Autor</small>
             <br>
             <small class="text-muted">Fecha de publicación: ${blog.fecha}</small>
           </div>
         </div>
         <div class"button-container">
         <button type="button" class="btn btn-primary  m-3"  btnEditar >Editar</button >
         <button type="button" class="btn btn-danger  m-3"  btnEliminar>Eliminar</button>
         </div>
         
         
       </div>
     `).join('');
 
     const rowDiv = document.createElement('div');
     rowDiv.classList.add('row');
     rowDiv.innerHTML = cardsHTML;
 
     info.appendChild(rowDiv);

     const btnEditar = document.querySelectorAll("[btnEditar]");
     const btnEliminar = document.querySelectorAll("[btnEliminar]");

     for (let i = 0; i < btnEditar.length; i++) {
          btnEditar[i].addEventListener('click', () => {
            info.innerHTML = `
            <h1 style="color: #343a40; font-weight: bold; text-align: center; margin-bottom: 30px;">Editar Blog</h1>

            <form id="myForm">
              <div class="form-group">
                <label for="titulo" style="color: #343a40; font-weight: bold;">Título:</label>
                <input type="text" class="form-control" id="titulo">
              </div>

              <div class="form-group">
                <label for="banner" style="color: #343a40; font-weight: bold;">Banner: (No seleccione ningun archivo para dejar la imagen anterior)</label>
                <input type="file" id="banner" class="form-control" accept="image/*">
                <img id="verBanner" src="#" alt="Vista previa de la imagen" class="mt-3" style="display:none" >
              </div>

              <div class="form-group">
                <label for="cuerpo" class="form-label" style="color: #343a40; font-weight: bold;">Cuerpo del blog:</label>
                <textarea class="form-control" id="myTextarea" style="height: 300px;"></textarea>
              </div>

              <div class="form-group text-center">
                <button type="button" class="btn btn-primary validarBtnGuardar" style="border-color: #007bff;" id="btnGuardar">Guardar</button>
                <button type="button" class="btn btn-success" style="border-color: #6c757d;" id="btn-cancelar">Cancelar</button>
              </div>

              <label id="mensaje" style="display: none;"></label>
            `;
            const titu = document.getElementById("titulo");
            const banners = blogs[i].banner;
            tinymce.init({
              selector: '#myTextarea',
              setup: function (editor) {
                editor.on('init', function () {
                  editor.setContent(blogs[i].cuerpo);
                });
              }
            }).then(function (editor) {
              var myEditor = editor;
            });
            //Cargo los elementos del localStorage a los inputs
            titu.value = blogs[i].titulo;
            const editor = tinymce.get('myTextarea');
            //Para mostrar la imagen ingresada
            let bannerSubido = document.getElementById('banner');
            let direcbanner; 
            bannerSubido.addEventListener('change', function(event) {
              let banner = event.target.files[0]; 
              direcbanner = banner;
              let reader = new FileReader();
      
              reader.onload = function(e) {
                let verBanner = document.getElementById('verBanner');
                verBanner.src = e.target.result; 
                direcbanner = e.target.result;
                verBanner.style.display = 'block';
                verBanner.style.width = "30%";
                verBanner.style.height = "10rem";

              }
              reader.readAsDataURL(banner);
            });

            //Evento click de guardar
            const btnGuardar = document.getElementById("btnGuardar");

            btnGuardar.addEventListener("click",()=>{
              blogs[i].titulo = titu.value;
              console.log(direcbanner)
              if(direcbanner == null){
                blogs[i].banner = banners;
                
              }else{
                blogs[i].banner = direcbanner;
              }
              blogs[i].cuerpo = editor.getContent();
              localStorage.setItem("blogs", JSON.stringify(blogs))
            });
          });
          for (let i = 0; i < btnEliminar.length; i++) {
            btnEliminar[i].addEventListener('click', () => {
              const index = btnEliminar[i].dataset.index;
              infoBlogs.splice(index, 1);
              localStorage.setItem('blogs', JSON.stringify(infoBlogs));
            });
        }
      }  
  }
});   




const mostrar = () => {
   info.innerHTML = "";
 
   const comentariosBlog = JSON.parse(localStorage.getItem('comentarios')) || [];
 
   if (comentariosBlog.length !== 0) {
     ordenarPorFecha(comentariosBlog);
     let comentariosMostrados = false;
 
     for (const [index, comentario] of comentariosBlog.entries()) {
       if (!comentario.mostrar) {
         const fechaComen = moment(comentario.fecha, "DD/MM/YYYY HH:mm:ss");
         const fecharelComentario = fechaComen.fromNow();
         let comentarioMostrado = `
           <div class="container-sm border border-2 rounded mt-3 mb-1">
             <div class="fs-6 text-dark">${fecharelComentario}</div>
             <div class="row">
               <div class="col-auto">
                 <i class="bi bi-person-circle text-dark fs-3 "></i>
               </div>
               <div class="col-auto d-flex align-items-center">
                 <div class="fs-5 text-dark">${comentario.user}</div>
               </div>
             </div>
             <div class="row">
               <div class="col-6">
                 <span class="text-wrap fs-4 text-dark">${comentario.cuerpo}</span>
               </div>
               <div class="col-4 d-flex align-items-center">
                 <button class="btn btn-success mb-1 btnAceptar" data-index="${index}">Mostrar</button>
                 <button class="btn btn-danger mb-1 btnQuitar" data-index="${index}">Quitar</button>
               </div>
             </div>
           </div>
         `;
         info.innerHTML += comentarioMostrado;
         comentariosMostrados = true;
       }
     }
 
     if (!comentariosMostrados) {
       info.innerHTML = `
         <div class="badge bg-secondary text-wrap fs-5" style="width: 100%;">
           No tienes comentarios a revisar
         </div>
       `;
     }
   } else {
     info.innerHTML = `
       <div class="badge bg-secondary text-wrap fs-5" style="width: 100%;">
         Aun no hay comentarios en los post!
       </div>
     `;
   }
 
   const btnAceptarList = document.getElementsByClassName('btnAceptar');
   const btnQuitarList = document.getElementsByClassName('btnQuitar');
 
   for (let i = 0; i < btnAceptarList.length; i++) {
     btnAceptarList[i].addEventListener('click', () => {
       const index = btnAceptarList[i].dataset.index;
       comentariosBlog[index].mostrar = true;
       localStorage.setItem('comentarios', JSON.stringify(comentariosBlog));
       mostrar();
     });
   }
 
   for (let i = 0; i < btnQuitarList.length; i++) {
     btnQuitarList[i].addEventListener('click', () => {
       const index = btnQuitarList[i].dataset.index;
       comentariosBlog.splice(index, 1);
       localStorage.setItem('comentarios', JSON.stringify(comentariosBlog));
       mostrar();
     });
   }
 };
 
 comentarios.addEventListener('click', mostrar);

function ordenarPorFecha(arreglo){
   arreglo.sort((a, b) => {
     const fechaA = moment(a.fecha, 'DD/MM/YYYY HH:mm:ss');
     const fechaB = moment(b.fecha, 'DD/MM/YYYY HH:mm:ss');
     return fechaB.diff(fechaA);
   });
   return arreglo;
 }
