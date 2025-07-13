import { useCostumerStore } from '@/stores/costumerLocationStore';
import { useCartStore } from '@/stores/useCartStore';
import { UserStore } from '@/stores/userStore';
import { Link, Navigate, useLocation } from 'react-router-dom';

const SuccessCheckOut = () => {

  const locations = useLocation();
  const paymentSuccess = locations.state?.paymentSuccess;

  if (!paymentSuccess) {
    return <Navigate to="/" replace />;
  }

  const { location } = useCostumerStore();
  const { order, subtotal, tax, shipping } = useCartStore();




  const customer = location[location.length - 1];

  const randomNumber = Math.floor(Math.random() * 5000);
  const fourDigit = String(randomNumber).padStart(4, '0');
  const datePH = new Date().toLocaleString("en-PH", {
  timeZone: "Asia/Manila",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true
});


const categoryTitles = {
		iceddrinks: "Ice",
		hotdrinks: "Hot",
		blended: "Blended ",
		noncoffee: "Caffeine-Free",
		desserts: "Dessert"
	};

  const percentTax = (tax / subtotal) * 100 


  const handlePrint = () => {
    window.print();
  }

  const methods = [
    {
      name: "COD",
      image: "/image/CODSuccess.webp"
    },
    {
      name: "Card",
      image: "/image/CardSuccess.webp"
    },
    {
      name: "Gcash",
      image: "/image/GcashSuccess.webp"
    }
  ];

  function capitalLetterFist(str){
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  

  return (
    <div className='max-w-5xl mx-auto space-y-10 mt-4'>
      <div className='space-y-2 mx-2'>
      <div className='flex justify-between'>
      <img src="https://plus.unsplash.com/premium_photo-1671379528106-fd5bd9e1087d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="can't read the image" className='w-20 h-20 rounded-full object-cover print:hidden' />
      <button onClick={handlePrint} className='print:hidden border h-8 px-2 py-1 font-medium text-xs rounded-sm cursor-pointer'>Print Reciept</button>
      </div>
      <h1 className='text-4xl font-bold'>Kapetolyo</h1>

        <div>
        <p className='text-xs'>Unit 202, Nepo Mall Annex Building</p>
        <p className='text-xs'>Teresa Avenue, Barangay Sto. Rosario Angeles City, Pampanga 2009 Philippines</p>
        </div>
      </div>
      <div className='flex justify-between sm:flex-row flex-col mx-2 sm:gap-0 gap-4'>
          <div>
            <h1 className='text-lg font-bold font-anton mt-10 mb-0'>{'Recipient :'.toUpperCase()}</h1>
            <span className='font-bold text-xl sm:ml-2 ml-0'>
              {customer?.lastname + ', ' + customer?.firstname}
            </span>
            {/* Additional Info */}
              <p className='text-sm sm:ml-2 ml-0 text-gray-700'>
                Phone: {customer?.phoneNumber}
              </p>
              <p className='text-sm sm:ml-2 ml-0 text-gray-700'>
                Address: {customer?.houseNumber}, {customer?.town}
              </p>
            </div>

            <div className='sm:w-[20rem] w-full sm:mx-0 mx-auto'>
              <p className='bg-[#69c401] px-2 py-3 text-white font-bold text-lg print:text-black'>Receipt for #{fourDigit}</p>
              <p className='px-2 text-sm pt-2 bg-black/5'>Transaction Date: {datePH}</p>
            </div>
      </div>


      <div className='overflow-hidden overflow-x-auto mx-2'>
        <table className='md:min-w-full min-w-[800px] print:min-w-[700px]  overflow-x-auto border'>
          <thead className='bg-[#69c401] text-white print:text-black h-[3rem]'>
            <tr>
            <th className='px-2'>Order ID</th>
            <th className='px-2'>Product</th>
            <th className='px-2'>Quantity</th>
            <th className='px-2'>Serving</th>
            <th className='px-2'>Unit Price</th>
            <th className='px-2'>Subtotal</th>
            </tr>
          </thead>
          {order?.products.map((item, index) => (
          <tbody className='border-b border-t' key={index}>
            <tr>
              <td className='text-center py-2 px-2'>{item.product}</td>
              <td className='text-center py-2 px-2'>{item.name}</td>
              <td className='text-center py-2 '>{item.quantity}</td>
              <td className='text-center py-2 '>{categoryTitles[item.category]}</td>
              <td className='text-center py-2 '>{(item.price).toFixed(2)}</td>
              <td className='text-center py-2 '>{'₱' + (item.price * item.quantity).toFixed(2)}</td>
            </tr>
          </tbody>
          ))}
        </table>
      </div>
      <div className='flex justify-between sm:flex-row flex-col-reverse mx-2'>
        <div className='flex flex-col sm:w-[40rem] gap-10'>
          <div className='w-[15rem] h-[15rem] mx-auto shadow-md  rounded-full'>
            {methods.find(m => m.name === order?.paymentMethod) && (
              <img src={methods.find(m => m.name === order.paymentMethod).image} 
              alt={order.paymentMethod} 
              className='w-full h-full object-cover'/>
            )}
          </div>
          <div className='flex justify-between'>
          <h1 className='text-center sm:text-start font-medium'>Thank you for your purchase!</h1>
          </div>

        </div>

        <div className='mt-10 sm:w-[20rem] '>
          <h1 className='text-md font-semibold'>Receipt for payment</h1>
          <span className='flex justify-between border-b'>
            <p className='text-base mt-2 text-black/80 font-medium '>Payment Method</p>
            <p className='font-medium'>{order?.paymentMethod}</p>
          </span>
          {order?.paymentMethod === "Card" && (
          <span className='flex justify-between border-b'>
            <p className='text-base mt-2 text-black/80 font-medium '>Card Type</p>
            <p className='font-medium'>{capitalLetterFist(order?.cardInfo.cardType)}</p>
          </span>
          )}
          <span className='flex justify-between border-b'>
            <p className='text-base mt-2 text-black/80 font-medium '>Subtotal</p>
            <p className='font-medium'>{'₱' + subtotal}</p>
          </span>
          <span className='flex justify-between border-b'>
            <p className='text-base mt-2 text-black/80 font-medium '>Tax <span className='text-black/60'>{`%(${(percentTax).toFixed(1)})`}</span></p>
            <p className='font-medium'>{'₱' + (tax).toFixed(2)}</p>
          </span>
          <span className='flex justify-between border-b'>
            <p className='text-base mt-2 text-black/80 font-medium'>Shipping</p>
            <p className='font-medium'>{'₱' + shipping}</p>
          </span>
          <span className='flex justify-between border-b'>
            <p className='text-base mt-2 text-black/80 font-medium '>Total</p>
            <p className='font-medium'>{'₱' + order?.totalAmount.toFixed(2)}</p>
          </span>
        </div>
      </div>
      <Link to='/' className='float-right bg-black px-2 py-1 rounded-sm text-white mb-5 print:hidden mx-5'>Back to Home</Link>
    </div>
  )
}

export default SuccessCheckOut