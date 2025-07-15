import { formatDate } from "@/adminPath/DashBoard";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCostumerStore } from "@/stores/costumerLocationStore";
import { motion , AnimatePresence } from "framer-motion";
import { ChevronsUpDown, SquarePen, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const { order, location, updateStatus, deleteProduct } = useCostumerStore();

  const [sortedOrders, setSortedOrders] = useState([]);
  const [sortDirection, setSortDirection] = useState("desc");
  const [orderModal, setOrderModal] = useState(false);
  const [orderIdModal, setOrderIdModal] = useState(null);
  const [orderStatusPath, setOrderStatusPath] = useState("all");

  useEffect(() => {
    setSortedOrders(order);
  }, [order]);

  const filteredOrders = orderStatusPath === "all"
    ? sortedOrders
    : sortedOrders.filter(o => o.status === orderStatusPath);

  const sortOrdersByDate = () => {
    const sorted = [...filteredOrders].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });
    setSortedOrders(sorted);
    setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
  };

  const handleModal = (id) => {
    setOrderModal(true);
    setOrderIdModal(id);
  };

  const orderStatus = [
    { name: "All", pathname: "all" },
    { name: "Processing", pathname: "processing" },
    { name: "Complete", pathname: "complete" },
    { name: "Cancelled", pathname: "cancelled" },
  ];

  const currentOrder = order.filter(o => o.status === "processing");
  const completeOrder = order.filter(o => o.status === "complete");
  const cancelOrder = order.filter(o => o.status === "cancelled");

  return (
    <div className="max-w-7xl mx-auto space-y-2 py-10">
      <div className="grid sm:grid-cols-3  gap-4 mx-2">
        <OrderStat title="Processing Order" count={currentOrder.length} />
        <OrderStat title="Complete Order" count={completeOrder.length} />
        <OrderStat title="Cancel Order" count={cancelOrder.length} />
      </div>

      <div className="grid sm:grid-cols-4 grid-cols-2 gap-4 px-2">
        {orderStatus.map((orderPath, index) => (
          <button
            key={index}
            className={`px-3 py-1 w-full rounded font-medium ${
                orderStatusPath === orderPath.pathname
                  ? orderPath.pathname === "processing"
                    ? "text-red-500 shadow"
                    : orderPath.pathname === "complete"
                    ? "text-green-500 shadow"
                    : orderPath.pathname === "cancelled"
                    ? "text-yellow-500 shadow"
                    : "text-black shadow"
                  : "text-black"
              }`}
            onClick={() => setOrderStatusPath(orderPath.pathname)}
          >
            {orderPath.name}
          </button>
        ))}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Order ID</TableHead>
            <TableHead className="text-center">Address</TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center gap-1">
                Date
                <button onClick={sortOrdersByDate}>
                  <ChevronsUpDown size={15} className="text-black/30" />
                </button>
              </div>
            </TableHead>
            <TableHead className="text-center">Qty</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.length === 0 ? (
          <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                {orderStatusPath === "all" && "No orders found."}
                {orderStatusPath === "processing" && "No processing orders found."}
                {orderStatusPath === "complete" && "No completed orders found."}
                {orderStatusPath === "cancelled" && "No cancelled orders found."}
              </TableCell>
            </TableRow>
          ): (
            filteredOrders.map((orderItem, idx) => {
              const productQty = orderItem.products.reduce((sum, p) => sum + p.quantity, 0);
              const currentlocation = location[0];
              return (
                <TableRow key={idx}>
                  <TableCell>#{orderItem._id.replace(/\D/g, "").slice(-5)}</TableCell>
                  <TableCell className="text-center">{currentlocation?.houseNumber || "N/A"}</TableCell>
                  <TableCell className="text-center">{formatDate(orderItem.createdAt)}</TableCell>
                  <TableCell className="text-center">{productQty}</TableCell>
                  <TableCell className="text-right font-semibold">₱{orderItem.totalAmount}</TableCell>
                  <TableCell className="text-center">
                    <span className={`px-3 py-0.5 rounded-full text-xs font-medium border
                      ${orderItem.status === "complete" ? "bg-green-500/10 text-green-600 border-green-500"
                      : orderItem.status === "cancelled" ? "bg-yellow-500/10 text-yellow-600 border-yellow-500"
                      : "bg-red-500/10 text-red-600 border-red-500"}`}>
                      {orderItem.status.charAt(0).toUpperCase() + orderItem.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-2 justify-center ">
                      <button onClick={() => handleModal(orderItem._id)}
                         className="cursor-pointer">
                        <SquarePen size={16} />
                      </button>
                      {orderItem.status === "processing" ? (
                        <button
                          onClick={() => updateStatus({ id: orderItem._id, status: "cancelled" })}
                          className="text-yellow-600 text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          onClick={() => deleteProduct({ id: orderItem._id })}
                          className="text-red-600 cursor-pointer"
                        >
                          <Trash size={16} />
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
        )}
        </TableBody>
      </Table>
      
      <AnimatePresence>
        {orderModal && (
          <OrderModal
            isOpen={orderModal}
            isClose={() => setOrderModal(false)}
            orderId={orderIdModal}
            orderList={order}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderPage;

const OrderStat = ({ title, count }) => (
  <div className="border px-2 py-3 rounded shadow w-full text-center">
    <h1 className="text-lg font-medium">{title}</h1>
    <p className="text-xl font-bold">{count}</p>
  </div>
);

const OrderModal = ({ isOpen, isClose, orderId, orderList }) => {
  if (!isOpen) return null;
  const selectedOrder = orderList.find(orderItem => orderItem._id === orderId);
  if (!selectedOrder) return null;

  const taxRate = 0.012;
  const shippingFee = 25.75;
  const total = selectedOrder.totalAmount;
  const amountWithoutShipping = total - shippingFee;
  const subtotal = amountWithoutShipping / (1 + taxRate);
  const tax = subtotal * taxRate;

  const categoryTitles = {
    iceddrinks: "Ice",
    hotdrinks: "Hot",
    blended: "Blended",
    noncoffee: "Caffeine-Free",
    desserts: "Dessert",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center"
    onClick={isClose}>
      <motion.div 
      initial={{opacity: 0, y: 25}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: -100, delay: 0}}
      transition={{duration: 0.4}}
      className="bg-white p-4 md:w-[30rem] w-[18rem] shadow-xl rounded-lg"
      onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b pb-2">
          <h1 className="text-lg font-semibold">
            Order #{orderId.replace(/\D/g, "").slice(-5)}
          </h1>
          <button onClick={isClose} className="text-gray-500 hover:text-black cursor-pointer">
            <X />
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex flex-col float-end gap-1 items-center">
            <p className={`text-xs px-2 rounded-lg font-medium border py-0.5 ${
              selectedOrder.status === "complete"
                ? "bg-green-500/10 text-green-600 border-green-500"
                : selectedOrder.status === "cancelled"
                ? "bg-yellow-500/10 text-yellow-600 border-yellow-500"
                : "bg-red-500/10 text-red-600 border-red-500"
            }`}>{selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}</p>
          </div>

          <h2 className="text-md font-medium">Products:</h2>
          <ul className="divide-y max-h-[20rem] overflow-y-auto">
            {selectedOrder.products.map((p, i) => (
              <li key={i} className="py-2 px-2 flex justify-between items-center text-sm">
                <div className="flex flex-col space-y-1">
                  <img src={p.image} alt={p.name} className="w-[10rem] h-[5rem] object-cover rounded shadow" />
                  <div className="flex gap-1 text-xs">
                    <span className="text-center font-medium">{categoryTitles[p.category]}:</span>
                    <span className="text-center ">{p.name}</span>
                  </div>
                </div>
                <span className="font-medium">x{p.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 border-t pt-2 text-sm text-gray-600 px-2 space-y-1">
          <div className="flex justify-between"><span>Shipping:</span><span>{shippingFee.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Tax:</span><span>{tax.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Subtotal:</span><span>{subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Payment Method:</span><span>{selectedOrder.paymentMethod}</span></div>
          <div className="flex justify-between font-medium"><span>Total:</span><span>₱{total.toFixed(2)}</span></div>
        </div>
      </motion.div>
    </div>
  );
};
