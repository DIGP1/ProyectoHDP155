/*const imgPrueba = JSON.parse(localStorage.getItem('blogs'));
const divpadre = document.querySelector("[pruebaCargar]");

for (const i of imgPrueba) {
    const cargarImg = document.createElement("img");
    cargarImg.src = i.banner;
    cargarImg.style.width = "20%";
    divpadre.appendChild(cargarImg);
}*/
moment.locale("es");
let infoBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
const cargaBlogs = document.querySelector("[loadBlogs]");
let infolocal = JSON.parse(localStorage.getItem('users'))

ordenarPorFecha(infoBlogs);

function isUsuarioRegistrado(usuario) {
  const usuarios = JSON.parse(localStorage.getItem('users')) || [];
  return usuarios.some((user) => user.user === usuario);
}

if (infoBlogs.length != 0) {
  const elementosGenerados = []; // Array para almacenar los elementos generados

  for (const i of infoBlogs) {
    const datauser = JSON.parse(localStorage.getItem("login_success"));
    const fecha = moment(i.fecha, "DD/MM/YYYY HH:mm:ss");
    const fecharelativa = fecha.fromNow();
    const textoAlerta = i.cuerpo.substring(0, 200) + "...";
    recargarban(datauser,infolocal);


    const tarjetaBlog = `
    <div class="col-md-6 col-lg-4 mb-4">
      <div class="card h-100" data-titu="${i.idBlog}">
        <div class="position-relative"><img class="w-100 rounded-top" src="${i.banner}"/></div>
        <div class="card-body px-0 py-3">
          <h5 class="p-1 mb-0 font-sans-serif fw-bold fs-md-0 fs-lg-1">${i.titulo}</h5>
          <h6 class="p-1 pt-1">
            ${textoAlerta}
          </h6>
        </div>
        <div class="card-footer">
          <a class="text-muted fs--1 stretched-link text-decoration-none">Autosdfsr</a>
          <br>
          <a class="text-muted fs--1 stretched-link text-decoration-none" href="#!">Fecha de publicacion: ${fecharelativa}</a>
        </div>
      </div>
    </div>
  `;

    cargaBlogs.insertAdjacentHTML("beforeend", tarjetaBlog);

    const elementoGenerado = cargaBlogs.lastElementChild; // Obtener el último elemento generado
    elementosGenerados.push(elementoGenerado); // Agregarlo al array

    if(!datauser.silenciado){
      elementoGenerado.addEventListener("click", () => {
        cargaBlogs.innerHTML = `
        <div class="container">
              <div class="card mb-3">
                  <img src="${i.banner}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${i.titulo}</h5> 
                  <p class="card-text">${i.cuerpo}</p>
                  <p class="card-text"><small class="text-body-secondary">${i.fecha}</small></p>
                </div>
              </div>
              <div class="input-group mt-3">
                <button type="button" class="btn btn-success" id="button-addon1" btnComentar>Comentar</button>
                <input type="text" class="form-control" id="txtComentarios" placeholder="Escribe un comentario..." aria-label="Example text with button addon" aria-describedby="button-addon1">
              </div>
              <div div class="mb-4" id="comentarios">
        
              </div>
        </div>
        `;
        // Creando el evento click del botón de comentar
        const btnComentar = document.querySelector("[btnComentar]");
        // Validación para que no haya comentarios sin texto
        btnComentar.addEventListener("click", () => {
          const fechaComentario = moment().format('DD/MM/YYYY HH:mm:ss');
          textComentario = document.getElementById("txtComentarios");
          comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
        
          if (!datauser || !datauser.user || !isUsuarioRegistrado(datauser.user)) {
            alert("No estás registrado. No puedes comentar.");
            window.location.href = '../apartados/Registro.html';
            return;
          }
        
          comentarios.push({
            idBlog: i.idBlog,
            user: datauser.user,
            cuerpo: textComentario.value,
            fecha: fechaComentario,
            mostrar: false
          });
          localStorage.setItem("comentarios", JSON.stringify(comentarios));
          alert("¡Se ha comentado con éxito!");
          textComentario.value = "";
        });
        
        // Cargar comentarios
        const comentariosBlog = JSON.parse(localStorage.getItem('comentarios')) || [];
        if (comentariosBlog.length != 0) {
          ordenarPorFecha(comentariosBlog);
          for (const j of comentariosBlog) {
            if (i.idBlog == j.idBlog && j.mostrar) {
              const cargarComentarios = document.getElementById("comentarios");
              const fechaComen = moment(j.fecha, "DD/MM/YYYY HH:mm:ss");
              const fecharelComentario = fechaComen.fromNow();
              cargarComentarios.innerHTML += `
              <div class="card mt-3">
                <h5 class="card-header"> <i class="bi bi-person-circle text-dark fs-3 "></i> ${j.user}</h5>
                <div class="card-body">
                  <p class="card-text">${j.cuerpo}</p>
                  <p class="card-text"><small class="text-body-secondary">${fecharelComentario}</small></p>
                  </div>
              </div>
              `
            }
          }
        }
      });

    }else{

      elementoGenerado.addEventListener("click", () => {
        cargaBlogs.innerHTML = `
        <div class="container">
              <div class="card mb-3">
                  <img src="${i.banner}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${i.titulo}</h5> 
                  <p class="card-text">${i.cuerpo}</p>
                  <p class="card-text"><small class="text-body-secondary">${i.fecha}</small></p>
                </div>
              </div>
              <div class="input-group mt-3">
              <div class="alert alert-danger d-flex align-items-center" role="alert">
              <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
              <div>
                Un Administrador te ha silenciado
              </div>
            </div>
              </div>
              <div div class="mb-4" id="comentarios">
        
              </div>
        </div>
        `;
        
        // Cargar comentarios
        const comentariosBlog = JSON.parse(localStorage.getItem('comentarios')) || [];
        if (comentariosBlog.length != 0) {
          ordenarPorFecha(comentariosBlog);
          for (const j of comentariosBlog) {
            if (i.idBlog == j.idBlog && j.mostrar) {
              const cargarComentarios = document.getElementById("comentarios");
              const fechaComen = moment(j.fecha, "DD/MM/YYYY HH:mm:ss");
              const fecharelComentario = fechaComen.fromNow();
              cargarComentarios.innerHTML += `
              <div class="card mt-3">
                <h5 class="card-header"> <i class="bi bi-person-circle text-dark fs-3 "></i> ${j.user}</h5>
                <div class="card-body">
                  <p class="card-text">${j.cuerpo}</p>
                  <p class="card-text"><small class="text-body-secondary">${fecharelComentario}</small></p>
                  </div>
              </div>
              `
            }
          }
        }
      });


    }
    
  }
} else {
  cargaBlogs.innerHTML = `
  <div class="badge bg-secondary text-wrap fs-5" style="width: 100%;">
  No hay ningún blog disponible
  </div>
  `;
}

