import Order from "../model/order.model.js";
import User from "../model/auth.model.js";
import Location from "../model/location.model.js";

export const successCheckOut = async (req, res) => {
  try {
    const { products, totalAmount, paymentMethod, cardInfo, status } = req.body;
    const userId = req.user._id;

    const orderData = {
      user: userId,
      products: products.map((product) => ({
        product: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        category: product.category
      })),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      paymentMethod,
      status
    };

    // 🛡️ Optionally validate cardInfo if payment method is "Card"
    if (paymentMethod === "Card") {
      if (
        !cardInfo?.cardholder ||
        !cardInfo?.cardnumber ||
        !cardInfo?.expiring ||
        !cardInfo?.cvv ||
        !cardInfo?.cardType
      ) {
        return res.status(400).json({
          success: false,
          message: "Missing card information for card payment.",
        });
      }

      orderData.cardInfo = {
        cardholder: cardInfo.cardholder,
        cardnumber: cardInfo.cardnumber,
        expiring: cardInfo.expiring,
        cvv: cardInfo.cvv,
        cardType: cardInfo.cardType
      };
    }

    const newOrder = new Order(orderData);
    await newOrder.save();

    // Clear user's cart after successful order
    await User.findByIdAndUpdate(userId, { cartItems: [] });

    res.status(201).json({
      success: true,
      message: "Order successfully created.",
      orderId: newOrder._id,
      order: newOrder,
    });

  } catch (error) {
    console.error("Error processing successful checkout:", error);
    res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
};

export const costumerLocation = async (req, res) => {
  try {
    const { firstname, lastname, phoneNumber, houseNumber, town, barangay } = req.body;
    const userId = req.user._id;
    const userEmail = req.user.email;

    const costumerLoc = await Location.create({
      user: userId,
      emailAddress: userEmail,
      firstname,
      lastname,
      phoneNumber,
      houseNumber,
      town,
      barangay
    })

    res.status(201).json({
      success: true,
      message: "Order successfully created.",
      location: costumerLoc,
    })
    
  } catch (error) {
    console.error("Error in costumerLocation:", error);
    res.status(500).json({
      message: "Error in costumerLocation",
      error: error.message,
    });
  }
};

export const getCostumerLocation = async (req, res) => {
  try {
    const getLocation = await Location.find({});
    const getOrder = await Order.find({});

    return res.status(200).json({
      location: getLocation,
      order: getOrder
    });

  } catch (error) {
    console.error("Error fetching location of costumer:", error);
    res.status(500).json({
      message: "Error fetching location of costumer",
      error: error.message,
    });
  }
}



export const getSuccessCheckOut = async (req, res) => {
    try {
        const checkOutData = await Order.find();
        res.status(200).json(checkOutData);
        
    } catch (error) {
        console.log("Error in getSuccessCheckOut controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


