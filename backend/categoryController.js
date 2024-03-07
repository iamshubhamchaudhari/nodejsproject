const db = require('./db');

// Create category
exports.createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        // Insert the new category into the database
        const result = await db.query('INSERT INTO categories (categoryName) VALUES (?)', [categoryName]);
        res.status(201).json({ message: 'Category created successfully', categoryId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read categories
exports.getCategories = async (req, res) => {
    try {
        // Retrieve all categories from the database
        const [rows] = await db.query('SELECT * FROM categories');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update category
exports.updateCategory = async (req, res) => {
    try {
        const { categoryId, categoryName } = req.body;
        // Update the category in the database
        await db.query('UPDATE categories SET categoryName = ? WHERE categoryId = ?', [categoryName, categoryId]);
        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete category
exports.deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        // Delete the category from the database
        await db.query('DELETE FROM categories WHERE categoryId = ?', [categoryId]);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
