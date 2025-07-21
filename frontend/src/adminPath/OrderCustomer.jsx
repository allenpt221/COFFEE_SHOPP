import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import { useCostumerStore } from "../stores/costumerLocationStore";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, SquarePen, X } from "lucide-react";
import { useEffect, useState } from "react";

const OrderCustomer = () => {
  const { locationBackup, updateStatus, backUpOrders } = useCostumerStore();

    const [sortedData, setSortedData] = useState([]);
    const [isAsc, setIsAsc] = useState(true);
    const [orderModal, setOrderModal] = useState(false);
    const [orderIdModal, setOrderIdModal] = useState(null);

    const handleModal = (id) => {
    setOrderModal(true);
    setOrderIdModal(id);
  };

  console.log("Location Backup:", locationBackup);


   useEffect(() => {
    if (locationBackup.length && backUpOrders.length) {
      const combined = backUpOrders.map((order, index) => ({
        order,
        place: locationBackup[index],
      }));
      setSortedData(combined);
    }
  }, [location, backUpOrders]);

  const sortEmail = () => {
    const sorted = [...sortedData].sort((a, b) => {
      const emailA = a.place?.emailAddress || "";
      const emailB = b.place?.emailAddress || "";
      return isAsc ? emailA.localeCompare(emailB) : emailB.localeCompare(emailA);
    });
    setSortedData(sorted);
    setIsAsc(!isAsc);
  };



  return (
    <div className="mt-6 p-4">
      <Table className="min-w-full">
        <TableCaption className="mb-4 text-gray-500">
          Customer orders and delivery information
        </TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead 
            onClick={sortEmail}
            className="w-[120px] font-medium text-gray-600 cursor-pointer">
              <span className="flex gap-1 items-center">
              Email {isAsc ? <ChevronDown size={17} /> : <ChevronUp size={17} />}
              </span>
            </TableHead>
            <TableHead className="w-[120px] font-medium text-gray-600">Name</TableHead>
            <TableHead className="w-[150px] font-medium text-gray-600 text-center">Product</TableHead>
            <TableHead className="w-[80px] font-medium text-gray-600 text-center">Quantity</TableHead>
            <TableHead className="w-[200px] text-center font-medium text-gray-600">Address</TableHead>
            <TableHead className="w-[120px] font-medium text-gray-600 text-center">Method</TableHead>
            <TableHead className="w-[150px] font-medium text-gray-600 text-center">Status</TableHead>
            <TableHead className="w-[100px] font-medium text-gray-600 text-right">Amount</TableHead>
            <TableHead className="w-[100px] font-medium text-gray-600 text-center">Orders</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.length > 0 ? (
            sortedData.map((currentOrder, index) => {
              const { order, place } = currentOrder;
              const productQuantity = order?.products.reduce((sum ,product) => sum + product.quantity, 0);              
              return (
                <TableRow key={index} className="border-b hover:bg-gray-50/50">
                  <TableCell className="font-medium py-4">
                    {place.emailAddress}
                  </TableCell>
                  <TableCell className="font-medium py-4">
                    {`${place.firstname} ${place.lastname}`}
                  </TableCell>
                  <TableCell className="text-gray-700 text-center">
                    #{order._id.replace(/\D/g, "").slice(-5)}
                  </TableCell>
                  <TableCell className="text-center text-gray-700">
                    {productQuantity || "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {place
                      ? `${place.houseNumber}, ${place.barangay}, ${place.town}`
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-center text-gray-700">
                    {order?.paymentMethod || "N/A"}
                  </TableCell>
                  <TableCell className="text-center">
                    <button onClick={() => updateStatus({ id: order.originalOrderId, status: "complete" })}
                      disabled={order.status === "cancelled"}>
                      <span className={`cursor-pointer border py-0.5 w-[10rem] ${
                        order.status === "complete"
                          ? "border-green-500 bg-green-500/10 text-green-500"
                          : order.status === "cancelled"
                          ? "border-yellow-500 bg-yellow-500/10 text-yellow-500"
                          : "border-red-500 bg-red-500/10 text-red-500"
                      } px-3 rounded-md text-sm font-medium transition-colors`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </button>
                  </TableCell>
                  <TableCell className="text-right font-medium text-gray-900">
                    ₱ {order?.totalAmount?.toFixed(2) || "N/A"}
                  </TableCell>
                  <TableCell className='text-center'>
                    <button className="cursor-pointer"
                    onClick={() => handleModal(order._id)}>
                      <SquarePen size={15} />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="py-6 text-center text-gray-500">
                No customer data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AnimatePresence>
        {orderModal && (
          <OrderModal
            isOpen={orderModal}
            isClose={() => setOrderModal(false)}
            orderId={orderIdModal}
            orderList={backUpOrders}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderCustomer;



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
          <div className="flex justify-between font-medium"><span>Total:</span><span>₱{total.toFixed(2)}</span></div>
        </div>
      </motion.div>
    </div>
  );
};