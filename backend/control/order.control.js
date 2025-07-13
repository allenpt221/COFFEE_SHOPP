import Location from "../model/location.model.js";
import Order, { BackupOrder } from "../model/order.model.js";


export const getOrder = async (req, res) => {
  try {
    const userId = req.user._id; // should be set in your auth middleware

    const userOrders = await Order.find({ user: userId });
    const userLocation = await Location.find({ user: userId});

    return res.status(200).json({ success: true, productUser: userOrders, locationCustomer: userLocation });
  } catch (error) {
    console.error("Error in getOrder controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getbackupOrder = async (req, res) => {
  try {
    const backupOrders = await BackupOrder.find({});
    
    return res.status(200).json({ success: true, backupOrder: backupOrders});

  } catch (error) {
    console.error("Error in getOrder controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Delete the Order by ID
    const orderDelete = await Order.findByIdAndDelete(id);

    if (!orderDelete) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }


    return res.status(200).json({
      success: true,
      message: "Order and associated location(s) deleted successfully",
    });

  } catch (error) {
    console.error("Error in deleteOrder:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};




