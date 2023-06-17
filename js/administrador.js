const admin= ()=>{

    const userLogin = JSON.parse(localStorage.getItem('login_success')) || false;
    const li= document.getElementById('data-pf');
    
    validaradmin= userLogin.find(user => (user.user === "ADMIN" && user.password === password));

   if(!validaradmin){
    li.textContent= "Mi perfil";
    $ ( li ). attr ( ' href ' ,  ' ../apartados/usuarios.html ' );
   }else{
    li.textContent= "Administrar";
    $ ( li ). attr ( ' href ' ,  ' ../apartados/pruebaadmin.html ' );
   }
    
    
   
}
export default admin;