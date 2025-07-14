import { formatDate } from "@/adminPath/DashBoard";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useCostumerStore } from "@/stores/costumerLocationStore";
import { useCartStore } from "@/stores/useCartStore";
import { ChevronsUpDown, SquarePen, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";

const OrderPage = () => {

  const { order, location, updateStatus, deleteProduct} = useCostumerStore();


  const currentOrder = order.filter(orderComplete => orderComplete.status === "processing");
  const cancelOrder = order.filter(orderComplete => orderComplete.status === "cancelled");
  const orderComplete = order.filter(orderComplete => orderComplete.status === "complete");
    
  const percentageOrderComplete = orderComplete.length / 100;


  const [sortedOrders, setSortedOrders] = useState([]);
  const [sortDirection, setSortDirection] = useState("desc");

  const [orderModal, setIsOrderModal] = useState(false);
  const [orderIdModal, setIsOrderIdModal] = useState(null);


  const handleModal = (id) => {
      setIsOrderModal(true);
      setIsOrderIdModal(id);
  }

  useEffect(() => {
    setSortedOrders(order); // initialize local state when orders load
  }, [order]);

  const sortOrdersByDate = () => {
    const sorted = [...sortedOrders].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });

    setSortedOrders(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  console.log(order.map((item => (
    item.products[0].name
  ))))



  return (
    <div className="max-w-7xl mx-auto space-y-2 py-10">
      <div className="grid grid-cols-3 content-between max-w-7xl mx-auto">
        <div className="border px-2 rounded shadow w-[20rem]">
          <h1 className="text-lg font-medium">Current Order</h1>
          <p>{currentOrder.length}</p>
        </div>
        <div className="border px-2 rounded shadow w-[20rem]">
          <h1 className="text-lg font-medium">Complete Order</h1>
          <p>{orderComplete.length}</p>
        </div>
        <div className="border px-2 rounded shadow w-[20rem]">
          <h1 className="text-lg font-medium">Cancel Order</h1>
          <p>{cancelOrder.length}</p>
        </div>

      </div>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] text-left">Order ID</TableHead>
            <TableHead className="text-center">Address</TableHead>
            <TableHead className="text-center">
              <div className="flex gap-1 items-center justify-center">
                Date
                <button onClick={sortOrdersByDate}>
                <ChevronsUpDown size={15} className="text-black/30 cursor-pointer"/>
                </button>
              </div>
            </TableHead>
            <TableHead className="text-right w-[50px]">Quantity</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
            {sortedOrders.map((order, index) => {
              const currentlocation = location[0];
              // Combine product names and quantities into readable formats
              const productQuantities = order.products.reduce((sum, quanti) => sum + quanti.quantity, 0);
              return (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="text-left text-sm font-medium text-gray-800">
                    #{order._id.replace(/\D/g, '').slice(-5)}
                  </TableCell>
                  <TableCell className="text-center text-sm text-gray-600">
                    {currentlocation.houseNumber}
                  </TableCell>
                  <TableCell className="text-center text-sm text-gray-600">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell className="text-center text-sm text-gray-600">
                    {productQuantities}
                  </TableCell>
                  <TableCell className="text-right text-sm font-semibold text-gray-800">
                    ₱{order.totalAmount}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`inline-block border px-3 py-0.5 rounded-full text-xs font-medium
                      ${order.status === "complete" 
                        ? "bg-green-500/10 text-green-600 border-green-500"
                        : order.status === "cancelled"
                        ? "bg-yellow-500/10 text-yellow-600 border-yellow-500"
                        : "bg-red-500/10 text-red-600 border-red-500"}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="flex justify-center">
                    {order.status === "processing" ? (
                      <div className="space-x-2 flex items-center w-[3rem] justify-between">
                      <button 
                      onClick={() => {handleModal(order._id)
                        console.log(order._id)
                       }}
                      className="cursor-pointer">
                          <SquarePen size={16}/>
                      </button>
                      <button
                        onClick={() => updateStatus({ id: order._id, status: "cancelled" })}
                        className="text-yellow-600 hover:text-yellow-700 text-xs font-medium transition-transform active:scale-95 cursor-pointer"
                      >
                        Cancel
                      </button>
                      </div>
                    ) : (
                      <div className="space-x-2 flex items-center w-[3rem] justify-between">
                      <button
                       onClick={() => {handleModal(order._id)
                        console.log(order._id)
                       }}
                       className="cursor-pointer">
                          <SquarePen size={16}/>
                      </button>
                      <button
                        onClick={() => deleteProduct({ id: order._id })}
                        className="text-red-600 hover:text-red-700 transition-transform active:scale-95 cursor-pointer"
                      >
                        <Trash size={16} />
                      </button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      
      {orderModal && (
        <OrderModal 
          isOpen={orderModal}
          isClose={() => setIsOrderModal(false)}
          orderId={orderIdModal}
          orderList={order} 
        />
      )}

    </div>
  )
}

export default OrderPage


const OrderModal = ({ isOpen, isClose, orderId, orderList }) => {
  if (!isOpen) return null;

  // Find the selected order
  const selectedOrder = orderList.find(order => order._id === orderId);

  const { shipping } = useCartStore();

  if (!selectedOrder) return null; // safety check

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-4 w-[30rem] shadow-xl rounded-lg">
        <div className="flex justify-between items-center border-b pb-2">
          <h1 className="text-lg font-semibold">Order #{orderId.replace(/\D/g, "").slice(-5)}</h1>
          <button className="text-gray-500 hover:text-black" onClick={isClose}>
            <X />
          </button>
        </div>
        <div className="mt-4 space-y-2">
          <h2 className="text-md font-medium">Products:</h2>
          <ul className="divide-y max-h-[20rem] overflow-hidden overflow-y-auto">
            {selectedOrder.products.map((product, idx) => (
              <li key={idx} className="py-2 flex justify-between text-sm text-gray-700 items-center px-2">
                <div className="flex flex-col space-y-2">
                <img src={product.image} alt="" className="rounded w-[10rem] object-cover h-[5rem] shadow" />
                <span className="text-center ">{product.name}</span>
                </div>
                <span className="font-medium">x{product.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 border-t pt-2 text-sm px-2 text-gray-600">
          <p >Status: {selectedOrder.status}</p>
          <p >shipping: {shipping}</p>
          <p >Status: {selectedOrder.status}</p>

          <p className="font-medium">Total Amount: ₱{selectedOrder.totalAmount}</p>
        </div>
      </div>
    </div>
  );
};
