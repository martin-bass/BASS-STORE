//ACCIONES EN BOTONES
$("#logo").click(function (e) { e.preventDefault();});

$("#Nosotros").click(function (e) { 
    e.preventDefault();
    $('html,body').animate({
        scrollTop:$('#SeccionCarousel').offset()
    },300);
});

$("#marcas").click( (e)=> { 
    e.preventDefault();
    $('html,body').animate({
        scrollTop:$('#SeccionMarcas').offset().top
    },300);
});

$("#Prodcutos").click( (e) => { 
    e.preventDefault();
    filtrarProductos("Productos");
    // $('html,body').animate({
    //     scrollTop:$('#SeccionCards').offset().top
    // },300);
    
});

$("#Bajos").click( (e)=> { 
    e.preventDefault();
    filtrarProductos("Bajo");
    $('html,body').animate({
        scrollTop:$('#SeccionCards').offset().top
    },300);
    
});

$("#Amplificadores").click( (e) =>{ 
    e.preventDefault();
    filtrarProductos("Amplificador");
    $('html,body').animate({
        scrollTop:$('#SeccionCards').offset().top
    },300);
    
});

$("#Accesorios").click( (e)=> { 
    e.preventDefault();
    filtrarProductos("Accesorio");
    $('html,body').animate({
        scrollTop:$('#SeccionCards').offset().top
    },300);
});

$("#Contacto").click( (e)=> { 
    e.preventDefault();
    $('html,body').animate({
        scrollTop:$('#SeccionFormulario').offset().top
    },300);
});

$("#carrito").click( (e)=> { 
    e.preventDefault();
    $("#sidebar").css({"right":"0px"}).toggle(500);
});

$(".btn-ConfirmarCompra").click( (e) =>{ 
    e.preventDefault();
    let sidebar= document.getElementById("cont-sidebar"); 
    if (sidebar.hasChildNodes()==false){
        Swal.fire({
            icon: 'error',
            title: '<h2 class="p-sweetAlert">Atención!</h2>',
            html: '<p class="p-sweetAlert">Al carrito de compras esta vacío.</p>',
            background: '#777',
            position:'center',
            allowOutsideClick: true
        });
    }else {
        $(".compraFinal").css({"display":"flex"});
        sumaFinal();
        mostrarCompraFinal();
        limpiarCarritoEnDOM();
    };
    
});

$("#back").click( (e)=> { 
    e.preventDefault();
    $(".compraFinal").css({"display":"none"});
    limpiarContenedor();
    localStorage.clear();
});

$("#enviaFormulario").click( (e)=> { 
    e.preventDefault();
    validarFurmlario();
});

