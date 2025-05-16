import OrderListComponent from '@/app/components/orders/OrderListComponent';
import { AuthGuard } from '@/app/components/guard/AuthGuardComponent';
import React from 'react';

const OrdersPage = () => {

  return (
    <div>
      <AuthGuard>
      <OrderListComponent/>
      </AuthGuard>
    </div>
  );
}

export default OrdersPage;

