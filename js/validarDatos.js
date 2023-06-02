export const validarContrasenia = (contrasenia) => {
  //validando si tiene espacios en blanco
  if (contrasenia.includes(' ')){
    //console.log('falso por espacios')
      return false
  }
  else {
      //Expresión regular para validar la contraseña
      const expresionRegular = /^(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/
      //test retorna true si la cadena cumple con el formato de la expresion regular sino retorna false
      return expresionRegular.test(contrasenia)
    }
}

export const validarUsuario = (nuevoUser) => {
  //arreglo que contiene los nombres aqui se llamara el localstorage
  let usuarios = ['usario1','usuario2']
  
  //validando si tiene espacios en blanco
  if (nuevoUser.includes(' ')){
    //console.log('falso por espacios')
      return false
  }
  //Validando nombre de usuario
  else if(usuarios.includes(nuevoUser)){
      //si se encuentra el usuario se retorna false
      return false
    }
  else {
      return true
    }
}