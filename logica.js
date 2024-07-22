let carrito = [];

function mostrarMenu() {
    let opcion = prompt("Seleccione una opción:\n0. Volver al menú principal\n1. Mostrar todos los productos\n2. Filtrar por categoría\n3. Filtrar por precio\n4. Ver mi carrito\n5. Comprar\n6. Salir");
    switch (opcion) {
        case '0':
            mostrarMenu();
            break;
        case '1':
            mostrarTodosLosProductos();
            break;
        case '2':
            filtrarPorCategoria();
            break;
        case '3':
            filtrarPorPrecio();
            break;
        case '4':
            verCarrito();
            break;
        case '5':
            comprar();
            break;
        case '6':
            alert("Gracias por visitar nuestra tienda!");
            break;
        default:
            alert("Opción no válida. Inténtelo de nuevo.");
            mostrarMenu();
            break;
    }
}

function mostrarTodosLosProductos() {
    let productosListado = productos.map((producto, index) => `${index + 1}. ${producto.toString()}`).join("\n");
    let seleccion;
    do {
        seleccion = parseInt(prompt(`0. Volver al menú\n${productosListado}\nIngrese el número del producto que desea añadir al carrito:`));
        if (seleccion === 0) {
            mostrarMenu();
            return;
        } else if (seleccion > 0 && seleccion <= productos.length) {
            carrito.push(productos[seleccion - 1]);
            alert(`${productos[seleccion - 1].nombre} ha sido añadido al carrito.`);
        } else {
            alert("Selección no válida.");
        }
    } while (seleccion !== 0);
    mostrarMenu();
}

function filtrarPorCategoria() {
    let categoria = prompt("Ingrese la categoría a filtrar:\n0. Volver al menú\n1. Fruta\n2. Verdura\n3. Legumbres\n4. Cosmeticos");
    let categoriaNombre = "";
    switch (categoria) {
        case '0':
            mostrarMenu();
            return;
        case '1':
            categoriaNombre = "Fruta";
            break;
        case '2':
            categoriaNombre = "Verdura";
            break;
        case '3':
            categoriaNombre = "Legumbres";
            break;
        case '4':
            categoriaNombre = "Cosmeticos";
            break;
        default:
            alert("Categoría no válida. Inténtelo de nuevo.");
            filtrarPorCategoria();
            return;
    }

    let productosFiltrados = productos.filter(producto => producto.categoria === categoriaNombre);
    if (productosFiltrados.length > 0) {
        let productosListado = productosFiltrados.map((producto, index) => `${index + 1}. ${producto.toString()}`).join("\n");
        let seleccion;
        do {
            seleccion = parseInt(prompt(`0. Volver al menú\n${productosListado}\nIngrese el número del producto que desea añadir al carrito:`));
            if (seleccion === 0) {
                mostrarMenu();
                return;
            } else if (seleccion > 0 && seleccion <= productosFiltrados.length) {
                carrito.push(productosFiltrados[seleccion - 1]);
                alert(`${productosFiltrados[seleccion - 1].nombre} ha sido añadido al carrito.`);
            } else {
                alert("Selección no válida.");
            }
        } while (seleccion !== 0);
    } else {
        alert("No se encontraron productos en esa categoría.");
    }
    filtrarPorCategoria();
}

function filtrarPorPrecio() {
    let precioMin = parseFloat(prompt("Ingrese el precio mínimo:"));
    let precioMax = parseFloat(prompt("Ingrese el precio máximo:"));
    let productosFiltrados = productos.filter(producto => producto.precio >= precioMin && producto.precio <= precioMax);
    if (productosFiltrados.length > 0) {
        let productosListado = productosFiltrados.map((producto, index) => `${index + 1}. ${producto.toString()}`).join("\n");
        let seleccion;
        do {
            seleccion = parseInt(prompt(`0. Volver al menú\n${productosListado}\nIngrese el número del producto que desea añadir al carrito:`));
            if (seleccion === 0) {
                mostrarMenu();
                return;
            } else if (seleccion > 0 && seleccion <= productosFiltrados.length) {
                carrito.push(productosFiltrados[seleccion - 1]);
                alert(`${productosFiltrados[seleccion - 1].nombre} ha sido añadido al carrito.`);
            } else {
                alert("Selección no válida.");
            }
        } while (seleccion !== 0);
    } else {
        alert("No se encontraron productos en ese rango de precio.");
    }
    filtrarPorPrecio();
}

