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

ordenarPorFecha(infoBlogs);

if (infoBlogs.length != 0) {
  const elementosGenerados = []; // Array para almacenar los elementos generados

  for (const i of infoBlogs) {
    const datauser = JSON.parse(localStorage.getItem("login_success"));
    const fecha = moment(i.fecha, "DD/MM/YYYY HH:mm:ss");
    const fecharelativa = fecha.fromNow();
    const textoAlerta = i.cuerpo.substring(0, 200) + "...";

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

    elementoGenerado.addEventListener("click", () => {
      cargaBlogs.innerHTML = `
      <h1> ${i.titulo}</h1>
      <img src="${i.banner}"></img>
      <p>${i.cuerpo}</p>
      <span>Fecha de publicacion: ${i.fecha}</span>

      <div class="mt-5 mb-5">
      <label for="comentarios" class="form-label fs-4">Comentarios:</label>
       <div class="row">
        <div class="col-auto">
          <i class="bi bi-person-circle text-dark fs-2"></i>
        </div>
        <div class="col-4">
          <textarea class="form-control" id="txtComentarios"></textarea>
        </div>
        <div class="col-1 d-flex align-self-center">
          <div class="btn btn-success " btnComentar>Comentar</div>
        </div>
       </div>
       <div div class="mt-5 mb-5 container-fluid" id="comentarios">
      
       </div
    </div>
      `;
      //Creando el evento click del boton de comentar
      const btnComentar = document.querySelector("[btnComentar]");
      //validacion para que no haya comentarios sin texto
      btnComentar.addEventListener("click",()=>{
        const fechaComentario =moment().format('DD/MM/YYYY HH:mm:ss');
        textComentario = document.getElementById("txtComentarios");
        comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

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
      //Cargar comentarios
      const comentariosBlog = JSON.parse(localStorage.getItem('comentarios')) || [];
      if(comentariosBlog.length != 0){
        ordenarPorFecha(comentariosBlog);
        for (const j of comentariosBlog) {
          if(i.idBlog == j.idBlog && j.mostrar){
            const cargarComentarios = document.getElementById("comentarios");
            const fechaComen = moment(j.fecha, "DD/MM/YYYY HH:mm:ss");
            const fecharelComentario = fechaComen.fromNow();
            cargarComentarios.innerHTML += `
            <div class="container-sm border border-2 rounded mt-3 mb-1">
            <div class="fs-6 text-dark">${fecharelComentario}</div>
            <div class="row">
               <div class="col-auto">
                  <i class="bi bi-person-circle text-ligth fs-3 "></i>
               </div>
               <div class="col-auto d-flex align-items-center">
               <div class="fs-5 text-ligth">${j.user}</div>
               </div>
            </div>
              <div class="row">
                <div class="col-6">
                  <span class="text-wrap fs-4 text-ligth">${j.cuerpo}</span>
                </div>
              </div>
            </div>
            `;
          }
        }
        
      }
    });
}
} else {
  cargaBlogs.innerHTML = `
  <div class="badge bg-secondary text-wrap fs-5" style="width: 100%;">
  No hay ningun blog disponible
  </div>
  `;
}

function ordenarPorFecha(arreglo){
  arreglo.sort((a, b) => {
    const fechaA = moment(a.fecha, 'DD/MM/YYYY HH:mm:ss');
    const fechaB = moment(b.fecha, 'DD/MM/YYYY HH:mm:ss');
    return fechaB.diff(fechaA);
  });
  return arreglo;
}
