
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

const adminUser = document.querySelector('[data-users]');
const userTableContainer = document.getElementById('userTableContainer');

adminUser.addEventListener('click', (e) => {
   
   e.preventDefault();
   const users = JSON.parse(localStorage.getItem('users')) || false;

   const table = document.createElement('table');
   table.classList.add('table');
   table.innerHTML = `
      <thead>
      <tr>
         <th>User</th>
         <th>Name</th>
         <th>Email</th>
         <th>Password</th>
      </tr>
      </thead>
      <tbody>
      ${users.map(user => `
         <tr>
            <td>${user.user}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
         </tr>
      `).join('')}
      </tbody>
   `;

   userTableContainer.innerHTML = '';
   userTableContainer.appendChild(table);
});


// const usuarios = document.querySelector('[data-users]')
// const post = document.querySelector('[data-post]')
// const comentarios = document.querySelector('[data-comentarios]')

// const info= document.getElementById('contenedor')

// usuarios.addEventListener('click',()=>{
   
//    info.innerHTML=`    `
// })
// post.addEventListener('click',()=>{
   
// })
// comentarios.addEventListener('click',()=>{
   info.innerHTML = "";
   const comentariosBlog = JSON.parse(localStorage.getItem('comentarios')) || [];
   if(comentariosBlog.length != 0){
     ordenarPorFecha(comentariosBlog);
     for (const j of comentariosBlog) {
      if(!j.mostrar){
         const fechaComen = moment(j.fecha, "DD/MM/YYYY HH:mm:ss");
         const fecharelComentario = fechaComen.fromNow();
         let comentarioMostrado = `
         <div class="container-sm border border-2 rounded mt-3 mb-1">
         <div class="fs-6 text-dark">${fecharelComentario}</div>
         <div class="row">
            <div class="col-auto">
               <i class="bi bi-person-circle text-dark fs-3 "></i>
            </div>
            <div class="col-auto d-flex align-items-center">
            <div class="fs-5 text-dark">${j.user}</div>
            </div>
         </div>
           <div class="row">
             <div class="col-6">
               <span class="text-wrap fs-4 text-dark">${j.cuerpo}</span>
             </div>
             <div class="col-4 d-flex align-items-center">
             <button class="btn btn-success mb-1" btnAceptar>Mostrar</button>
             <button class="btn btn-danger mb-1" btnQuitar>Quitar</button>
             </div>
           </div>
         </div>
         `;
         info.innerHTML += comentarioMostrado;
         //Eventos de aceptar comentario o eliminarlo
         let btnAceptar = document.querySelector("[btnAceptar]");
         let btnEliminar = document.querySelector("[btnQuitar]");

         btnAceptar.addEventListener("click",()=>{
            info.innerHTML ="";
            j.mostrar = true;
            localStorage.setItem('comentarios', JSON.stringify(comentariosBlog));
            if(!j.mostrar){
               info.innerHTML += comentarioMostrado;
            }
            
         })
      }else{
         info.innerHTML = `
         <div class="badge bg-secondary text-wrap fs-5" style="width: 100%;">
            No tienes comentarios a revisar
         </div>
         `;
      }
     }
     
//    }
})

function ordenarPorFecha(arreglo){
   arreglo.sort((a, b) => {
     const fechaA = moment(a.fecha, 'DD/MM/YYYY HH:mm:ss');
     const fechaB = moment(b.fecha, 'DD/MM/YYYY HH:mm:ss');
     return fechaB.diff(fechaA);
   });
   return arreglo;
 }

// export default adminUser;