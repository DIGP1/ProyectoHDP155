//Codigo html del nav
const nav = `
<nav class="navbar navbar-expand-lg navbar-dark ">
    <div class="container-fluid colorPrincipal">
        <a class="navbar-brand fs-3" href="#">Conociendo El Salvador</a>
        <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div class="offcanvas-header colorPrincipal">
                <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body colorPrincipal">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li class="nav-item">
                        <a class="nav-link active " aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">Informacion</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">Acerca de</a>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-success" type="submit">Search</button>
                </form>
            </div>
        </div>
        <div class="dropdown ms-3">
            <a class="text-light dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person-circle fs-2"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
                <li>
                    <a class="dropdown-item" href="#">Mi perfil</a>
                </li>
                <li>
                    <a class="dropdown-item" href="#">Mis publicaciones</a>
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