function verCarrito() {
    if (carrito.length > 0) {
        let opcion;
        do {
            let carritoListado = generarListadoCarrito();
            let total = calcularTotalCarrito();
            
            opcion = prompt(`Carrito:\n${carritoListado}\nTotal: $${total}\n\nSeleccione una opción:\n1. Eliminar un producto\n2. Volver al menú`);
            
            switch (opcion) {
                case '1':
                    eliminarProductoDelCarrito();
                    break;
                case '2':
                    mostrarMenu();
                    break;
                default:
                    alert("Opción no válida. Inténtelo de nuevo.");
                    break;
            }
        } while (opcion !== '2' && carrito.length > 0);

        if (carrito.length === 0) {
            alert("El carrito está vacío.");
            mostrarMenu();
        }
    } else {
        alert("El carrito está vacío.");
        mostrarMenu();
    }
}

function generarListadoCarrito() {
    let carritoContador = contarProductosEnCarrito();
    return Object.keys(carritoContador).map((nombre, index) => 
        `${index + 1}. ${nombre}, Cant. ${carritoContador[nombre]}, Precio: $${(carritoContador[nombre] * obtenerPrecioProducto(nombre)).toFixed(2)}`
    ).join("\n");
}

function contarProductosEnCarrito() {
    return carrito.reduce((contador, producto) => {
        contador[producto.nombre] = (contador[producto.nombre] || 0) + 1;
        return contador;
    }, {});
}

function obtenerPrecioProducto(nombre) {
    return productos.find(p => p.nombre === nombre).precio;
}

function calcularTotalCarrito() {
    return carrito.reduce((sum, producto) => sum + producto.precio, 0).toFixed(2);
}

function eliminarProductoDelCarrito() {
    let carritoContador = contarProductosEnCarrito();
    let carritoListado = Object.keys(carritoContador).map((nombre, index) => 
        `${index + 1}. ${nombre}, Cant. ${carritoContador[nombre]}`
    ).join("\n");

    let seleccion;
    do {
        seleccion = parseInt(prompt(`0. Volver al menú\nSeleccione el producto a eliminar:\n${carritoListado}`));
        if (seleccion === 0) {
            return;
        } else if (seleccion > 0 && seleccion <= Object.keys(carritoContador).length) {
            let nombreProducto = Object.keys(carritoContador)[seleccion - 1];
            let productoIndex = carrito.findIndex(producto => producto.nombre === nombreProducto);
            if (productoIndex !== -1) {
                carrito.splice(productoIndex, 1);
                alert("Una cantidad del producto ha sido eliminada del carrito.");
            }
            return;
        } else {
            alert("Selección no válida.");
        }
    } while (true);
}

function comprar() {
    if (carrito.length > 0) {
        let carritoContador = contarProductosEnCarrito();
        let carritoListado = Object.keys(carritoContador).map((nombre, index) => 
            `${index + 1}. ${nombre}, Cant. ${carritoContador[nombre]}, Precio total: $${(carritoContador[nombre] * obtenerPrecioProducto(nombre)).toFixed(2)}`
        ).join("\n");
        let total = calcularTotalCarrito();

        alert(`Compra realizada con éxito!\n\nProductos seleccionados:\n${carritoListado}\n\nTotal gastado: $${total}`);

        carrito = []; // vacia el carrito
    } else {
        alert("El carrito está vacío. No se puede realizar la compra.");
    }
    mostrarMenu();
}
mostrarMenu();