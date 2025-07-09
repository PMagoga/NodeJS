import * as cartService from "./services/cart.js";
import createItem from "./services/item.js";

const cart = [];

console.log("Welcome to the Shopee Cart Service!");

const item1 = await createItem("Laptop", 1500, 1);
const item2 = await createItem("Smartphone", 800, 2);

await cartService.addItem(cart, item1);
await cartService.addItem(cart, item2);

await cartService.calculateTotal(cart);