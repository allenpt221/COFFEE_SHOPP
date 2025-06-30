import Order from "../model/order.model.js";
import User from "../model/auth.model.js";

export const successCheckOut = async (req, res) => {
  try {
    const { products, totalAmount, paymentMethod, cardInfo } = req.body;
    const userId = req.user._id;

    const orderData = {
      user: userId,
      products: products.map((product) => ({
        product: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      })),
      totalAmount,
      paymentMethod,
    };

    // 🛡️ Optionally validate cardInfo if payment method is "Card"
    if (paymentMethod === "Card") {
      if (
        !cardInfo?.cardholder ||
        !cardInfo?.cardnumber ||
        !cardInfo?.expiring ||
        !cardInfo?.cvv
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
