
// export const editar = () => {
//     const usuarios = JSON.parse(localStorage.getItem('login_success')) || {};
  
   
//     const emailInput = document.getElementById("correoelectronico");
//     const nameInput = document.getElementById("nombrecompleto");
//     const passwordInput = document.getElementById("contraseña");
//     const usuarioInput = document.getElementById("usuarioo");
  
  
//     usuarios.email = emailInput;
//     usuarios.name = nameInput;
//     usuarios.password = passwordInput;
//     usuarios.user = usuarioInput;
  
   
//     localStorage.setItem('login_success', JSON.stringify(usuarios));
  
// };

// export default document.getElementById('editarbtn').addEventListener('click', editar);
const editar = () => {
    const usuarios = JSON.parse(localStorage.getItem('users')) || [];
    const userLogin = JSON.parse(localStorage.getItem('login_success')) || {};
  
    const usuarioIndex = usuarios.findIndex(
      usuario =>
        usuario.usuario === userLogin.usuario &&
        usuario.email === userLogin.email &&
        usuario.password === userLogin.password &&
        usuario.name === userLogin.name
    );
  
    /* La condición if (usuarioIndex !== -1) verifica si se encontró el usuario en la lista. Si el valor de usuarioIndex es 
    diferente de -1, significa que se encontró el usuario y se procede a realizar la edición. Si el valor de usuarioIndex es -1, 
    indica que el usuario no se encontró en la lista y se muestra un mensaje de alerta correspondiente. */
    if (usuarioIndex !== -1) {
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
    } else {
      alert('No se encontró el usuario en la lista.');
    }
  };
  
document.getElementById('editarbtn').addEventListener('click', editar);