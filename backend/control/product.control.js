import Product from "../model/product.model.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        const product = await Product.create({
			name,
			description,
			price,
			image,
			category,
		});

        res.status(201).json(product);
    } catch (error) {
        console.log("Error in createProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
    }
};