import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCostumerStore } from "@/stores/costumerLocationStore"
import { useEffect } from "react";

const OrderCustomer = () => {
    const { location, order, getLocation, statuses, setStatus } = useCostumerStore();

    useEffect(() => {
        getLocation();
    }, [getLocation])

    console.log("location:", location, 'order:', order)

    return (
        <div className="mt-6 p-4">
            <Table className="min-w-full">
                <TableCaption className="mb-4 text-gray-500">Customer orders and delivery information</TableCaption>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="w-[120px] font-medium text-gray-600">Name</TableHead>
                        <TableHead className="w-[150px] font-medium text-gray-600">Product</TableHead>
                        <TableHead className="w-[80px] font-medium text-gray-600 text-center">Quantity</TableHead>
                        <TableHead className="w-[200px] font-medium text-gray-600">Address</TableHead>
                        <TableHead className="w-[120px] font-medium text-gray-600 text-center">Method</TableHead>
                        <TableHead className="w-[150px] font-medium text-gray-600 text-center">Status</TableHead>
                        <TableHead className="w-[100px] font-medium text-gray-600 text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>  
                    {location.length > 0 ? (
                        location.map((place, index) => {
                            const currentOrder = order[index];
                            const product = currentOrder?.products?.[0];
                            const status = statuses?.[index] || "Processing";

                            return (
                                <TableRow key={index} className="border-b hover:bg-gray-50/50">
                                    <TableCell className="font-medium py-4">
                                        {place.firstname + " " + place.lastname || "N/A"}
                                    </TableCell>
                                    <TableCell className="text-gray-700">
                                        {product?.name || "N/A"}
                                    </TableCell>
                                    <TableCell className="text-center text-gray-700">
                                        {product?.quantity || "N/A"}
                                    </TableCell>
                                    <TableCell className="text-gray-700">
                                        {place.houseNumber}, {place.street}, {place.city}
                                    </TableCell>
                                    <TableCell className="text-center text-gray-700">
                                        {currentOrder?.paymentMethod || "N/A"}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {status !== "Complete" ? (
                                            <button
                                                onClick={() => setStatus(index, "Complete")}
                                                className="cursor-pointer bg-[#ff0000] hover:bg-red-400 text-black px-3 py-1 rounded-md text-sm font-medium transition-colors"
                                            >
                                                Processing
                                            </button>
                                        ) : (
                                            <span className="bg-[#00ff2a]  px-3 py-1 rounded-md text-sm font-medium inline-block">
                                                Complete
                                            </span> 
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right font-medium text-gray-900">
                                        ${currentOrder?.totalAmount?.toFixed(2) || "N/A"}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="py-6 text-center text-gray-500">
                                No customer data available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default OrderCustomer