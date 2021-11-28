//****************FUNCIONES PARA INICIALIZAR EL PROYECTO******************************************
$(document).ready(function () {
    funcionCascaron();
});

async function funcionCascaron (){
    await cargarProductos();
};

async function cargarProductos (){  //Levantamos los archivos del JSON y pintamos los cards
    await $.getJSON(archivoJson, 
        function (data, textStatus) {
            if (textStatus==="success"){
                
                productos=data;
                for (producto of productos) {
                    
                    $(".cards").append(
                        `<div class="card card2">
                            <div class="cont-img">
                                <img src="${producto.imagen}" class="card-img-top img-responsive" alt="...">
                                
                            </div>    
                            <div class="card-body card-productos">
                                <h5 class="card-title">${producto.producto} ${producto.marca}</h5>
                                <h6>$ ${producto.precio}</h6>
                                <p class="card-text">${producto.producto} ${producto.marca} ${producto.modelo}</B></p>
                                <div id="msjAgregado${producto.id}" class="msjAgregado"></div>
                                <div class="card-boton">
                                    <a id="btn${producto.id}" href="#" class="btn btn-primary">Agregar</a>
                                </div>
                            </div>
                        </div>`
                    );
                    let indice= `${producto.id}`;
                
                    $(`#btn${producto.id}`).click((e)=> {   //Boton para agregar prodcutos
                    e.preventDefault();
                    eleccionBajo(indice);
                    
                    if (vaAlDOM){
                        infoEnElDom();
                    };
                    
                    mensaje(e, indice);
                    });
                };
            };
        },
    );
};

//****************FUNCIONES DE LOS CARDS*******************************************************

function eleccionBajo(ind) {     //Generra un objeto con el producto seleccionado
    for (const prod of productos) {
        if (prod.id == ind) {
            pdCarrito = new prodDelCarrito (prod.id, prod.producto, prod.marca, prod.modelo, prod.precio, prod.imagen);
        };
    };
    
    productosDelCarrito.push(pdCarrito);
    validarRepeticion(pdCarrito);
    carrito.incrementarCarrito();
    
    return pdCarrito
};

function validarRepeticion(obj) {
    let contadorRepeticiones= 0;
    
    for (let i=0; i< productosDelCarrito.length; i++) {
        if (obj.id == productosDelCarrito[i].id){
            contadorRepeticiones +=1;
        };  
        if (contadorRepeticiones>1){
            alert("Este producto ya fue agregado. Por favor modifique la cantidad desde el carrito de compras");
            productosDelCarrito.splice(i,1);
            carrito.decrementarCarrito();
            vaAlDOM=false;
        } else {
            obj.agregar();
            vaAlDOM=true;
        }; 
    };
};

function infoEnElDom() {    //Aqui se genera un obj al que vamos a poder manipular sus cantidades
    //console.log(pdCarrito)
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

    //BOTON P/ELIMINAR PRODCUTO SELECCIONADO
    $(`#btn-trash${pdCarrito.id}`).click( (e) => { 
    e.preventDefault();
    let indiceParaEliminar= e.target.parentNode.parentNode.parentNode.getAttribute("id");
    eliminarDelCarrito(e.target, indiceParaEliminar);
    eliminarDelArray(indiceParaEliminar);
    });

    //BOTON PARA DECREMENTAR CANTIDAD DEL PROCUTO SELECCIONADO
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

    //BOTON PARA INCREMENTAR CANTIDAD DEL PROCUTO SELECCIONADO
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

function eliminarDelArray(num) {
    for (let i=0; i < productosDelCarrito.length; i++){   //Elimina el prod del array de compras
        if (productosDelCarrito[i].id == num) {
            productosDelCarrito.splice(i,1);
            break;
        };
        
    };

    let sidebar= document.getElementById("cont-sidebar");  // Se segura que si el contenedor esta vacio se elimine el array de compras
    if (sidebar.hasChildNodes()==false){
        productosDelCarrito=[];
        carrito.resetearCarrito();
    };
};

function mensaje(valor, ind){        // Muestra un mensaje cada vez que se agrega un producto
    $(`#msjAgregado${ind}`).append('<p class="mensaje">Producto agregado!</p>');
    $(valor.target.parentNode.parentNode.childNodes[7].children).fadeOut(2000)
};

function agregarAlCarrito (){       //Funcion para agregar el listado final al Local Storage
    for (let i=0; i< productosDelCarrito.length; i++) {
        localStorage.setItem(i, JSON.stringify(productosDelCarrito[i]));
    };
};

//****************FUNCIONES FINALIZAR COMPRA******************************************

function sumaFinal (){
    agregarAlCarrito()
    
    let total = 0;
    for (let i=0; i < productosDelCarrito.length; i++){
        total += (productosDelCarrito[i].precio)*(productosDelCarrito[i].cantidad);
    };
    
    return parseFloat(total)
};

function sumarEnvio(){
    let envio= document.getElementById("envio")
    let compraFinal;
    if (envio.checked==false) {
        compraFinal= sumaFinal();
    } else {
        compraFinal= sumaFinal()+2000;
    };

    return compraFinal
};

function mostrarCompraFinal (){
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
        alert ("Debes completar todos los campos");
    }else if (!(/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email))) {
        alert("Introduce un correo válido");
    }else {
        alert("Su mensaje ha sido enviado!\nA la brevedad te responderemos");
        document.getElementById("form").reset();
    };
};



















