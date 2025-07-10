import Order from "../model/order.model.js";


export const getOrder = async (req, res) => {
  try {
    const user_Id = req.userId; // should be set in your auth middleware

    const userOrders = await Order.find({ user_Id });

    return res.status(200).json({ success: true, data: userOrders });
  } catch (error) {
    console.error("Error in getOrder controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


