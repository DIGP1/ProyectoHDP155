const login = document.querySelector("[data-login]");
const mt = document.querySelector("[data-usu]");
login.addEventListener('submit', (e)=>{
  e.preventDefault();

  const usuario = document.querySelector("[data-user]").value;
  const password = document.querySelector("[data-contra]").value;

  const usuarios = JSON.parse(localStorage.getItem('users')) || [];
  console.log(usuarios);
  //buscamos los datos
  const validarusuario = usuarios.find(user => (user.user === usuario && user.password === password));
  //const validateUser = usuarios.some(user => user.usuario != usuario && user.password != password)
  // console.log(validateUser);
  // if (validateUser){
  //   alert('Usuario y/o contraseña incorrectos!')
  // } else{
  //   alert(`Bienvenido ${usuario}`)
  //   localStorage.setItem('login_success', JSON.stringify(validateUser))
  //   window.location.href = 'Blog.html'   
  // }

  if(!validarusuario){
    alert('Usuario y/o contraseña incorrectos!')
  } else{
    alert(`Bienvenido ${validarusuario.name}`)
    localStorage.setItem('login_success', JSON.stringify(validarusuario))
    window.location.href = 'Blog.html'   
  }

});
