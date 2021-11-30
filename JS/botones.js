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

$("#Bajos").click(function (e) { 
    e.preventDefault();
    $('html,body').animate({
        scrollTop:$('#SeccionCards').offset().top
    },300);
});

$("#Amplificadores").click(function (e) { 
    e.preventDefault();
    $('html,body').animate({
        scrollTop:$('#SeccionCards').offset().top
    },300);
});

$("#Accesorios").click(function (e) { 
    e.preventDefault();
    $('html,body').animate({
        scrollTop:$('#SeccionCards').offset().top
    },300);
});

$("#Contacto").click(function (e) { 
    e.preventDefault();
    $('html,body').animate({
        scrollTop:$('#SeccionFormulario').offset().top
    },300);
});

$("#carrito").click(function (e) { 
    e.preventDefault();
    $("#sidebar").css({"right":"0px"}).toggle(500);
});

$(".btn-ConfirmarCompra").click(function (e) { 
    e.preventDefault();
    $(".compraFinal").css({"display":"flex"});
    sumaFinal();
    mostrarCompraFinal();
    carrito.resetearCarrito();
    limpiarCarritoEnDOM();
});

$("#back").click(function (e) { 
    e.preventDefault();
    $(".compraFinal").css({"display":"none"});
    limpiarContenedor();
    localStorage.clear();
});

$("#enviaFormulario").click(function (e) { 
    e.preventDefault();
    validarFurmlario();
});

