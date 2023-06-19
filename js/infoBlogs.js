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
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const cuerpo = tinymce.get('myTextarea').getContent();
    const banner = document.getElementById("banner").files[0];

    const fechaBlog =moment().format('DD/MM/YYYY HH:mm:ss');
    const mensaje = document.getElementById("mensaje");
    mensaje.style.display = "none"; 

    if (titulo.trim() === "" || cuerpo.trim() === "" || !banner) {
        mensaje.style.display = "block";
        mensaje.style.textAlign = "center";
        mensaje.style.color = "red";
        mensaje.textContent = "Por favor, completa todos los campos";
        return; 
    }
    else {
        mensaje.textContent = "";
        mensaje.style.display = "none";
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        blogs.push({
            idBlog: uuid.v4(),
            titulo: titulo,
            cuerpo: cuerpo,
            banner: direcbanner,
            fecha: fechaBlog
        });
        localStorage.setItem("blogs", JSON.stringify(blogs));
        alert("¡Se ha guardado el blog con éxito!");

        // Limpiar los campos después de guardar
        document.getElementById("titulo").value = "";
        tinymce.get('myTextarea').setContent("");
        document.getElementById("banner").value = "";
        document.getElementById("verBanner").src = "#";
        window.location.href = '../apartados/admin.html' ;
    }

});

// const btnG = document.querySelector("#btnGuardar");
// moment.locale("es");
// btnG.addEventListener("click", (e) => {
//     e.preventDefault()
//     titulo = document.getElementById("titulo").value;
//     cuerpo = tinymce.get('myTextarea').getContent();
//     const fechaBlog =moment().format('DD/MM/YYYY HH:mm:ss');

//     blogs = JSON.parse(localStorage.getItem("blogs")) || [];
//     blogs.push({
//         idBlog: uuid.v4(),
//         titulo: titulo,
//         cuerpo: cuerpo,
//         banner: direcbanner,
//         fecha: fechaBlog
//     });
//     localStorage.setItem("blogs", JSON.stringify(blogs));
//     alert("¡Se ha guardado el blog con éxito!");
// });

const btnCancelar = document.querySelector("[btn-cancelar]");

btnCancelar.addEventListener("click", (e)=>{
    e.preventDefault();
    window.location.href = '../apartados/Blog.html' ;
});
  