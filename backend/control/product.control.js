import cloudinary from "../lib/cloudinary.js";
import Product from "../model/product.model.js";


export const getAllProduct = async (req, res) => {
    try {
        const product = await Product.find({});

        res.status(200).json(product);
    } catch (error) {
        console.log("Error in getAllProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getRandomProduct = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $sample: { size: 9 } } 
    ]);

    res.status(200).json({product: products});
  } catch (error) {
    console.log("Error in getRandomProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getProductsByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		const products = await Product.find({ category });
		res.json({ products });
	} catch (error) {
		console.log("Error in getProductsByCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, discounted } = req.body;

        let cloudinaryResponse = null;

        if (image){
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
        }
        
        const product = await Product.create({
			name,
			description,
			price,
			image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
			category,
      discounted
		});

    res.status(201).json(product);
    } catch (error) {
        console.log("Error in createProduct controller", error.message);
		    res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, discounted } = req.body;
    const { id } = req.params;

    let updatedFields = { name, description, price, category, discounted };

    if (image) {
      const cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
      updatedFields.image = cloudinaryResponse.secure_url;
    }

    const updateData = await Product.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updateData) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, update: updateData });
  } catch (error) {
    console.error("Error in updateProduct controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
      } catch (error) {
        console.log("Error deleting image from Cloudinary", error.message);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    // ✅ Send a success response
    return res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
