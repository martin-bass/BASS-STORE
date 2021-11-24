//VARIABLES
const archivoJson= "/productos.json";
let productos;
let productosDelSitio=[];
let bajoElegido;
let cuentaProductos= 0;
let productosDelCarrito = [];
let producto;
let indiceParaEliminar;
let valorCarro= document.getElementById("carro"); // Esta es la variable que permite incrementar el contador del carro
let span= document.createElement('span');
span.innerHTML=`<span class="cart__count">${cuentaProductos}</span>`;
valorCarro.appendChild(span);