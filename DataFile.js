const fs = require('fs');
const jsonFilePath = './Data.json';

function readDataFromFile() {
    try {
        const data = fs.readFileSync(jsonFilePath, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData.products || [];
    } catch (error) {
        console.error('Error reading data from the file:', error);
        return [];
    }
}

function writeDataToFile(data) {
    try {
        const jsonData = { products: data };
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
        console.log('Data saved to the file.');
    } catch (error) {
        console.error('Error writing data to the file:', error);
    }
}

function createProduct(newProduct) {
    const products = readDataFromFile();
    products.push(newProduct);
    writeDataToFile(products);
    return newProduct;
}

function getAllProducts() {
    return readDataFromFile();
}

function updateProduct(id, updatedProduct) {
    const products = readDataFromFile();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        writeDataToFile(products);
        return products[index];
    } else {
        return null;
    }
}

function deleteProduct(id) {
    const products = readDataFromFile();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
        const deletedProduct = products.splice(index, 1)[0];
        writeDataToFile(products);
        return deletedProduct;
    } else {
        return null;
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
};
