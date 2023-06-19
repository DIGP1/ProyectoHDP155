const infousers = JSON.parse(localStorage.getItem('users')) || [];
const datauser = JSON.parse(localStorage.getItem("login_success"));

const validarusuario = infousers.find(user => (user.user === datauser.user ));


const nombre = document.getElementById("nombrecompleto");
const usuarioo = document.getElementById("usuarioo");
const correo = document.getElementById("correoelectronico");
const contra = document.getElementById("contraseña");

nombre.style.color = "white";
nombre.value = validarusuario.name;
usuarioo.style.color = "white";
usuarioo.value = validarusuario.user;
correo.style.color = "white";
correo.value = validarusuario.email;
contra.style.color = "white";
contra.value = validarusuario.password;

const btnEditar = document.getElementById("editarbtn");

btnEditar.addEventListener("click", ()=>{
  for (const i of infousers) {
    if (validarusuario.user == i.user && validarusuario.password == validarusuario.password) {
      i.name = nombre.value;
      i.user = usuarioo.value;
      i.email = correo.value;
      i.password = contra.value;

      localStorage.setItem("users",JSON.stringify(infousers));
      localStorage.setItem("login_success",JSON.stringify(i));
    }
  }
});