
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

// export default adminUser;