const db = require('./db');

// Create product
exports.createProduct = async (req, res) => {
    try {
        const { productName, categoryId } = req.body;
        const [result] = await db.query('INSERT INTO products (productName, categoryId) VALUES (?, ?)', [productName, categoryId]);
        res.status(201).json({ message: 'Product created successfully', productId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read products with pagination
exports.getProducts = async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const offset = (page - 1) * pageSize;
        const [rows] = await db.query('SELECT p.productId, p.productName, c.categoryName, c.categoryId FROM products p JOIN categories c ON p.categoryId = c.categoryId LIMIT ?, ?', [offset, parseInt(pageSize)]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const { productId, productName, categoryId } = req.body;
        await db.query('UPDATE products SET productName = ?, categoryId = ? WHERE productId = ?', [productName, categoryId, productId]);
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        await db.query('DELETE FROM products WHERE productId = ?', [productId]);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
