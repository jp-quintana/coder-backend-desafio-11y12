const socket = io.connect();

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {

  const productoNuevo = {
    nombre: document.getElementById('nombre').value,
    precio: document.getElementById('precio').value,
    url: document.getElementById('foto').value
  }
  socket.emit('nuevo-producto', productoNuevo);
  return false;
})

socket.on('productos', async productos => {
  try {
    const tabla = await makeHtmlTable(productos)
    document.getElementById('productos').innerHTML = tabla;
  } catch (error) {
    console.log(error);
  }
});

function makeHtmlTable(productos) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const checkEmail = () => {
  if (inputUsername.value.match(validEmailRegex)) {
    inputMensaje.disabled = false
    btnEnviar.disabled = false
  } else {
    inputMensaje.disabled = true
    btnEnviar.disabled = true
  }
}

const agregarMensaje = e => {
  const nuevoMensaje = {
    autor: inputUsername.value,
    fecha: new Date().toLocaleDateString(),
    hora: new Date().toLocaleTimeString(),
    texto: inputMensaje.value
  }
  socket.emit('nuevo-mensaje', nuevoMensaje);
  return false;
}

// const formPublicarMensaje = document.getElementById('formPublicarMensaje')
// formPublicarMensaje.addEventListener('submit', e => {
//   const nuevoMensaje = {
//     autor: inputUsername.value,
//     fecha: new Date().toLocaleDateString(),
//     hora: new Date().toLocaleTimeString(),
//     texto: inputMensaje.value
//   }
//   socket.emit('nuevo-mensaje', nuevoMensaje);
//   return false;
// })

socket.on('mensajes', mensajes => {
  makeHtmlList(mensajes)
})

function makeHtmlList(mensajes) {
  const html = mensajes.map((mensaje) => {
    return `<div>
      <span style="color:blue;">
        <strong>${mensaje.autor}</strong>
      </span>
      <span style="color:red;">
        [${mensaje.fecha} ${mensaje.hora}]
      </span>
      :
      <span style="color:green;">
        <i>${mensaje.texto}</i>
      </span>
    </div>`
  }).join(" ")

  document.getElementById('mensajes').innerHTML = html;
}
