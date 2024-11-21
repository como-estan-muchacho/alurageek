let productos = [];
       

async function obtenerProductos() {
    try {
        const respuesta = await fetch("http://localhost:3001/producto");
        const productos = await respuesta.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

function mostrarProductos(productos) {
    const lista = document.getElementById('lista-productos');
    productos.forEach(producto => {
        const item = document.createElement('li');
        item.className = 'producto__tarjeta';
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <h3>${producto.titulo}</h3>
            <p>$: ${producto.precio}</p>
            <button class="boton-eliminar" onclick="eliminarProducto('${producto.id}')"></button>
        `;
        lista.appendChild(item);
        
    });
}


async function agregarProducto(evento) {
    evento.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById('imagen').value;

    const nuevoProducto = {
        titulo,
        precio,
        imagen
    };

    try {
        const respuesta = await fetch("http://localhost:3001/producto", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProducto)
        });

        if (!respuesta.ok) {
            throw new Error('No fue posible agregar el producto');
        }

        const productoAgregado = await respuesta.json();
        mostrarProductos([...productos, productoAgregado]); // Actualizar la lista de productos
    } catch (error) {
        console.error('Error al agregar el producto:', error);
    }
}

async function eliminarProducto(id) {
    try {
        const respuesta = await fetch(`http://localhost:3001/producto/${id}`, {
            method: 'DELETE'
        });

        if (!respuesta.ok) {
            throw new Error('No fue posible eliminar el producto');
        }

        // Actualizar la lista de productos después de eliminar el producto
        productos = productos.filter(producto => producto.id !== id);
        mostrarProductos(productos);
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
}


document.getElementById('formulario-producto').addEventListener('submit', agregarProducto);
 


obtenerProductos();