function recargarban(userlogueado, usuario){

  const validarusuario = usuario.find(user => (user.user === userlogueado.user ));

  userlogueado.silenciado= validarusuario.silenciado;
  localStorage.setItem('login_success',JSON.stringify(userlogueado))

}



// if (infoBlogs.length != 0) {
//   const elementosGenerados = []; // Array para almacenar los elementos generados

//   for (const i of infoBlogs) {
//     const datauser = JSON.parse(localStorage.getItem("login_success"));
//     const fecha = moment(i.fecha, "DD/MM/YYYY HH:mm:ss");
//     const fecharelativa = fecha.fromNow();
//     const textoAlerta = i.cuerpo.substring(0, 200) + "...";

//     const tarjetaBlog = `
//     <div class="col-md-6 col-lg-4 mb-4">
//       <div class="card h-100" data-titu="${i.idBlog}">
//         <div class="position-relative"><img class="w-100 rounded-top" src="${i.banner}"/></div>
//         <div class="card-body px-0 py-3">
//           <h5 class="p-1 mb-0 font-sans-serif fw-bold fs-md-0 fs-lg-1">${i.titulo}</h5>
//           <h6 class="p-1 pt-1">
//             ${textoAlerta}
//           </h6>
//         </div>
//         <div class="card-footer">
//           <a class="text-muted fs--1 stretched-link text-decoration-none">Autosdfsr</a>
//           <br>
//           <a class="text-muted fs--1 stretched-link text-decoration-none" href="#!">Fecha de publicacion: ${fecharelativa}</a>
//         </div>
//       </div>
//     </div>
//   `;

