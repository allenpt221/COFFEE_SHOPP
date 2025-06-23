import cloudinary from "../lib/cloudinary.js";
import Product from "../model/product.model.js";


export const getAllProduct = async (req, res) => {
    try {
        const product = await Product.find({});

        res.status(200).json({product});
    } catch (error) {
        console.log("Error in getAllProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        let cloudinaryResponse = null;

        if (image){
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
        }
        
        const product = await Product.create({
			name,
			description,
			price,
			image: cloudinaryResponse ? cloudinaryResponse.secure_url : "",
			category,
		});

        res.status(201).json(product);
    } catch (error) {
        console.log("Error in createProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if(product.image){
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
            } catch (error) {
                console.log("Error deleting image from Cloudinary", error.message);
            }
        }

        await Product.findByIdAndDelete(req.params.id);
        
    } catch (error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}