const displayInfoUser = () => {
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
  
// export const editar = () => {
//   const usuarios = JSON.parse(localStorage.getItem('login_success')) || {};

 
//   const emailInput = document.getElementById("correoelectronico").value;
//   const nameInput = document.getElementById("nombrecompleto").value;
//   const passwordInput = document.getElementById("contraseña").value;
//   const usuarioInput = document.getElementById("usuarioo").value;


//   usuarios.email = emailInput;
//   usuarios.name = nameInput;
//   usuarios.password = passwordInput;
//   usuarios.user = usuarioInput;

 
//   localStorage.setItem('login_success', JSON.stringify(usuarios));

// };

// document.getElementById('editarbtn').addEventListener('click', editar);
export default displayInfoUser;
