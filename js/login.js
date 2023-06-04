const login = document.querySelector("[data-login]");

login.addEventListener('submit', (e)=>{
  e.preventDefault();

  const usuario = document.querySelector("[data-user]").value;
  const password = document.querySelector("[data-contra]").value;

  const usuarios = JSON.parse(localStorage.getItem('users')) || [];

  //buscamos los datos
  // const validarusuario = usuarios.find(user => (user.usuario === usuario && user.password === password));
  const validateUser = usuarios.some(user => user.usuario !== usuario && user.password !== password)

  if (validateUser){
    alert('Usuario y/o contraseña incorrectos!')
  } else{
    alert(`Bienvenido ${usuario}`)
    localStorage.setItem('login_success', JSON.stringify(validateUser))
    window.location.href = 'Blog.html'   
  }

  // if(!validarusuario){
  //   alert('Usuario y/o contraseña incorrectos!')
  // } else{
  //   alert(`Bienvenido ${validarusuario.name}`)
  //   localStorage.setItem('login_success', JSON.stringify(validarusuario))
  //   window.location.href = 'principal.html'   
  // }

});
