//CONSTRUCTOR
class miBajo {
    constructor (id, prodcuto, marca, modelo, precio, imagen, cantidad) {
        this.id = id;
        this.prodcuto = prodcuto;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.imagen= imagen;
        this.cantidad = cantidad;
    };
};

class prodDelCarrito {
    constructor (id, prodcuto, marca, modelo, precio, imagen, cantidad) {
        this.id = id;
        this.prodcuto = prodcuto;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.imagen= imagen;
        this.cantidad = cantidad;
        this.agregado = false;
    };
    agregar () {
        if (this.agregado === false){
            this.agregado = true;
        };
    };
};










