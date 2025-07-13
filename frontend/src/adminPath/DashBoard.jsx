import CurrentActiveUser from '@/dashboardComponent/CurrentActiveUser';
import Revenue from '@/dashboardComponent/Revenue';
import TotalCostumer from '@/dashboardComponent/TotalCostumer';
import TotalSales from '@/dashboardComponent/TotalSales';

import { UserStore } from '@/stores/userStore';


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const Analysis = ({ setPath }) => {
    const { dataUser } = UserStore();

    const formatDate = (isoDate) => {
    if (!isoDate) return 'N/A'; 
    return new Date(isoDate).toISOString().split('T')[0]; // returns "YYYY-MM-DD"
  };

const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const sortedUsers = [...dataUser].sort((a, b) => {
  if (a.role === 'admin' && b.role !== 'admin') return -1; // a comes first
  if (a.role !== 'admin' && b.role === 'admin') return 1;  // b comes first
  return 0; // keep original order if both same role
});


  return (
    <div className='mt-5 space-y-5'>
      <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-2'>
        {/* total revenue of the app*/}
        <div>
          <Revenue />
        </div>
        {/* all the custumer account*/}
        <div>
          <TotalCostumer />
        </div>
        {/* all active custumer account*/}
        <div>
          <CurrentActiveUser />
        </div>
        {/* total sales account*/}
        <div>
          <TotalSales setPath={setPath}/>
        </div>
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
        {sortedUsers.map((user, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{user.name}</TableCell>

            {/* Centered Status Column */}
            <TableCell className="text-center">
              <div className="flex justify-center items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    user.status === 'offline' ? 'bg-gray-300' : 'bg-green-500'
                  }`}
                />
                <span className="capitalize text-sm text-black font-medium">
                  {user.status}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-center">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </TableCell>

            <TableCell className="text-right">
              {formatDate(user.lastLogin)}
            </TableCell>

            <TableCell className="text-right">
              {formatTime(user.lastLogin)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>


    </div>
  );
};

export default Analysis;