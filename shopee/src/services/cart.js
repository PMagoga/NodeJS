//quais ações o carrinho de compras deve suportar

// adinionar um item ao carrinho
// remover um item do carrinho
// atualizar a quantidade de um item no carrinho
// calcular o total do carrinho

async function addItem(userCart, item) {
  // lógica para adicionar um item ao carrinho
  userCart.push(item);
}

async function deleteItem(userCart, name) {
  // lógica para remover um item do carrinho
  console.log(`Item ${userCart} removido do carrinho.`);
}

async function removeItem(userCart, index) {
  // lógica para remover um item do carrinho
  console.log(`Item ${userCart} removido do carrinho.`);
}

async function calculateTotal(userCart) {
  // lógica para calcular o total do carrinho
  const result = userCart.reduce((total, item) => total + item.subtotal, 0);
    console.log(`Total do carrinho: ${result}`);
}

export { addItem, deleteItem, removeItem, calculateTotal };