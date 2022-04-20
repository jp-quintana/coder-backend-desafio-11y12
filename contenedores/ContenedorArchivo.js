const fs = require('fs')

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta.toString();
    }

    async listar(id) {
      try {
        const contenido = await fs.promises.readFile(`${this.ruta}`, 'utf-8');
        const mensajes = JSON.parse(contenido)

        const check = mensajes.filter(mensaje => mensaje.id === id)

        if (check.length === 0) {
          console.log(null);
        } else {
          console.log(check);
        }

      } catch (error) {
        console.log(error);
      }
    }

    async listarAll() {
      try {
        const contenido = await fs.promises.readFile(`${this.ruta}`, 'utf-8');
        const mensajes = JSON.parse(contenido)
        return mensajes;

      } catch (error) {
        console.log(error);
      }
    }

    async guardar(mensaje) {
      try {
        const contenido = await fs.promises.readFile(`${this.ruta}`, 'utf-8');
        const mensajes = JSON.parse(contenido)

        mensaje.id = mensajes.length + 1;
        mensajes.push(mensaje)

        await fs.promises.writeFile(`${this.ruta}`, JSON.stringify(mensajes))

        console.log(mensaje.id);

      } catch (error) {
        console.log(error);
      }

    }

    async actualizar(mens, id) {
      try {
        const contenido = await fs.promises.readFile(`${this.ruta}`, 'utf-8');

        const mensajeACambiar = contenido.find(mensaje => mensaje.id === id)

        if (productoACambiar.length === 0) {
          console.log({ error: 'producto no encontrado'})
        }

        const indice = contenido.indexOf(mensajeACambiar)

        contenido[indice] = mens
        contenido[indice].id = id

      } catch (error) {
        console.log(error);
      }





    }

    async borrar(id) {
      try {
        const contenido = await fs.promises.readFile(`${this.ruta}`, 'utf-8');
        const mensajes = JSON.parse(contenido)

        const mensaje = mensajes.find(mensaje => mensaje.id === id)

        if (!mensaje) {
          throw new Error(`No existe el mensaje con el id ${id}`)
        }

        const indice = mensajes.indexOf(mensaje)

        mensajes.splice(indice, 1)

        for (let i = 0; i < mensajes.length; i++) {
          mensajes[i].id = i + 1;
        }

        await fs.promises.writeFile(`${this.ruta}`, JSON.stringify(mensajes))

      } catch (error) {
        console.log(error);
      }
    }

    async borrarAll() {
      try {
        await fs.promises.writeFile(`${this.ruta}`, JSON.stringify([]))
      } catch (error) {
        console.log(error);
      }
    }
}

module.exports = ContenedorArchivo
