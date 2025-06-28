import Order from "../model/order.model.js";
import User from "../model/auth.model.js";

export const successCheckOut = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;
    const userId = req.user._id; 

    const newOrder = new Order({
      user: userId, 
      products: products.map((product) => ({
        product: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      })),
      totalAmount,
    });

    await newOrder.save();


    await User.findByIdAndUpdate(userId, { cartItems: [] });

    res.status(201).json({
      success: true,
      message: "Order successfully created.",
      orderId: newOrder._id,
    });

  } catch (error) {
    console.error("Error processing successful checkout:", error);
    res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
};

export const getSuccessCheckOut = async (req, res) => {
    try {
        const checkOutData = await Order.find();
        res.status(200).json(checkOutData);
        
    } catch (error) {
        console.log("Error in getSuccessCheckOut controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
