import * as cartService from "./services/cart.js";
import createItem from "./services/item.js";

const cart = [];

console.log("Welcome to the Shopee Cart Service!");

// Creating items
const item1 = await createItem("Laptop", 1500, 1);
const item2 = await createItem("Smartphone", 800, 2);
const item3 = await createItem("Headphones", 200, 1);
const item4 = await createItem("Smartwatch", 300, 1);

// Adding items to the cart
await cartService.addItem(cart, item1);
await cartService.addItem(cart, item2);
await cartService.addItem(cart, item3);
await cartService.addItem(cart, item4);

//  deleting an item from the cart
await cartService.deleteItem(cart, "Smartphone");

await cartService.calculateTotal(cart);

// Displaying the cart
await cartService.displayCart(cart);

