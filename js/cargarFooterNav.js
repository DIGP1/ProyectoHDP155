const cargarFooterNav = () => {
    //Codigo html del nav
    const userLogin = JSON.parse(localStorage.getItem('login_success')) || [];
    let validaradmin = false;
    if(userLogin.user == "ADMIN"){
        validaradmin = true;
    }
    let li = "";
    let ruta = "";
   if(!validaradmin){
    li= "Mi perfil";
    ruta = "../apartados/usuarios.html"
   }else{
    li= "Administrar";
    ruta = "../apartados/admin.html"
   }
    const nav = `
    <nav class="navbar navbar-expand-lg navbar-dark ">
        <div class="container-fluid d-flex colorPrincipal" pri>
        <a class="navbar-brand fs-3 " href="../apartados/Blog.html">Conociendo El Salvador</a>
            
            <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div class="offcanvas-header colorPrincipal">
                    <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Realizar busqueda:</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body d-flex flex-lg-row flex-md-column colorPrincipal">
                    <ul class="mt-lg-0 mt-md-3 navbar-nav justify-content-lg-end align-items-start flex-grow-1 pe-3">
                        <li class="nav-item">
                            <a data-home class="nav-link active " aria-current="page" href="../apartados/Blog.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a data-acercaDe class="nav-link" aria-current="page" href="#">Acerca de</a>
                        </li>
                    </ul>
                    <form class="d-flex order-md-first order-lg-last" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
            <div class="dropdown ms-3">
                <a class="text-light dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-person-circle text-white fs-2"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" >
                    <li>
                        <a id="data-pf" class="dropdown-item" href="${ruta}">${li}</a>
                    </li>
                    <li>
                        <button class="dropdown-item" id="logout">Salir</button> 
                    </li>
                </ul>
            </div>
        </div>
    </nav>`
    
    //insercion del codigo html al data donde ira el nav
    document.querySelector('[data-nav]').innerHTML = nav
    
    //Codigo html del footer
    const footer = `<div class="container d-flex justify-content-center py-3">
                        <button type="button" class="btn btn-primary btn-lg btn-floating mx-2" style="background-color: #54456b;">
                            <i class="fab fa-facebook-f"></i>
                        </button>
                        <button type="button" class="btn btn-primary btn-lg btn-floating mx-2" style="background-color: #54456b;">
                            <i class="fab fa-youtube"></i>
                        </button>
                        <button type="button" class="btn btn-primary btn-lg btn-floating mx-2" style="background-color: #54456b;">
                            <i class="fab fa-instagram"></i>
                        </button>
                        <button type="button" class="btn btn-primary btn-lg btn-floating mx-2" style="background-color: #54456b;">
                            <i class="fab fa-twitter"></i>
                        </button>
                        </div>
    
                        <!-- Copyright -->
                        <div class="text-center text-white p-2">
                        © 2023 Copyright:
                    </div>`
    //insercion del codigo html al data donde ira el footer
    document.querySelector('[data-footer]').innerHTML = footer

    //Creacion de enventos click para generar animaciones en el nav
    const home = document.querySelector('[data-home]')
    const informacion = document.querySelector('[data-informacion]')
    const acercaDe = document.querySelector('[data-acercaDe]')

    home.addEventListener('click', function(){
        informacion.classList.remove('active')
        acercaDe.classList.remove('active')
        home.classList.remove('active')
        home.classList.add('active')
        
        console.log(home.classList);
    });

    informacion.addEventListener('click', function(){
        informacion.classList.remove('active')
        acercaDe.classList.remove('active')
        home.classList.remove('active')
        informacion.classList.add('active')
        
        console.log(home.classList);
    });

    acercaDe.addEventListener('click', function(){
        informacion.classList.remove('active')
        acercaDe.classList.remove('active')
        home.classList.remove('active')
        acercaDe.classList.add('active')
        
        console.log(home.classList);
    });
}

export default cargarFooterNav