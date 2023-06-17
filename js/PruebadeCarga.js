/*const imgPrueba = JSON.parse(localStorage.getItem('blogs'));
const divpadre = document.querySelector("[pruebaCargar]");

for (const i of imgPrueba) {
    const cargarImg = document.createElement("img");
    cargarImg.src = i.banner;
    cargarImg.style.width = "20%";
    divpadre.appendChild(cargarImg);
}*/
moment.locale("es");
const infoBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
const cargaBlogs = document.querySelector("[loadBlogs]");

infoBlogs.sort((a, b) => {
  const fechaA = moment(a.fecha, 'DD/MM/YYYY HH:mm:ss');
  const fechaB = moment(b.fecha, 'DD/MM/YYYY HH:mm:ss');
  return fechaB.diff(fechaA);
});

if(infoBlogs.length != 0){
  cargaBlogs.innerHTML = "";
  for (const i of infoBlogs) {
    const fecha = moment(i.fecha, "DD/MM/YYYY HH:mm:ss");
    const fecharelativa = fecha.fromNow();
    const textoAlert = i.cuerpo.substring(0, 60)+"...";
    const titu = i.titulo.replace(/\s/g, "-");
    const tarjetaBlog = `
    <div class="col-md-6 col-lg-4 mb-4" id="${titu}">
      <div class="card h-100">
        <div class="position-relative"><img class="w-100 rounded-top" src="${i.banner}"/></div>
        <div class="card-body px-0 py-3">
          <h5 class="p-1 mb-0 font-sans-serif fw-bold fs-md-0 fs-lg-1">${i.titulo}</h5>
          <h6 class="p-1 pt-1">
            ${textoAlert}
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

    cargaBlogs.innerHTML += tarjetaBlog;

    let btnBlog = document.getElementById(titu);
    btnBlog.addEventListener("click", ()=>{
      cargaBlogs.innerHTML = `
      <button type="submit" class="btn btn-danger" id="regresar">Regresar</button>
      <h1> ${i.titulo}</h1>
      <img src="${i.banner}">
      <div> ${i.cuerpo}</div>
      <span> Fecha de publicacion: ${i.fecha}</span>
      `
      const btnRegresar = document.getElementById("regresar");
      btnRegresar.addEventListener("click", () =>{
        location.reload();
      });
    });


  }
}else{
  cargaBlogs.innerHTML = `<div class="badge bg-secondary text-wrap fs-4" >
  No hay ningun blog aun!
</div>`
}




