//****************FUNCIONES PARA INICIALIZAR EL PROYECTO******************************************
$(document).ready(function () {
    funcionCascaron();
});

async function funcionCascaron (){
    await cargarProductos();
};

async function cargarProductos (){  //Levantamos el archivo JSON y pintamos los cards en el DOM
    await $.getJSON(archivoJson, 
        function (data, textStatus) {
            if (textStatus==="success"){
                productos=data;
                for (producto of productos) {
                    
                    $(".cards").append(
                        `<div class="card card2" id="${producto.id}">
                            <div class="cont-img">
                                <img src="${producto.imagen}" class="card-img-top img-responsive" alt="...">     
                            </div>    
                            <div class="card-body card-productos">
                                <h5 class="card-title">${producto.producto} ${producto.marca}</h5>
                                <h6>$ ${producto.precio}</h6>
                                <p class="card-text">${producto.marca} ${producto.modelo}</B></p>
                                <div id="msjAgregado${producto.id}" class="msjAgregado"></div>
                                <div class="card-boton">
                                    <a id="btn${producto.id}" href="#" class="btn btn-primary">Agregar</a>
                                </div>
                            </div>
                        </div>`
                    );

                    //ESTABLECEMOS CATEGORIAS PARA CADA TIPO DE PRODUCTO
                    //Esto permite luego aplicar filtros por categoría
                    if (producto.producto==="Bajo"){
                        $(`#${producto.id}`).addClass("Bajo");
                    } else if (producto.producto==="Amplificador"){
                        $(`#${producto.id}`).addClass("Amplificador");
                    } else if (producto.producto==="Accesorio") {
                        $(`#${producto.id}`).addClass("Accesorio")
                    };
                    
                    let indice= `${producto.id}`;   //Con esta variable pasamos el "id" de cada producto a las diferentes funciones
                
                    //BOTON PARA AGREGAR LOS PROCUTOS AL CARRITO
                    $(`#btn${producto.id}`).click((e)=> {   
                        e.preventDefault();
                        eleccionBajo(indice);
                        
                        if (vaAlDOM){
                            infoEnElDom();
                        };
                        
                        mensaje(e, indice);

                        let sidebar= document.getElementById("sidebar");
                        if (sidebar.style.display=="none" || sidebar.style.display==""){
                            $("#sidebar").css({"right":"0px"}).toggle(500);
                        };
                    });
                };
            };
        },
    );
};
//****************FILTROS POR CATEGORIAS******************************************************
function filtrarProductos(categoria) {
    if (categoria==="Productos"){
        $(".card").css({"display":"flex"});
    }else if (categoria==="Bajo") {
        $(".Bajo").css({"display":"flex"});
        $(".Amplificador").css({"display":"none"});
        $(".Accesorio").css({"display":"none"});
    } else if (categoria==="Amplificador") {
        $(".Bajo").css({"display":"none"});
        $(".Amplificador").css({"display":"flex"});
        $(".Accesorio").css({"display":"none"});
    } else if (categoria==="Accesorio") {
        $(".Bajo").css({"display":"none"});
        $(".Amplificador").css({"display":"none"});
        $(".Accesorio").css({"display":"flex"});
    };
};

//****************FUNCIONES DE LOS CARDS*******************************************************

function eleccionBajo(ind) {     //Genera un objeto con el producto seleccionado
    for (const prod of productos) {
        if (prod.id == ind) {
            pdCarrito = new prodDelCarrito (prod.id, prod.producto, prod.marca, prod.modelo, prod.precio, prod.imagen);
        };
    };
    
    productosDelCarrito.push(pdCarrito);    //Guardamos el prodcuto en un array (carrito)
    validarRepeticion(pdCarrito);           //Verificamos que ese prodcuto no se guarde dos veces
    carrito.incrementarCarrito();
    
    return pdCarrito
};

