import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useProductStore } from "@/stores/useProductStore";

const OrderPage = () => {

  const { productOrder } = useProductStore();


  
  return (
    <div className="max-w-4xl mx-auto space-y-2 py-10">
      <div>
        da
      </div>
      <Table className=''>
      <TableCaption>A list of active users.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Name</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Role</TableHead>
          <TableHead className="text-right">Last Log In</TableHead>
          <TableHead className="text-right">Time Active Ago</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell> </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </div>
  )
}

export default OrderPage