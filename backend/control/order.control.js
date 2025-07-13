import Order from "../model/order.model.js";


export const getOrder = async (req, res) => {
  try {
    const userId = req.user._id; // should be set in your auth middleware

    const userOrders = await Order.find({ user: userId });

    return res.status(200).json({ success: true, productUser: userOrders });
  } catch (error) {
    console.error("Error in getOrder controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


