let bannerSubido = document.getElementById('banner');
let direcbanner; 
bannerSubido.addEventListener('change', function(event) {
let banner = event.target.files[0]; 
    direcbanner = banner;
    let reader = new FileReader();
      
    reader.onload = function(e) {
    let verBanner = document.getElementById('verBanner');
    verBanner.src = e.target.result; 
    direcbanner = e.target.result;
    verBanner.style.display = 'block';
    verBanner.style.width = "30%";
    verBanner.style.height = "10rem";

    }
      

reader.readAsDataURL(banner);
});

tinymce.init({
    selector: '#myTextarea'
  });
const btnG = document.querySelector("#btnGuardar");
moment.locale("es");
btnG.addEventListener("click", (e) => {
    e.preventDefault()
    titulo = document.getElementById("titulo").value;
    cuerpo = tinymce.get('myTextarea').getContent();
    const fechaBlog =moment().format('DD/MM/YYYY HH:mm:ss');

    blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.push({
        idBlog: uuid.v4(),
        titulo: titulo,
        cuerpo: cuerpo,
        banner: direcbanner,
        fecha: fechaBlog
    });
    localStorage.setItem("blogs", JSON.stringify(blogs));
    alert("¡Se ha guardado el blog con éxito!");
});

const btnCancelar = document.querySelector("[btn-cancelar]");

btnCancelar.addEventListener("click", (e)=>{
    e.preventDefault();
    window.location.href = '../apartados/Blog.html' ;
});
  