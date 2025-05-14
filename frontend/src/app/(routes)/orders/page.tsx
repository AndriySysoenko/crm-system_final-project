import OrderListComponent from '@/app/components/orders/OrderListComponent';
import { AuthGuard } from '@/app/components/guard/AuthGuardComponent';
import Menu from '@/app/components/menu/Menu';
import React from 'react';

const OrdersPage = () => {

  return (
    <div>
      <AuthGuard>
        <Menu/>
      <OrderListComponent/>
      </AuthGuard>
    </div>
  );
}

export default OrdersPage;

