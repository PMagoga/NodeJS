const products = require('./services/products');

async function main() {
    console.log('Main function is running');
    products.getFullName('12345', 'Sample Product');
}

main();