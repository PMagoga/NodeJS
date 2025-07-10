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
  // lógica para deletar um item do carrinho
  const index = userCart.findIndex(item => item.name === name);
  if (index !== -1) {
    userCart.splice(index, 1);
  }
  console.log(`Item ${name} removido do carrinho.`);
}

async function removeItem(userCart, index) {
  // lógica para remover um item do carrinho - diminuir a quantidade
  const deleteItem = index - 1;
  if (index >= 0 && index < userCart.length) {
    userCart.splice(deleteItem, 1);
  }
  console.log(`Item ${userCart} removido do carrinho.`);
}

async function calculateTotal(userCart) {
  // lógica para calcular o total do carrinho
  const result = userCart.reduce((total, item) => total + item.subtotal, 0);
    console.log(`Total do carrinho: ${result}`);
}

// mostrar todos os itens do carrinho
async function displayCart(userCart) {
  console.log("Itens no carrinho:");
  userCart.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - Preço: R$ ${item.price}, Quantidade: ${item.quantity}, Subtotal: ${item.subtotal}`);
  });
}

export { addItem, deleteItem, removeItem, calculateTotal, displayCart };