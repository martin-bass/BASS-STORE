//VARIABLES GLOBALES
const archivoJson= "/productos.json";
let productos;
let productosDelCarrito = [];
let producto;
let pdCarrito;
let carrito= new Carrito();
let vaAlDOM=false;

let valorCarro= document.getElementById("carro"); // Esta es la variable que permite incrementar el contador del carro
let span= document.createElement('span');
span.innerHTML=`<span class="cart__count">${carrito.cantidad}</span>`;
valorCarro.appendChild(span);