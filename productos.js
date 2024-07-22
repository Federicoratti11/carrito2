class Producto {
    constructor(id, nombre, categoria, precio) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
    }

    toString() {
        return `${this.nombre}, Precio: $${this.precio.toFixed(2)}`;
    }
}

let productos = [
    // Frutas
    new Producto(1, "Manzana Organica", "Fruta", 1620),
    new Producto(2, "Platano Organico", "Fruta", 2150),
    new Producto(3, "Naranja Organica", "Fruta", 999),
    new Producto(4, "Fresa Organica", "Fruta", 3500),
    new Producto(5, "Uva Organica", "Fruta", 300),

    // Verduras
    new Producto(6, "Lechuga Organica", "Verdura", 1100),
    new Producto(7, "Zanahoria Organica", "Verdura", 850),
    new Producto(8, "Tomate Organico", "Verdura", 1600),
    new Producto(9, "Pepino Organico", "Verdura", 400),
    new Producto(10, "Brocoli Organico", "Verdura", 2600),

    // Legumbres
    new Producto(11, "Lentejas Organicas", "Legumbres", 3500),
    new Producto(12, "Garbanzos Organicos", "Legumbres", 2500),
    new Producto(13, "Frijoles Organicos", "Legumbres", 1200),
    new Producto(14, "Arvejas Organicas", "Legumbres", 900),
    new Producto(15, "Soja Organica", "Legumbres", 400),

    // Cosmeticos
    new Producto(16, "Crema Facial Organica", "Cosmeticos", 5000),
    new Producto(17, "Champu Organico", "Cosmeticos", 2150),
    new Producto(18, "Acondicionador Organico", "Cosmeticos", 2900),
    new Producto(19, "Jabon Organico", "Cosmeticos", 1500),
    new Producto(20, "Locion Corporal Organica", "Cosmeticos", 5500)
];
