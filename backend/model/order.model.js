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
				},
				image: {
					type: String,
					required: true
				},
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
		status: {
			type: String,
			enum: ["processing", "complete", "cancelled"],
			default: "processing"
		}
		
	},
	{ timestamps: true }
);


const orderBackupSchema = new mongoose.Schema(
  {
    originalOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        quantity: Number,
        price: Number,
        category: String,
      },
    ],
    totalAmount: Number,
    paymentMethod: String,
    cardInfo: {
      cardholder: String,
      cardnumber: String,
      expiring: String,
      cvv: String,
      cardType: String,
    },
    status: String,
    backedUpAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create model for backup
export const BackupOrder = mongoose.model("OrderBackup", orderBackupSchema);

// Pre-save middleware to backup data on first creation
orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      await BackupOrder.create({
        originalOrderId: this._id,
        user: this.user,
        products: this.products,
        totalAmount: this.totalAmount,
        paymentMethod: this.paymentMethod,
        cardInfo: this.cardInfo,
        status: this.status,
      });
    } catch (err) {
      console.error("Backup failed:", err);
    }
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;