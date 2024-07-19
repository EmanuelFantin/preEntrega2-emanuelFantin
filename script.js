// Arrays de objetos de alimentos
const foods = [
    {name: "Pizza", price: 5000},
    {name: "Hamburguesa", price: 3000},
    {name: "Lomito de carne", price: 3500},
    {name: "Sandwich de milanesa", price: 3500},
    {name: "Papas fritas", price: 2000},
    {name: "Papas fritas / GRATINADAS", price: 2500}
];

// Arrays de pedidos
let order = [];

// Variable que lleva el registro del costo total del pedido
let totalPrice = 0;

// Función para sumar dos números
function sumar(a, b) {
    return a + b;
}

// Función para multiplicar dos números
function multiplicar(a, b) {
    return a * b;
}

// Función de orden superior que aplica una operación a los elementos de un pedido
function aplicarOperacionSobrePedido(operacion, pedido) {
    let resultado = 0;
    pedido.forEach(item => {
        resultado = operacion(resultado, multiplicar(item.price, item.quantity));
    });
    return resultado;
}

// Acceder a un botón en el DOM con el ID `realizarPedido` -- Evento click del botón de realizar pedido
document.getElementById('realizarPedido').addEventListener('click', function() {
    alert("PEDIDOSYA / pedidos de comida rápida");

    // Variable que controla el bucle de pedido
    let ordering = true;
    while (ordering) {
        let foodChoices = "Eliga su cena:\n";
        // Recorre el array de alimentos para mostrar las opciones
        foods.forEach((food, index) => {
            foodChoices += `${index + 1}. ${food.name} ($${food.price.toFixed(2)})\n`;
        });
        foodChoices += `${foods.length + 1}. Hacer el pedido\n`;

        // Solicita la elección del usuario
        let choice = parseInt(prompt(foodChoices));

        // Si la elección es válida
        if (choice > 0 && choice <= foods.length) {
            let quantity = parseInt(prompt(`¿Cuántas ${foods[choice - 1].name} quieres?`));
            // Si la cantidad es válida
            if (quantity > 0) {
                let selectedFood = foods[choice - 1];
                
                // Buscar un alimento por su nombre
                let foundFood = foods.find(food => food.name === selectedFood.name);
                console.log("Alimento encontrado:", foundFood);

                // Filtrar alimentos por precio menor a 4000
                let filteredFoods = foods.filter(food => food.price < 4000);
                console.log("Alimentos filtrados por precio menor a 4000:", filteredFoods);

                // Añade el pedido al array de pedidos
                order.push({item: selectedFood.name, quantity: quantity, price: selectedFood.price});
            } else {
                alert("Cantidad rechazada. (haga su pedido)");
            }
        } else if (choice === foods.length + 1) {
            ordering = false;
        } else {
            alert("Opción rechazada. (haga su pedido)");
        }
    }

    // Calcula el precio total utilizando la función de orden superior
    totalPrice = aplicarOperacionSobrePedido(sumar, order);

    // Muestra el resumen del pedido
    if (order.length > 0) {
        let orderSummary = "Vista de su pedido:\n";
        order.forEach(item => {
            orderSummary += `${item.quantity} x ${item.item} ($${multiplicar(item.price, item.quantity).toFixed(2)})\n`;
        });
        orderSummary += `Total a pagar: $${totalPrice.toFixed(2)}`;
        alert(orderSummary);
    } else {
        alert("No colocó ningún pedido. (haga su pedido)");
    }
});
