

    // const userLogin = JSON.parse(localStorage.getItem('login_success')) || false;
    const li= document.querySelector('[data-pf]');
    
    // validaradmin= userLogin.find(user => (user.user === "ADMIN" && user.password === password));

   
    li.textContent= "Administrar";
    $ ( li ). attr ( ' href ' ,  ' pruebadmin.html ' );
    console.log(li)