function validarRepeticion(obj) {
    //Esta funcion se encarga de verificar que un producto no se guarde dos veces. La idea es que si un producto ya esta en el carrito, se modifique la cantidad desde el mismo carrito. Sin necesidad de guardar nuevamente el mismo.
    let contadorRepeticiones= 0;
    
    for (let i=0; i< productosDelCarrito.length; i++) {
        if (obj.id == productosDelCarrito[i].id){
            contadorRepeticiones +=1;
        };  
        if (contadorRepeticiones>1){
            Swal.fire({
                icon: 'error',
                title: '<h2 class="p-sweetAlert">Producto Repetido</h2>',
                html: '<p class="p-sweetAlert">Este producto ya fue agregado. Por favor modifique la cantidad desde el carrito de compras</p>',
                background: '#777',
                position:'center',
                allowOutsideClick: "true",
                customClass: "SeewAlert"
            });
            productosDelCarrito.splice(i,1);
            carrito.decrementarCarrito();
            vaAlDOM=false;
        } else {
            obj.agregar();
            vaAlDOM=true;
        }; 
    };
};

function infoEnElDom() {    //Aquí pintamos en el DOM cada producto seleccionado
     $("#cont-sidebar").prepend(
        `<ol id="${pdCarrito.id}" class="list-group prod-seleccionado${pdCarrito.id}">
            <li class="list-group-item d-flex align-items-start">
            <div class="ms-1 me-auto">
                <div class="fw-bold">${pdCarrito.producto} ${pdCarrito.marca}</div>
                <p>$${pdCarrito.precio}</p>
                <img src="${pdCarrito.imagen}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="trash">
                <span id="badge${pdCarrito.id}" class="badge bg-primary rounded-pill">Cantidad: ${pdCarrito.cantidad}</span>
                <div class="MasMenos">
                    <i type="button" id="menos${pdCarrito.id}" class="fas fa-minus-square"></i>
                    <i id="mas${pdCarrito.id}" class="fas fa-plus-square"></i>
                </div>
                <i id="btn-trash${pdCarrito.id}" class="far fa-trash-alt"></i>
            </div>
            </li>
        </ol>`
    ); 

    //BOTON P/ELIMINAR PRODUCTO SELECCIONADO
    $(`#btn-trash${pdCarrito.id}`).click( (e) => { 
    e.preventDefault();
    let indiceParaEliminar= e.target.parentNode.parentNode.parentNode.getAttribute("id");
    eliminarDelCarrito(e.target, indiceParaEliminar);
    eliminarDelArray(indiceParaEliminar);
    });

    //BOTON PARA DECREMENTAR CANTIDAD DEL PRODUCTO SELECCIONADO
    $(`#menos${pdCarrito.id}`).click( (e) => { 
        e.preventDefault();
        let identificador= e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("id");

        for (const prod in productosDelCarrito) {
            if (productosDelCarrito[prod].cantidad==1){
                e.target.style.visibility="hidden".toggle;
            }else{
                if (identificador == productosDelCarrito[prod].id){
                    productosDelCarrito[prod].decrementarCantidad();

                    carrito.decrementarCarrito();
            
                    let contenido= e.target.parentNode.parentNode.childNodes[1].textContent ="Cantidad: "+`${productosDelCarrito[prod].cantidad}`;
                    document.getElementById(`badge${identificador}`).innerHTML= contenido;
                };
            };
        };
    });

    //BOTON PARA INCREMENTAR CANTIDAD DEL PRODUCTO SELECCIONADO
    $(`#mas${pdCarrito.id}`).click( (e) => { 
        e.preventDefault();
        carrito.incrementarCarrito();

        let identificador= e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("id");
        for (const prod in productosDelCarrito){
            if (identificador == productosDelCarrito[prod].id){
                productosDelCarrito[prod].aumentarCantidad();
        
                let contenido= e.target.parentNode.parentNode.childNodes[1].textContent ="Cantidad: "+`${productosDelCarrito[prod].cantidad}`;
                document.getElementById(`badge${identificador}`).innerHTML= contenido;
            };
        };
    });
};

function eliminarDelCarrito(valor, elimina) {        //Elimina elementos de carrito en DOM 
    $(valor).parent().parent().parent().remove();
    
    for (const prod in productosDelCarrito){
            if (elimina == productosDelCarrito[prod].id){
                carrito.cantidad -= parseInt(productosDelCarrito[prod].cantidad);
                span.innerHTML = `<span class="cart__count">${carrito.cantidad}</span>`;
            };
    };
};

