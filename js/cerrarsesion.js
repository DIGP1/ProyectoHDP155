const cerrarsesion = () => {
    const user = JSON.parse(localStorage.getItem('login_success')) || false;

    //esta linea se comento para poder editar el html del blog, sino se deberia estar registrado si o si
    //  if(!user){
    //      window.location.href = 'InicioSesion.html';
    // }

    const logout = document.querySelector('#logout');
    
    logout.addEventListener('click', ()=>{
        alert('Hasta pronto!')
        localStorage.removeItem('login_success')
        window.location.href = 'InicioSesion.html'
    });
}

export default cerrarsesion