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
      	alert('Usuario y/o contraseña incorrectos!');
    } else{
		alert(`Bienvenido ${validarusuario.name}`);
		localStorage.setItem('login_success', JSON.stringify(validarusuario));

//     const validacionadmin= usu.find(user => (user.user==="ADMIN"));
//  if(!validacionadmin){
//   alert("No hay ningun Administrador")
//  }else{
//   const pri= document.querySelector('[pri]');
//   const btn= document.createElement('button');

//   pri.appendChild(btn);
//   window.location.href = '../apartados/Blog.html' 

//  }





		
		//   const usuarios = JSON.parse(localStorage.getItem('users')) || [];
		//   const mu = document.querySelector("[dt]");
		//       listaUsuariosElement.innerHTML = ''; 
		
			
		//       usuarios.forEach((usuario) => {
		//         const listItem = document.createElement('li');
		//         listItem.textContent = ` Usuario: ${usuario.user}`;
		//         mu.appendChild(listItem);
		//       });
    }

});