function eliminarDelArray(num) {        //Elimina el prod del array de compras
    for (let i=0; i < productosDelCarrito.length; i++){   
        if (productosDelCarrito[i].id == num) {
            productosDelCarrito.splice(i,1);
            break;
        };
    };

    let sidebar= document.getElementById("cont-sidebar");  // Se segura que, si el contenedor esta vacío, se elimine el array de compras
    if (sidebar.hasChildNodes()==false){
        productosDelCarrito=[];
        carrito.resetearCarrito();
    };
};

function limpiarCarritoEnDOM (){
    let sidebar= document.getElementById("cont-sidebar");
    sidebar.innerHTML=""
    productosDelCarrito=[];
    carrito.resetearCarrito();
};

function mensaje(valor, ind){        // Muestra un mensaje cada vez que se agrega un producto
    $(`#msjAgregado${ind}`).append('<p class="mensaje">Producto agregado!</p>');
    $(valor.target.parentNode.parentNode.childNodes[7].children).fadeOut(3000)
};

function agregarAlCarrito (){       //Funcion para agregar el listado final al Local Storage
    for (let i=0; i< productosDelCarrito.length; i++) {
        localStorage.setItem(i, JSON.stringify(productosDelCarrito[i]));
    };
};

//****************FUNCIONES FINALIZAR COMPRA******************************************

function sumaFinal (){      //Suma el total de los prodcutos del carrito de compras
    agregarAlCarrito()
    
    let total = 0;
    for (let i=0; i < productosDelCarrito.length; i++){
        total += (productosDelCarrito[i].precio)*(productosDelCarrito[i].cantidad);
    };
    
    return parseFloat(total)
};

function sumarEnvio(){      //Función que permite agregar el costo de envío ($2000)
    let envio= document.getElementById("envio")
    let compraFinal;
    if (envio.checked==false) {
        compraFinal= sumaFinal();
    } else {
        compraFinal= sumaFinal()+2000;
    };

    return compraFinal
};

function mostrarCompraFinal (){     //Esta función muestra un resumen de la compra, permite elegir el medio de pago y confirmar la compra final.
    let aPagar= document.getElementById("compraFinalizada");
    let ul= document.createElement('ul');
    aPagar.appendChild(ul);
    for (let i=0; i < productosDelCarrito.length; i++){
        let li= document.createElement('li')
        li.innerHTML= `${productosDelCarrito[i].producto} ${productosDelCarrito[i].marca} ${productosDelCarrito[i].modelo}\nPrecio Unitario: $${productosDelCarrito[i].precio} \nCantidad: ${productosDelCarrito[i].cantidad}`;
        ul.appendChild(li);
    };
    
    let div= document.createElement('div');
    aPagar.appendChild(div);
    div.innerHTML= `<h4>El pago final de tu compra es: <h3>$${sumarEnvio()}</h3></h4>`;
};

function limpiarContenedor() {
    document.getElementById("compraFinalizada").textContent=""
}

//****************FUNCIONES FOMRMULARIO******************************************

function validarFurmlario() {
    let nombre=  document.getElementById("fullname").value;
    let email=  document.getElementById("email").value;
    let telefono=  document.getElementById("phone").value;
    let asunto=  document.getElementById("affair").value;
    let mensaje=  document.getElementById("message").value;

    if (nombre=="" || email=="" || telefono=="" || asunto=="" || mensaje=="") {
        Swal.fire({
            icon: 'error',
            title: '<h2 class="p-sweetAlert">Atención!</h2>',
            html: '<p class="p-sweetAlert">Debes completar todos los campos.</p>',
            background: '#777',
            position:'center',
            allowOutsideClick: false
        });
    }else if (!(/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email))) {
        Swal.fire({
            icon: 'error',
            title: '<h2 class="p-sweetAlert">E-mail Incorrecto!</h2>',
            html: '<p class="p-sweetAlert">Introduce un correo válido.</p>',
            background: '#777',
            position:'center',
            allowOutsideClick: false,
            customClass: "SeewAlert"
        });
    }else {
        Swal.fire({
            icon: 'success',
            title: '<h2 class="p-sweetAlert">Mensaje Enviado!</h2>',
            html: '<p class="p-sweetAlert">Su mensaje ha sido enviado!\nA la brevedad te responderemos</p>',
            background: '#777',
            position:'center',
            allowOutsideClick: false,
            customClass: "SeewAlert"
        });
        document.getElementById("form").reset();
    };
};



















