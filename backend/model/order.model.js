import mongoose, { Types } from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Auth",
			required: true,
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				name: {
					type: String,
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
					min: 1,
				},
				price: {
					type: Number,
					required: true,
					min: 0,
				},
				category: {
					type: String,
					required: true
				}
			},
		],
		totalAmount: {
			type: Number,
			required: true,
			min: 0,
		},
		paymentMethod: {
			type: String,
			required: true,
			enum: ["COD", "Gcash", "Card"]
		},
		cardInfo: {
			cardholder: {
				type: String,
				required: false
			}, 
			cardnumber: {
				type: String,
				required: false
			},
			expiring: {
				type: String,
				required: false
			},
			cvv: {
				type: String,
				required: false
			},
			cardType:{
			type: String,
			required: false
		},
		},
		
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;