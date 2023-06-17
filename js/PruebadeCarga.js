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

if (infoBlogs.length != 0) {
  const elementosGenerados = []; // Array para almacenar los elementos generados

  for (const i of infoBlogs) {
    const fecha = moment(i.fecha, "DD/MM/YYYY HH:mm:ss");
    const fecharelativa = fecha.fromNow();
    const textoAlerta = i.cuerpo.substring(0, 200) + "...";
    let titu = i.titulo.substring(0, 5);
    const numeroAleatorio = Math.floor(Math.random() * 10000);
    titu = titu.replace(/\s/g, "") + numeroAleatorio.toString();

    const tarjetaBlog = `
    <div class="col-md-6 col-lg-4 mb-4">
      <div class="card h-100" data-titu="${titu}">
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
      `;
    });
  }
} else {
  cargaBlogs.innerHTML = `
  <div class="badge bg-secondary text-wrap fs-5" style="width: 100%;">
  No hay ningun blog disponible
  </div>
  `;
}




