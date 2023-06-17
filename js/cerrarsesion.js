// const cerrarsesion = () => {
//     const user = JSON.parse(localStorage.getItem('login_success')) || false;

//     const usuarios = JSON.parse(localStorage.getItem('users')) || [];
//     //esta linea se comento para poder editar el html del blog, sino se deberia estar registrado si o si
//     //  if(!user){
//     //      window.location.href = 'InicioSesion.html';
//     // }

//     const mt = usuarios.find(usuario => usuario.usuario === user.usuario);

//     const mu = document.getElementById("usuarioo");
// 	// mu.innerHTML = ''; 

// 	// user.forEach( () => {
//     const listItem = document.createElement('li');
//     listItem.textContent = `Usuario: ${mt.usuario}`;
//     mu.appendChild(listItem);
// 	// });

//     const logout = document.querySelector('#logout');

//     logout.addEventListener('click', ()=>{
//         alert('Hasta pronto!')
//         localStorage.removeItem('login_success')
//         window.location.href = 'InicioSesion.html'
//     });
// }

// export default cerrarsesion

const cerrarsesion = () => {
    
  
    const logout = document.querySelector("#logout");
  
    logout.addEventListener("click", () => {
      alert("¡Hasta pronto!");
      localStorage.removeItem("login_success");
      window.location.href = "InicioSesion.html";
    });


    const userLogin = JSON.parse(localStorage.getItem('login_success')) || false;
    const usuarios = JSON.parse(localStorage.getItem('users')) || false;
  
    const { email, name, password, user } = usuarios.find(
      usuario =>
        usuario.usuario === userLogin.usuario && usuario.email === userLogin.email 
        && usuario.password === userLogin.password && usuario.name === userLogin.name
    );
  
    const emailInput = document.getElementById("correoelectronico");
    const nameInput = document.getElementById("nombrecompleto");
    const passwordInput = document.getElementById("contraseña");
    const usuarioInput = document.getElementById("usuarioo");

    emailInput.value = email;
    nameInput.value = name;
    passwordInput.value = password;
    usuarioInput.value = user;
};
  
export default cerrarsesion;
