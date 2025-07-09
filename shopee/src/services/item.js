// casos de usos dos itens
// criar item com subtotal calculado

async function createItem(name, price, quantity) {
  // lógica para criar um item com subtotal calculado
  const subtotal = price * quantity;
  console.log(`Item ${name} criado com preço ${price}, quantidade ${quantity} e subtotal ${subtotal}.`);
  return { name, price, quantity, subtotal };
}

export default createItem