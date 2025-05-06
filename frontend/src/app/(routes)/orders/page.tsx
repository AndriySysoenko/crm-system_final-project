import React, { FC } from 'react';
import { getOrders } from '@/app/service/api.service';
import OrdersComponent from '@/app/components/orders/OrdersComponent';
import PaginationComponent from '@/app/components/pagination/PaginationComponent';

type SearchParams = { page?: string };
type MyProps = {
  searchParams: Promise<SearchParams>
}

const OrdersPage:FC<MyProps> =async ({ searchParams }) => {
  const params = await searchParams;
  const page: number = params.page ? +params.page : 1;
  const result = await getOrders(page);
  if(!result.data || result.data.length === 0) {
    return <div>No orders</div>
  }

  return (
    <div>
      <table className="table-auto w-full border">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Surname</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Age</th>
        <th>Course</th>
        <th>Format</th>
        <th>Type</th>
        <th>Status</th>
        <th>Sum</th>
        <th>Paid</th>
        <th>Group</th>
        <th>Created</th>
        <th>Manager</th>
      </tr>
      </thead>
      <tbody>
    {result.data.map((order, index) => (
      <OrdersComponent item={order} key={order.id?.toString() || `order-${index}`} />
    ))}
      </tbody>
      </table>
      <PaginationComponent currentPage={page} totalPages={result.pages} basePath={'/orders'} />
    </div>
  );
}


export default OrdersPage;