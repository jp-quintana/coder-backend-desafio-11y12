class ContenedorMemoria {
  constructor() {
      this.productos = []
  }

  listar(id) {
    const productoAListar = this.productos.filter(producto => producto.id === id);

    if (productoAListar.length === 0) {
      return { error: 'producto no encontrado'}
    }

    return productoAListar

  }

  listarAll() {
    return this.productos;
  }

  guardar(prod) {
    prod.id = this.productos.length + 1;
    this.productos.push(prod)
    console.log(prod.id);
  }

  actualizar(prod, id) {
    const productoACambiar = this.productos.find(producto => producto.id === id);

    if (productoACambiar.length === 0) {
      return { error: 'producto no encontrado'}
    }

    const indice = this.productos.indexOf(productoACambiar)

    this.productos[indice] = prod
    this.productos[indice].id = id


  }

  borrar(id) {
    let producto = this.productos.find(producto => producto.id === id)

    if (!producto) {
      return { error: 'producto no encontrado'}
    }

    const indice = this.productos.indexOf(producto)

    this.productos.splice(indice, 1)

    for (let i = 0; i < this.productos.length; i++) {
      this.productos[i].id = i + 1;
    }
  }
}

module.exports = ContenedorMemoria
