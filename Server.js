const express = require('express');
const dataManipulation = require('./DataFile');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/products', (req, res) => {
    const newProduct = dataManipulation.createProduct(req.body);
    res.status(201).json(newProduct);
});

app.get('/products', (req, res) => {
    const products = dataManipulation.getAllProducts();
    res.json(products);
});

app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedProduct = dataManipulation.updateProduct(id, req.body);
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const deletedProduct = dataManipulation.deleteProduct(id);
    if (deletedProduct) {
        res.json(deletedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;