//     cargaBlogs.insertAdjacentHTML("beforeend", tarjetaBlog);

//     const elementoGenerado = cargaBlogs.lastElementChild; // Obtener el último elemento generado
//     elementosGenerados.push(elementoGenerado); // Agregarlo al array

//     elementoGenerado.addEventListener("click", () => {
//       cargaBlogs.innerHTML = `
//       <div class="container">
//             <div class="card mb-3">
//                 <img src="${i.banner}" class="card-img-top" alt="...">
//               <div class="card-body">
//                 <h5 class="card-title">${i.titulo}</h5> 
//                 <p class="card-text">${i.cuerpo}</p>
//                 <p class="card-text"><small class="text-body-secondary">${i.fecha}</small></p>
//               </div>
//             </div>
//             <div class="input-group mt-3">
//               <button type="button" class="btn btn-success" id="button-addon1" btnComentar>Comentar</button>
//               <input type="text" class="form-control" id="txtComentarios" placeholder="Escribe un comentario..." aria-label="Example text with button addon" aria-describedby="button-addon1">
//             </div>
//             <div div class="mb-4" id="comentarios">
      
//             </div>
//       </div>

//       `;
//       //Creando el evento click del boton de comentar
//       const btnComentar = document.querySelector("[btnComentar]");
//       //validacion para que no haya comentarios sin texto
//       btnComentar.addEventListener("click",()=>{
//         const fechaComentario =moment().format('DD/MM/YYYY HH:mm:ss');
//         textComentario = document.getElementById("txtComentarios");
//         comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

//         comentarios.push({
//         idBlog: i.idBlog,
//         user: datauser.user,
//         cuerpo: textComentario.value,
//         fecha: fechaComentario,
//         mostrar: false
//         });
//         localStorage.setItem("comentarios", JSON.stringify(comentarios));
//         alert("¡Se ha comentado con éxito!");
//         textComentario.value = "";
//       });
//       //Cargar comentarios
//       const comentariosBlog = JSON.parse(localStorage.getItem('comentarios')) || [];
//       if(comentariosBlog.length != 0){
//         ordenarPorFecha(comentariosBlog);
//         for (const j of comentariosBlog) {
//           if(i.idBlog == j.idBlog && j.mostrar){
//             const cargarComentarios = document.getElementById("comentarios");
//             const fechaComen = moment(j.fecha, "DD/MM/YYYY HH:mm:ss");
//             const fecharelComentario = fechaComen.fromNow();
//             cargarComentarios.innerHTML += `
//             <div class="card mt-3">
//               <h5 class="card-header"> <i class="bi bi-person-circle text-dark fs-3 "></i> ${j.user}</h5>
//               <div class="card-body">
//                 <p class="card-text">${j.cuerpo}</p>
//                 <p class="card-text"><small class="text-body-secondary">${fecharelComentario}</small></p>
//                 </div>
//             </div>
//             `
//           }
//         }
        
//       }
//     });
// }
// } else {
//   cargaBlogs.innerHTML = `
//   <div class="badge bg-secondary text-wrap fs-5" style="width: 100%;">
//   No hay ningun blog disponible
//   </div>
//   `;
// }

function ordenarPorFecha(arreglo){
  arreglo.sort((a, b) => {
    const fechaA = moment(a.fecha, 'DD/MM/YYYY HH:mm:ss');
    const fechaB = moment(b.fecha, 'DD/MM/YYYY HH:mm:ss');
    return fechaB.diff(fechaA);
  });
  return arreglo;
}
