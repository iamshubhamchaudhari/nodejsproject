const express = require('express');
const bodyParser = require('body-parser');
const categoryController = require('./categoryController');
const productController = require('./productController');

const app = express();
app.use(bodyParser.json());

// Category routes
app.post('/categories', categoryController.createCategory);
app.get('/categories', categoryController.getCategories);
app.put('/categories/:categoryId', categoryController.updateCategory);
app.delete('/categories/:categoryId', categoryController.deleteCategory);

// Product routes
app.post('/products', productController.createProduct);
app.get('/products', productController.getProducts);
app.put('/products/:productId', productController.updateProduct);
app.delete('/products/:productId', productController.deleteProduct);

// Route for root URL
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
