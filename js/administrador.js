
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
         <th><button>Agregar Usuario</button></th>
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
 
 function assignDeleteEvent(users) {
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
      const cardsHTML = blogs.map(blog => `
      <div>
      <a href="../apartados/CrearBlog.html" class="btn btn-primary btn-lg active m-3" role="button" aria-pressed="true">Nuevo Post</a>
      </div>

       <div class="col-md-4 mb-4">
         <div class="card text-center" style="max-width: 300px;">
           <img src="${blog.banner}" class="card-img-top mx-auto img-fluid" alt="Imagen del blog" style="max-height: 150px;">
           <div class="card-body">
             <h5 class="card-title">${blog.titulo}</h5>
             <p class="card-text">${blog.cuerpo.substring(0, 200)}...</p>
           </div>
           <div class="card-footer">
             <small class="text-muted">Autor</small>
             <br>
             <small class="text-muted">Fecha de publicación: ${blog.fecha}</small>
           </div>
         </div>
         
       </div>
     `).join('');
 
     const rowDiv = document.createElement('div');
     rowDiv.classList.add('row');
     rowDiv.innerHTML = cardsHTML;
 
     info.appendChild(rowDiv);
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

// export default adminUser;