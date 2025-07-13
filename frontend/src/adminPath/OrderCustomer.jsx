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

const OrderCustomer = () => {
  const { location, updateStatus, backUpOrders } = useCostumerStore();

  const categoryTitles = {
    iceddrinks: "Ice cafe",
    hotdrinks: "Hot cafe",
    blended: "Blended",
    noncoffee: "Caffeine-Free",
    desserts: "Dessert",
  };

  console.log(backUpOrders)


  return (
    <div className="mt-6 p-4">
      <Table className="min-w-full">
        <TableCaption className="mb-4 text-gray-500">
          Customer orders and delivery information
        </TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[120px] font-medium text-gray-600">Name</TableHead>
            <TableHead className="w-[150px] font-medium text-gray-600">Product</TableHead>
            <TableHead className="w-[80px] font-medium text-gray-600 text-center">Quantity</TableHead>
            <TableHead className="w-[200px] font-medium text-gray-600 text-center">Serving</TableHead>
            <TableHead className="w-[200px] font-medium text-gray-600">Address</TableHead>
            <TableHead className="w-[120px] font-medium text-gray-600 text-center">Method</TableHead>
            <TableHead className="w-[150px] font-medium text-gray-600 text-center">Status</TableHead>
            <TableHead className="w-[100px] font-medium text-gray-600 text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {backUpOrders.length > 0 ? (
            backUpOrders.map((currentOrder, index) => {
              const place = location[index];
              const product = currentOrder?.products?.[0];

              return (
                <TableRow key={index} className="border-b hover:bg-gray-50/50">
                  <TableCell className="font-medium py-4">
                    {`${place.firstname} ${place.lastname}`}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {product?.name || "N/A"}
                  </TableCell>
                  <TableCell className="text-center text-gray-700">
                    {product?.quantity || "N/A"}
                  </TableCell>
                  <TableCell className="text-center text-gray-700">
                    {categoryTitles[product?.category] || "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {place
                      ? `${place.houseNumber}, ${place.barangay}, ${place.town}`
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-center text-gray-700">
                    {currentOrder?.paymentMethod || "N/A"}
                  </TableCell>
                  <TableCell className="text-center">
                    <button onClick={() => updateStatus({ id: currentOrder.originalOrderId, status: "complete" })}>
                      <span className={`cursor-pointer border py-0.5 ${
                        currentOrder.status === "complete"
                          ? "border-green-500 bg-green-500/10 text-green-500"
                          : currentOrder.status === "cancel"
                          ? "border-yellow-500 bg-yellow-500/10 text-yellow-500"
                          : "border-red-500 bg-red-500/10 text-red-500"
                      } px-3 rounded-md text-sm font-medium transition-colors`}>
                        {currentOrder.status.charAt(0).toUpperCase() + currentOrder.status.slice(1)}
                      </span>
                    </button>
                  </TableCell>
                  <TableCell className="text-right font-medium text-gray-900">
                    ₱ {currentOrder?.totalAmount?.toFixed(2) || "N/A"}
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
    </div>
  );
};

export default OrderCustomer;
