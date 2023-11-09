// Función para calcular el total del carrito
function calcularTotalCarrito() {
    let carrito = document.getElementById("carrito");
    let productosCarrito = carrito.getElementsByClassName("carrito_producto");
    let total = 0;

    for (let i = 0; i < productosCarrito.length; i++) {
        let producto = productosCarrito[i];
        let precioTexto = producto.querySelector(".producto_price").textContent;
        let precio = parseInt(precioTexto.slice(2)); // Quitamos el "$ " y convertimos a número
        total += precio;
    }

    return total;
}

// Actualizar el total del carrito cuando se agrega o elimina un producto
function actualizarTotalCarrito() {
    let totalCarritoElemento = document.getElementById("totalCarrito");
    let totalCarrito = calcularTotalCarrito();
    totalCarritoElemento.textContent = "TOTAL CARRITO: $" + totalCarrito;
}



let productos;

if (localStorage.getItem('productos')) {
    productos = JSON.parse(localStorage.getItem('productos'));
} else {
    // Inicializa los productos si no hay datos en localStorage
    productos = [
        {
            id: 1,
            nombre: "DECK TOY MACHINE",
            imagen: "./assest/toy-machine-skateboard-decks-vice-dead-monster-natural-vorderansicht_600x600.webp",
            precio: 30000,
            cantidad: 10
        },
        {
            id: 2,
            nombre: "RUEDAS BONES",
            imagen: "./assest/bones-wheels-rollen-stf-retros-99a-v1-standart-white-oberansicht-0135050_600x600.webp",
            precio: 20000,
            cantidad: 10
        },
        {
            id: 3,
            nombre: "TRUCKS INDEPENDENT",
            imagen: "./assest/independent-achsen-149-stage-11-bar-flat-black-standard-black-vorderansicht-0122891_600x600.webp",
            precio: 40000,
            cantidad: 10
        },
        {
            id: 3,
            nombre: "TRUCKS INDEPENDENT",
            imagen: "./assest/independent-achsen-149-stage-11-bar-flat-black-standard-black-vorderansicht-0122891_600x600.webp",
            precio: 40000,
            cantidad: 10
        }

    ];

    // Guarda los productos inicializados en localStorage
    localStorage.setItem('productos', JSON.stringify(productos));
}

//filtro de busqueda
let filtroInput = document.getElementById("searchInput");
let productosOriginales = [...productos]; // Haz una copia de los productos originales

filtroInput.addEventListener("input", function() {
    let filtroTexto = this.value.toLowerCase();

    productosSection.innerHTML = ""; // Limpiar la sección de productos

    let productosFiltrados = productosOriginales.filter(function(producto) {
        let nombreProducto = producto.nombre.toLowerCase();
        return nombreProducto.includes(filtroTexto);
    });

    productosFiltrados.forEach(function(producto) {
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        let cardImgDiv = document.createElement("div");
        cardImgDiv.classList.add("card_img");

        let img = document.createElement("img");
        img.src = producto.imagen;
        img.alt = producto.nombre;

        let h2 = document.createElement("h2");
        h2.classList.add("card_tittle");
        h2.textContent = producto.nombre;

        let cardContentDiv = document.createElement("div");
        cardContentDiv.classList.add("cart_content");

        let p = document.createElement("p");
        p.classList.add("card_price");
        p.textContent = "$ " + producto.precio;

        let cardCartDiv = document.createElement("div");
        cardCartDiv.classList.add("card_cart");

        let addToCartButton = document.createElement("img");
        addToCartButton.src = "./assest/cart3.svg";
        addToCartButton.alt = "";
        addToCartButton.classList.add("logoSearch");
        addToCartButton.dataset.id = producto.id;

        cardImgDiv.appendChild(img);
        cardCartDiv.appendChild(addToCartButton);
        cardContentDiv.appendChild(p);
        cardContentDiv.appendChild(cardCartDiv);
        cardDiv.appendChild(cardImgDiv);
        cardDiv.appendChild(h2);
        cardDiv.appendChild(cardContentDiv);

        productosSection.appendChild(cardDiv);
    });
});



