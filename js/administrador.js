
// const admin= ()=>{

   if(!validaradmin){
    li.textContent= "Mi perfil";
    $ ( li ). attr ( ' href ' ,  ' ../apartados/usuarios.html ' );
   }else{
    li.textContent= "Administrar";
    $ ( li ). attr ( ' href ' ,  ' ../apartados/pruebaadmin.html ' );
   }
    
//     validaradmin= userLogin.find(user => (user.user === "ADMIN" && user.password === password));

   
//     li.textContent= "Administrar";
//     $ ( li ). attr ( ' href ' ,  ' pruebadmin.html ' );
//     console.log(li)
   
// }
// export default admin;