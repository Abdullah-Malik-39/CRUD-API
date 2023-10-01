const request = require('supertest');
const app = require('./Server');
const expect = require('chai').expect;

describe('CRUD Operations', () => {
    it('should create a new product', async () => {
        const response = await request(app)
            .post('/products')
            .send({
                id: 10,
                name: 'Test Product',
                brand: 'Brand X',
                price: 199.99,
                description: 'A new product',
                category: 'Electronics',
            });

        expect(response.statusCode).to.equal(201);
        expect(response.body.name).to.equal('Test Product');
    });

    it('should get all products', async () => {
        const response = await request(app).get('/products');

        expect(response.statusCode).to.equal(200);
    });

    it('should update a product by ID', async () => {
        const productIdToUpdate = 10;
        const updatedProductData = {
            name: 'Updated Laptop',
            price: 1099.99,
        };

        const response = await request(app)
            .put(`/products/${productIdToUpdate}`)
            .send(updatedProductData);

        expect(response.statusCode).to.equal(200);
        expect(response.body.name).to.equal('Updated Laptop');
    });

    it('should delete a product by ID', async () => {
        const productIdToDelete = 10;

        const response = await request(app).delete(`/products/${productIdToDelete}`);

        expect(response.statusCode).to.equal(200);
        expect(response.body.id).to.equal(productIdToDelete);
    });
});
