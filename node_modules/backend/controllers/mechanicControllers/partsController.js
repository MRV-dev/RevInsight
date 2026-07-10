const Product = require('../../models/product');

// Public endpoint for mechanics to fetch parts
const getPartsForMechanic = async (req, res) => {
  try {
    const products = await Product.find();

    const host = req.get('host');
    const protocol = req.protocol;

    const parts = products.map(p => ({
      itemId: p._id.toString(),
      name: p.name,
      stock: p.quantity,
      category: p.category,
      price: p.price,
      image: p.image ? `${protocol}://${host}/${p.image}` : null
    }));

    res.status(200).json(parts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPartsForMechanic };
