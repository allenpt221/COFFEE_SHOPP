import CurrentActiveUser from '@/dashboardComponent/CurrentActiveUser';
import Revenue from '@/dashboardComponent/Revenue';
import TotalCostumer from '@/dashboardComponent/TotalCostumer';
import TotalSales from '@/dashboardComponent/TotalSales';


// js library convert the time into e.g 7:00AM into '5 minutes ago'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

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


dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '1 second',
    m: '1 minute',
    mm: '%d minutes',
    h: '1 hour',
    hh: '%d hours',
    d: '1 day',
    dd: '%d days',
    M: '1 month',
    MM: '%d months',
    y: '1 year',
    yy: '%d years'
  }
});


export const formatDate = (isoDate) => {
if (!isoDate) return 'N/A'; 

  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short"});
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`

};


const Analysis = ({ setPath }) => {
    const { dataUser } = UserStore();


  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return dayjs(date).fromNow();
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