import { useCostumerStore } from '@/stores/costumerLocationStore';
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const SuccessCheckOut = () => {

  const location = useLocation();
  const paymentSuccess = location.state?.paymentSuccess;

  if (!paymentSuccess) {
    return <Navigate to="/" replace />;
  }



  return (
    <div>
      asdas
      <span className="loading loading-ring loading-xl"></span>
    </div>
  )
}

export default SuccessCheckOut