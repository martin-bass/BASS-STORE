//VARIABLES GLOBALES
const archivoJson= "Productos/productos.json";
let productos;
let productosDelCarrito = [];
let pdCarrito;
let carrito= new Carrito();
let vaAlDOM=false;

let valorCarro= document.getElementById("carro"); // Esta es la variable que permite incrementar el contador del carro
let span= document.createElement('span');
valorCarro.appendChild(span);