let productosSection = document.getElementById("productos");
productos.forEach(function(producto) {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    let cardImgDiv = document.createElement("div");
    cardImgDiv.classList.add("card_img");

    let img = document.createElement("img");
    img.src = producto.imagen;
    img.alt = producto.nombre;

    let h2 = document.createElement("h2");
    h2.classList.add("card_tittle");
    h2.textContent = producto.nombre;

    let cardContentDiv = document.createElement("div");
    cardContentDiv.classList.add("cart_content");

    let p = document.createElement("p");
    p.classList.add("card_price");
    p.textContent = "$ " + producto.precio;

    let cardCartDiv = document.createElement("div");
    cardCartDiv.classList.add("card_cart");

    let addToCartButton = document.createElement("img");
    addToCartButton.src = "./assest/cart3.svg";
    addToCartButton.alt = "";
    addToCartButton.classList.add("logoSearch");
    addToCartButton.dataset.id = producto.id;

    cardImgDiv.appendChild(img);
    cardCartDiv.appendChild(addToCartButton);
    cardContentDiv.appendChild(p);
    cardContentDiv.appendChild(cardCartDiv);
    cardDiv.appendChild(cardImgDiv);
    cardDiv.appendChild(h2);
    cardDiv.appendChild(cardContentDiv);
    productosSection.appendChild(cardDiv);
    calcularTotalCarrito();
    actualizarTotalCarrito();
});

let addToCartButtons = document.querySelectorAll(".card_cart img");

addToCartButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        let productoSeleccionado = productos.find(producto => producto.id == this.dataset.id);

        if (productoSeleccionado.cantidad > 0) {
            // Producto disponible

            let li = document.createElement("li");
            li.classList.add("carrito_producto");

            let divInfo = document.createElement("div");
            divInfo.classList.add("producto_info");

            let divImg = document.createElement("div");
            divImg.classList.add("producto_img");

            let img = document.createElement("img");
            img.src = productoSeleccionado.imagen;
            img.alt = "producto";

            let h2 = document.createElement("h2");
            h2.classList.add("producto_tittle");
            h2.textContent = productoSeleccionado.nombre;

            let p = document.createElement("p");
            p.classList.add("producto_price");
            p.textContent = "$ " + productoSeleccionado.precio;

            let divDelete = document.createElement("div");
            divDelete.classList.add("producto_delete");

            let imgDelete = document.createElement("img");
            imgDelete.src = "./assest/trash-fill.svg";
            imgDelete.alt = "delete";

            // Asignamos el id del producto al botón de eliminar
            imgDelete.dataset.id = productoSeleccionado.id;

            imgDelete.addEventListener("click", function() {
                let productoId = this.dataset.id;

                let index = productos.findIndex(producto => producto.id == productoId);

                if (index !== -1) {
                    let producto = productos[index];
                    producto.cantidad++; // Aumenta la cantidad de nuevo

                    let elementoEliminar = this.parentElement.parentElement.parentElement;
                    elementoEliminar.remove();
                }
                
                actualizarTotalCarrito();
            });

            divDelete.appendChild(imgDelete);
            divImg.appendChild(img);
            divInfo.appendChild(divImg);
            divInfo.appendChild(h2);
            divInfo.appendChild(p);
            divInfo.appendChild(divDelete);
            li.appendChild(divInfo);
            carrito.appendChild(li);

            calcularTotalCarrito();
            actualizarTotalCarrito();

        } else {
            alert("Producto agotado");
        }
    });
});



let clearCartButton = document.querySelector(".clearCart");
let confirmBuyButton = document.querySelector(".confirmBuy");

// Vaciar carrito
clearCartButton.addEventListener("click", function() {
    let carrito = document.getElementById("carrito");
    carrito.innerHTML = ""; // Vaciar el contenido del carrito en el HTML
    alert("Carrito vaciado");
    actualizarTotalCarrito();
});

// Confirmar compra
confirmBuyButton.addEventListener("click", function() {
    let carrito = document.getElementById("carrito");
    if (carrito.children.length > 0) {
        // Si hay elementos en el carrito
        alert("Compra confirmada");
        // Iterar sobre los elementos del carrito y actualizar la cantidad en productos
        carrito.querySelectorAll(".carrito_producto").forEach(function(productoCarrito) {
            let productoId = productoCarrito.querySelector(".producto_delete img").dataset.id;
            let producto = productos.find(producto => producto.id == productoId);
            producto.cantidad--;
        });

        // Actualizar el localStorage
        localStorage.setItem('productos', JSON.stringify(productos));
        carrito.innerHTML = ""; // Vaciar el contenido del carrito en el HTML

    } else {
        alert("El carrito está vacío");
    }
    
    actualizarTotalCarrito();
});

let cart = document.getElementById("cartNav");
let cartTab = document.getElementById("cartTab");
cart.addEventListener("click", openCart);

function openCart() {
    cartTab.style.display = (cartTab.style.display === 'block') ? 'none' : 'block';
}

document.addEventListener('click', (event) => {
    if (!event.target.matches('.imgCart, .cartTab')) {
        cartTab.style.display = 'none';
    }
});
